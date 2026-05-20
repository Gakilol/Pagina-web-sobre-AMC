import { Header } from '@/components/header'
import Link from 'next/link'
import { ChevronRight, BookOpen, FileText, Download, GraduationCap, ArrowRight, Brain } from 'lucide-react'
import { getUnits } from '@/lib/db-service'
import { localLessons } from '@/lib/data/units'
import { localQuizzes } from '@/lib/data/quizzes'
import { localGuides } from '@/lib/data/guides'

export const revalidate = 3600 // Cache for 1 hour

// Curated colors for each unit to make them pop visually
const UNIT_THEMES = [
  {
    border: 'hover:border-cyan-500/50',
    glow: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    numberBg: 'bg-cyan-500/10 text-cyan-400',
    accentText: 'text-cyan-400',
  },
  {
    border: 'hover:border-blue-500/50',
    glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    numberBg: 'bg-blue-500/10 text-blue-400',
    accentText: 'text-blue-400',
  },
  {
    border: 'hover:border-purple-500/50',
    glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    numberBg: 'bg-purple-500/10 text-purple-400',
    accentText: 'text-purple-400',
  },
  {
    border: 'hover:border-amber-500/50',
    glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    numberBg: 'bg-amber-500/10 text-amber-400',
    accentText: 'text-amber-400',
  },
  {
    border: 'hover:border-emerald-500/50',
    glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    numberBg: 'bg-emerald-500/10 text-emerald-400',
    accentText: 'text-emerald-400',
  },
]

export default async function UnitsPage() {
  const units = await getUnits()

  return (
    <main className="min-h-screen bg-background relative overflow-hidden pb-16">
      {/* Visual Tech Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <Header />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 z-10">
        {/* Breadcrumb / Top Info */}
        <div className="flex items-center gap-2 mb-8 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Unidades Académicas</span>
        </div>

        {/* Section Header */}
        <div className="mb-16 border-b border-border/40 pb-8 relative">
          <div className="absolute bottom-0 left-0 w-32 h-[3px] bg-primary"></div>
          <div className="flex items-center gap-3 text-sm font-mono text-primary uppercase tracking-widest mb-3">
            <GraduationCap size={18} />
            <span>Plan de Estudios Oficial UNI</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary/80">
            Unidades Temáticas
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl font-sans leading-relaxed">
            Explora el programa oficial de la asignatura <strong className="text-white">Arquitectura de Máquinas 1</strong>. Cada unidad curricular integra lecciones explicativas completas, material didáctico descargable y quizzes interactivos diseñados para medir tu avance de forma autónoma.
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid gap-8 lg:grid-cols-1">
          {units.map((unit, idx) => {
            const theme = UNIT_THEMES[idx % UNIT_THEMES.length]
            const unitLessons = localLessons.filter(l => l.unit_id === unit.id)
            const unitQuizzes = localQuizzes.filter(q => q.unit_id === unit.id)
            const unitGuides = localGuides.filter(g => g.unit_id === unit.id)

            return (
              <Link key={unit.id} href={`/unidades/${unit.id}`} className="group block">
                <div className={`relative rounded-xl border border-border/60 bg-card/40 p-8 glass-panel transition-all duration-300 ${theme.border} ${theme.glow} cursor-pointer`}>
                  {/* Subtle corner tech details */}
                  <div className="absolute top-3 right-4 font-mono text-[9px] text-muted-foreground/40 uppercase select-none tracking-widest">
                    UNI_AM1_U0{unit.order_number}
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      {/* Title & Badge */}
                      <div className="flex items-center flex-wrap gap-4">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl font-mono text-xl font-bold border border-primary/20 ${theme.numberBg}`}>
                          0{unit.order_number}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                            {unit.title}
                          </h3>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border ${theme.badgeBg}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                            Unidad {unit.order_number}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-base max-w-4xl leading-relaxed font-sans">
                        {unit.description}
                      </p>

                      {/* Stats Indicators */}
                      <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-muted-foreground">
                        <div className="flex items-center gap-2 bg-background/40 px-3 py-1.5 rounded-lg border border-border/40">
                          <BookOpen size={15} className={theme.accentText} />
                          <span>Lecciones: <strong className="text-white">{unitLessons.length}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 bg-background/40 px-3 py-1.5 rounded-lg border border-border/40">
                          <Brain size={15} className={theme.accentText} />
                          <span>Quizzes: <strong className="text-white">{unitQuizzes.length}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 bg-background/40 px-3 py-1.5 rounded-lg border border-border/40">
                          <Download size={15} className={theme.accentText} />
                          <span>Descargas: <strong className="text-white">{unitGuides.length}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow CTA */}
                    <div className="flex items-center justify-end lg:justify-center">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full border border-border/60 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300`}>
                        <ChevronRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 rounded-xl border border-primary/20 bg-primary/5 p-6 glass-panel flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Brain size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white">¿Quieres medir tu nivel primero?</h4>
              <p className="text-sm text-muted-foreground">También puedes saltar directamente a los quizzes interactivos de cada unidad.</p>
            </div>
          </div>
          <Link
            href="/tutorial-emu8086"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/95 transition-colors font-mono tracking-wider uppercase cursor-pointer"
          >
            Probar simulador 8086 <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  )
}
