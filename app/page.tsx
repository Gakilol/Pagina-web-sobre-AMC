import { Header } from '@/components/header'
import Link from 'next/link'
import { 
  Cpu, 
  Layers, 
  Settings2, 
  Terminal, 
  BookOpen, 
  Zap, 
  Code2, 
  Download, 
  ArrowRight,
  GraduationCap,
  Sparkles,
  CircuitBoard,
  Cpu as CpuIcon
} from 'lucide-react'
import { getUnits } from '@/lib/db-service'

export default async function Home() {
  const units = await getUnits()

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Grid and Ambient Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <Header />

      {/* Cybernetic Header / Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 z-10">
        {/* Central Circuit Indicator */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary font-mono glow-primary uppercase tracking-wider animate-pulse">
            <Sparkles size={14} className="text-primary" />
            <span>SISTEMA EDUCATIVO DE BAJO NIVEL v1.0.0</span>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground text-sm font-mono tracking-widest uppercase">
                <GraduationCap className="text-primary" size={18} />
                <span>UNI NICARAGUA • RUPAP</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-pretty bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-primary/80 leading-none">
                Arquitectura de <span className="text-primary glow-cyan">Máquinas 1</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
                Domina los misterios del hardware de computadoras y la programación en lenguaje ensamblador para el microprocesador <strong className="text-primary font-mono">Intel 8086</strong>. Una experiencia interactiva adaptada para la Universidad Nacional de Ingeniería.
              </p>
            </div>

            {/* Circuit Pulse Visual Line */}
            <div className="h-[2px] w-full max-w-md bg-muted/30 relative rounded overflow-hidden mx-auto lg:mx-0">
              <div className="absolute inset-0 data-bus-pulse"></div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/unidades"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 font-semibold text-primary-foreground hover:bg-primary/95 transition-all shadow-lg hover:shadow-primary/30 scale-100 hover:scale-[1.02] active:scale-95 duration-200 cursor-pointer"
              >
                Comenzar Aprendizaje <ArrowRight size={20} />
              </Link>
              <Link
                href="/tutorial-emu8086"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/50 bg-primary/5 px-8 py-4 font-semibold text-primary hover:bg-primary/10 hover:border-primary transition-all duration-200 cursor-pointer"
              >
                Simulador & Tutorial CPU
              </Link>
            </div>
          </div>

          {/* Hero Right Visual: CPU / Motherboard Diagram */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full aspect-square max-w-[420px] rounded-2xl border border-primary/20 bg-card p-6 shadow-2xl glass-panel relative overflow-hidden group">
              {/* Corner tech indicators */}
              <div className="absolute top-2 left-2 font-mono text-[9px] text-muted-foreground/60 select-none">SYS_CLK: 4.77MHz</div>
              <div className="absolute top-2 right-2 font-mono text-[9px] text-muted-foreground/60 select-none">BUS: 16-BIT</div>
              <div className="absolute bottom-2 left-2 font-mono text-[9px] text-muted-foreground/60 select-none">ADDR_BUS: 20-BIT</div>
              <div className="absolute bottom-2 right-2 font-mono text-[9px] text-primary/60 select-none animate-pulse">ACTIVE_STATE</div>

              {/* Glowing internal CPU core */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[180px] h-[180px] rounded-xl border border-primary/30 bg-primary/5 flex flex-col items-center justify-center glow-primary transition-transform duration-500 group-hover:scale-105">
                  <CpuIcon size={48} className="text-primary animate-pulse mb-2" />
                  <span className="font-mono text-xs font-bold text-primary tracking-widest">INTEL 8086</span>
                  <span className="font-mono text-[9px] text-muted-foreground/80 mt-1">16-BIT MPU</span>
                </div>
              </div>

              {/* Data paths (decorative borders) */}
              <div className="w-full h-full border border-dashed border-muted/20 rounded-lg flex flex-col justify-between p-4 relative pointer-events-none">
                <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40">
                  <span>EU (EXECUTION UNIT)</span>
                  <span>BIU (BUS INTERFACE UNIT)</span>
                </div>
                
                {/* Registers Visual Row */}
                <div className="grid grid-cols-4 gap-2 pt-2">
                  <div className="border border-muted/30 rounded p-1 text-center bg-background/50 font-mono text-[9px]">
                    <div className="text-muted-foreground">AX</div>
                    <div className="text-primary font-bold">0000h</div>
                  </div>
                  <div className="border border-muted/30 rounded p-1 text-center bg-background/50 font-mono text-[9px]">
                    <div className="text-muted-foreground">BX</div>
                    <div className="text-primary font-bold">0000h</div>
                  </div>
                  <div className="border border-muted/30 rounded p-1 text-center bg-background/50 font-mono text-[9px]">
                    <div className="text-muted-foreground">CX</div>
                    <div className="text-primary font-bold">0000h</div>
                  </div>
                  <div className="border border-muted/30 rounded p-1 text-center bg-background/50 font-mono text-[9px]">
                    <div className="text-muted-foreground">DX</div>
                    <div className="text-primary font-bold">0000h</div>
                  </div>
                </div>

                {/* Status Flags Row */}
                <div className="flex justify-around items-center bg-primary/5 border border-primary/20 rounded p-2 text-[9px] font-mono mt-auto">
                  <span className="text-muted-foreground">ZF: <strong className="text-emerald-500">1</strong></span>
                  <span className="text-muted-foreground">CF: <strong className="text-primary">0</strong></span>
                  <span className="text-muted-foreground">SF: <strong className="text-primary">0</strong></span>
                  <span className="text-muted-foreground">IF: <strong className="text-emerald-500">1</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Core Statistics (Dynamic Grid) */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-border bg-card/40 p-5 glass-panel text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary"></div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Unidades Temáticas</p>
            <h3 className="text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors">{units.length}</h3>
            <div className="text-[10px] text-muted-foreground/70 mt-1">Currículum Oficial UNI Nicaragua</div>
          </div>
          <div className="rounded-xl border border-border bg-card/40 p-5 glass-panel text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500"></div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Lecciones Académicas</p>
            <h3 className="text-3xl font-extrabold text-foreground group-hover:text-blue-500 transition-colors">15+</h3>
            <div className="text-[10px] text-muted-foreground/70 mt-1">Con guías prácticas y ejemplos</div>
          </div>
          <div className="rounded-xl border border-border bg-card/40 p-5 glass-panel text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-500"></div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Cuestionarios Interactivos</p>
            <h3 className="text-3xl font-extrabold text-foreground group-hover:text-amber-500 transition-colors">5</h3>
            <div className="text-[10px] text-muted-foreground/70 mt-1">Con retroalimentación y explicaciones</div>
          </div>
          <div className="rounded-xl border border-border bg-card/40 p-5 glass-panel text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500"></div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Descarga de Materiales</p>
            <h3 className="text-3xl font-extrabold text-foreground group-hover:text-emerald-500 transition-colors">6+</h3>
            <div className="text-[10px] text-muted-foreground/70 mt-1">Guías oficiales en formato Word/PDF</div>
          </div>
        </div>
      </section>

      {/* Main Feature Cards Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary/80">
            Módulos del Sistema Educativo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora las diferentes secciones especialmente diseñadas para facilitar el aprendizaje de conceptos de hardware y ensamblador.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 - Unidades */}
          <div className="rounded-xl border border-border bg-card/50 p-6 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group glass-panel glass-card-hover">
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">1. Unidades Curriculares</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Accede a los temas del programa del curso oficial de la UNI Nicaragua. Desglosado en explicaciones claras, diagramas estáticos y contenido técnico riguroso.
              </p>
            </div>
            <Link
              href="/unidades"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline group/btn"
            >
              Explorar Unidades
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2 - Simulador Assembly */}
          <div className="rounded-xl border border-border bg-card/50 p-6 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group glass-panel glass-card-hover">
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-blue-400 transition-colors">2. Simulador CPU 8086</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Escribe código en lenguaje ensamblador Intel 8086 y observa en tiempo real cómo cambian los registros (AX, BX, CX, DX) y la memoria del procesador paso a paso.
              </p>
            </div>
            <Link
              href="/tutorial-emu8086"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:underline group/btn"
            >
              Probar Simulador
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 3 - Materiales y Guías */}
          <div className="rounded-xl border border-border bg-card/50 p-6 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between group glass-panel glass-card-hover">
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                <Download size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-emerald-400 transition-colors">3. Repositorio de Guías</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Descarga las guías oficiales de laboratorio práctico que se imparten en la asignatura. Un sistema de archivos local escalable y categorizado.
              </p>
            </div>
            <Link
              href="/descargas"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:underline group/btn"
            >
              Descargar Materiales
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture Concept Showcase Block */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 z-10">
        <div className="rounded-2xl border border-primary/20 bg-card/30 p-8 sm:p-12 glass-panel relative overflow-hidden group">
          <div className="absolute top-[-50%] right-[-30%] w-[80%] h-[100%] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>
          
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest">
                <CircuitBoard size={16} className="text-primary animate-spin" style={{ animationDuration: '6s' }} />
                <span>Interactividad Académica</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                ¿Por qué estudiar con simuladores interactivos?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                La arquitectura de computadoras a menudo se siente abstracta. Al combinar explicaciones teóricas estructuradas con cuestionarios interactivos de autoevaluación y un visualizador de CPU integrado, puedes "ver" cómo fluye la corriente y los datos dentro del microprocesador en tiempo real.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <div>
                    <strong className="text-white block font-sans">Comprensión Directa</strong>
                    <span className="text-xs text-muted-foreground">Mapeo dinámico de memoria y registros.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <div>
                    <strong className="text-white block font-sans">Evaluación Inmediata</strong>
                    <span className="text-xs text-muted-foreground">Feedback con justificación técnica detallada.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center border border-muted/20 bg-background/50 rounded-xl p-6 font-mono text-xs text-muted-foreground/80 space-y-4">
              <div className="flex items-center justify-between border-b border-muted/30 pb-2">
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <Terminal size={14} />
                  PROG_8086.ASM
                </span>
                <span className="text-[10px] text-muted-foreground/50">8086 Assembly</span>
              </div>
              <pre className="text-foreground overflow-x-auto leading-relaxed select-none">
                <code className="text-primary-foreground/90">{`; Suma de dos números de 8 bits
.model small
.data
    n1 db 05h
    n2 db 09h
    res db ?
.code
    mov ax, @data
    mov ds, ax
    mov al, n1
    add al, n2
    mov res, al
    mov ah, 4ch
    int 21h`}</code>
              </pre>
              <div className="border-t border-muted/30 pt-2 flex items-center justify-between text-[10px] text-muted-foreground/50">
                <span>Líneas: 13</span>
                <span className="text-emerald-400 font-bold">Compilado OK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/60 bg-card/25 backdrop-blur z-10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">
                  AM
                </div>
                <span className="font-bold text-lg text-white">Arquitectura de Máquinas 1</span>
              </div>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto md:mx-0">
                Plataforma educativa interactiva creada para la carrera de Ingeniería de Sistemas y Computación de la Universidad Nacional de Ingeniería.
              </p>
            </div>
            
            <div className="flex justify-center gap-6 text-sm font-medium">
              <Link href="/unidades" className="hover:text-primary transition-colors">Unidades</Link>
              <Link href="/tutorial-emu8086" className="hover:text-primary transition-colors">Simulador</Link>
              <Link href="/descargas" className="hover:text-primary transition-colors">Descargas</Link>
            </div>

            <div className="text-center md:text-right">
              <p className="text-xs text-muted-foreground">
                Universidad Nacional de Ingeniería (UNI)
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Managua, Nicaragua
              </p>
              <p className="text-[10px] text-muted-foreground/50 mt-2">
                © 2026 Arquitectura de Máquinas 1. Desarrollado con tecnología local-first.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
