import { Header } from '@/components/header'
import Link from 'next/link'
import { Home, ChevronRight, Download, FileSpreadsheet, CircuitBoard } from 'lucide-react'
import { getAllGuides, getUnits } from '@/lib/db-service'
import { DownloadsClient } from '@/components/downloads-client'

export const revalidate = 3600 // Cache for 1 hour

export default async function DescargasPage() {
  const guides = await getAllGuides()
  const units = await getUnits()

  return (
    <main className="min-h-screen bg-background relative overflow-hidden pb-16">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <Header />

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">
            <Home size={14} />
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Descargas</span>
        </div>

        {/* Section Header Card */}
        <div className="rounded-xl border border-primary/20 bg-card/30 p-8 glass-panel mb-12 relative overflow-hidden group">
          <div className="absolute top-2 left-4 font-mono text-[9px] text-muted-foreground/30 uppercase tracking-widest select-none">
            UNI_MP_DOWNLOADS_CENTRAL // V1.0.0
          </div>
          <div className="absolute top-2 right-4 font-mono text-[9px] text-primary/30 uppercase select-none animate-pulse">
            LOCAL_STORAGE_ACTIVE
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Download size={20} className="animate-bounce" style={{ animationDuration: '3s' }} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Centro de Descargas
                </h1>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base max-w-4xl leading-relaxed font-sans">
                Accede y descarga todas las guías de estudio, guías prácticas oficiales de laboratorio y materiales del curso <strong className="text-white">Arquitectura de Máquinas 1</strong>. Estos materiales te ayudarán a afianzar tus conocimientos teóricos y desarrollar tus laboratorios en <strong className="text-primary font-mono">EMU8086</strong>.
              </p>
            </div>
            
            <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground bg-background/50 border border-border/60 px-4 py-2.5 rounded-lg flex-shrink-0">
              <CircuitBoard size={14} className="text-primary" />
              <span>TOTAL GUÍAS: {guides.length}</span>
            </div>
          </div>
        </div>

        {/* Interactive Client Component Area */}
        <DownloadsClient initialGuides={guides} units={units} />
      </section>
    </main>
  )
}
