import { Header } from '@/components/header'
import { getEMU8086Tutorials } from '@/lib/db-service'
import { EMU8086Simulator } from '@/components/emu8086-simulator'
import Link from 'next/link'
import { Home, ChevronRight, Code2 } from 'lucide-react'

export const revalidate = 3600

export default async function EMU8086TutorialPage() {
  const tutorials = await getEMU8086Tutorials()

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
      <Header />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home size={14} />
            <span>Inicio</span>
          </Link>
          <ChevronRight size={12} className="text-muted-foreground/45" />
          <span className="text-foreground font-semibold">TUTORIAL EMU8086</span>
        </div>

        {/* Header */}
        <div className="mb-10 relative">
          {/* Subtle background glow effect behind header */}
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-3 flex items-center gap-3 text-white">
            <Code2 className="text-primary animate-pulse" size={36} />
            Tutorial <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">EMU8086</span> e Intel 8086
          </h1>
          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Explora la arquitectura CISC del microprocesador Intel 8086. Programa mnemónicos reales en ensamblador, ejecuta instrucciones paso a paso, visualiza el banco de registros de 16 bits y monitorea la memoria del segmento de datos en tiempo real en nuestra terminal virtual MS-DOS de la UNI Nicaragua.
          </p>
        </div>

        {/* Simulator Workspace (Server loaded lessons, client simulator) */}
        <EMU8086Simulator tutorials={tutorials} />
      </section>
    </main>
  )
}

