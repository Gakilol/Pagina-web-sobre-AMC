import { Header } from '@/components/header'
import Link from 'next/link'
import { ChevronRight, Home, BookOpen, Brain, Download, ChevronLeft, FileSpreadsheet } from 'lucide-react'
import { getUnitById, getLessonsByUnitId, getQuizzesByUnitId, getGuidesByUnitId } from '@/lib/db-service'
import { LessonsTabs } from '@/components/lessons-tabs'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UnitDetailPage({ params }: PageProps) {
  let unit = null
  let lessons = []
  let quizzes = []
  let guides = []
  let errorMsg = null

  try {
    const { id } = await params
    const unitId = id
    unit = await getUnitById(unitId)
    lessons = await getLessonsByUnitId(unitId)
    quizzes = await getQuizzesByUnitId(unitId)
    guides = await getGuidesByUnitId(unitId)
  } catch (err: any) {
    console.error('Error fetching unit detail data on server:', err)
    errorMsg = err.message || 'Error desconocido'
  }

  if (!unit) {
    return (
      <main className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>
        <Header />
        <section className="mx-auto max-w-3xl px-4 py-24 text-center z-10 relative">
          <div className="p-8 rounded-xl border border-destructive/20 bg-destructive/5 glass-panel">
            <h1 className="text-3xl font-extrabold text-white mb-4">Unidad No Encontrada</h1>
            <p className="text-muted-foreground mb-8">
              No hemos podido localizar la unidad curricular especificada en la base de datos o almacenamiento local.
            </p>
            <Link
              href="/unidades"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
              Volver a Unidades
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden pb-20">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[110px] pointer-events-none"></div>

      <Header />

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 z-10">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 mb-8 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">
            <Home size={14} />
          </Link>
          <ChevronRight size={12} />
          <Link href="/unidades" className="hover:text-primary transition-colors">
            Unidades
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Unidad 0{unit.order_number}</span>
        </div>

        {/* Technical Header Card */}
        <div className="rounded-xl border border-primary/20 bg-card/30 p-8 glass-panel mb-12 relative overflow-hidden group">
          <div className="absolute top-2 left-4 font-mono text-[9px] text-muted-foreground/30 uppercase tracking-widest">
            UNI_MP_ACADEMIC_LEAFLET // U0{unit.order_number}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary border border-primary/20 font-mono font-bold text-lg">
                  0{unit.order_number}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {unit.title}
                </h1>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base max-w-4xl leading-relaxed">
                {unit.description}
              </p>
            </div>
            
            <Link
              href="/unidades"
              className="flex items-center justify-center gap-2 rounded-lg border border-border/80 hover:border-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider font-mono text-muted-foreground hover:text-primary transition-colors flex-shrink-0 cursor-pointer"
            >
              <ChevronLeft size={16} />
              Lista de Unidades
            </Link>
          </div>
        </div>

        {/* Master Curriculum Grid */}
        <div className="space-y-12">
          {/* Lessons Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <BookOpen className="text-primary animate-pulse" />
                Material Teórico de la Unidad
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                Total: {lessons.length} Lecciones
              </span>
            </div>
            
            <LessonsTabs lessons={lessons} />
          </div>

          {/* Bottom Sidebar Activities Grid (Quizzes & Downloads) */}
          <div className="grid gap-8 md:grid-cols-2 pt-6">
            {/* Evaluations Card */}
            <div className="rounded-xl border border-border/60 bg-card/25 p-6 glass-panel relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-2 left-4 font-mono text-[9px] text-muted-foreground/30 uppercase select-none">
                SYS_EVAL_GATEWAY
              </div>
              
              <div className="mt-2 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Brain className="text-amber-400" size={20} />
                  Evaluación de Aprendizaje
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Realiza cuestionarios de autoevaluación dinámicos específicos para consolidar el contenido estudiado. Respuestas inmediatas y explicaciones de bajo nivel.
                </p>

                {quizzes.length > 0 ? (
                  <div className="space-y-3 pt-2">
                    {quizzes.map((quiz) => (
                      <Link key={quiz.id} href={`/quiz/${quiz.id}`} className="block">
                        <div className="p-4 rounded-xl border border-border/60 hover:border-amber-500/50 bg-background/40 hover:bg-amber-500/5 transition-all flex items-center justify-between group cursor-pointer">
                          <div>
                            <span className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">
                              {quiz.title}
                            </span>
                            <span className="block text-[10px] text-muted-foreground/70 font-mono mt-0.5">
                              CUESTIONARIO DE AUTOEVALUACIÓN
                            </span>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <ChevronRight size={16} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-border/60 text-center text-xs text-muted-foreground">
                    No hay evaluaciones vinculadas a esta unidad en este momento.
                  </div>
                )}
              </div>
            </div>

            {/* Downloads Card */}
            <div className="rounded-xl border border-border/60 bg-card/25 p-6 glass-panel relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-2 left-4 font-mono text-[9px] text-muted-foreground/30 uppercase select-none">
                SYS_FILE_INDEX
              </div>

              <div className="mt-2 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Download className="text-emerald-400" size={20} />
                  Materiales de Laboratorio
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Descarga las guías prácticas y de laboratorio en formato nativo para realizar tus actividades de codificación directamente en el entorno de desarrollo local.
                </p>

                {guides.length > 0 ? (
                  <div className="space-y-3 pt-2">
                    {guides.map((guide) => (
                      <a
                        key={guide.id}
                        href={guide.file_url}
                        download
                        className="block group"
                      >
                        <div className="p-4 rounded-xl border border-border/60 hover:border-emerald-500/50 bg-background/40 hover:bg-emerald-500/5 transition-all flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                              <FileSpreadsheet size={18} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors block truncate">
                                {guide.title}
                              </span>
                              <span className="text-[10px] text-muted-foreground/70 font-mono block mt-0.5 uppercase">
                                FORMATO {guide.file_type || 'DOCX'} • DESCARGAR LOCAL
                              </span>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-background border border-border/60 text-muted-foreground group-hover:text-emerald-400 group-hover:border-emerald-500/40 flex items-center justify-center group-hover:scale-105 transition-all">
                            <Download size={16} />
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-border/60 text-center text-xs text-muted-foreground">
                    No hay guías cargadas para esta unidad específica.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
