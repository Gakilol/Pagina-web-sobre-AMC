import { Header } from '@/components/header'
import Link from 'next/link'
import { 
  Cpu, 
  BookOpen, 
  Zap, 
  Code2, 
  Download, 
  ArrowRight,
  GraduationCap,
  Sparkles,
  CircuitBoard,
  Cpu as CpuIcon,
  Terminal,
  Brain,
  ChevronRight,
  Star
} from 'lucide-react'
import { getUnits } from '@/lib/db-service'

export default async function Home() {
  const units = await getUnits()

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Premium multi-layer background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Fine grid */}
        <div className="absolute inset-0 tech-grid-fine opacity-60" />
        {/* Coarse grid */}
        <div className="absolute inset-0 tech-grid-dark opacity-40" />
        {/* Ambient glow orbs */}
        <div className="absolute top-[-15%] left-[-8%] w-[55%] h-[55%] bg-primary/8 rounded-full blur-[130px]" />
        <div className="absolute bottom-[10%] right-[-8%] w-[60%] h-[60%] bg-cyan-500/6 rounded-full blur-[150px]" />
        <div className="absolute top-[45%] left-[35%] w-[28%] h-[28%] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-[70%] left-[5%] w-[20%] h-[20%] bg-emerald-500/5 rounded-full blur-[90px]" />
      </div>

      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8 z-10">
        {/* System Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/6 text-xs text-primary font-mono uppercase tracking-wider animate-pulse-slow">
            <Sparkles size={13} className="text-primary" />
            <span>SISTEMA EDUCATIVO DE BAJO NIVEL v2.0.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left animate-fade-in-up">
            <div className="space-y-5">
              {/* Institution label */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground text-sm font-mono tracking-widest uppercase">
                <GraduationCap className="text-primary" size={17} />
                <span>UNI Nicaragua &bull; RUPAP</span>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.6rem] text-pretty leading-[1.05]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  Arquitectura de{' '}
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-primary glow-cyan">
                  Máquinas 1
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
                Domina los fundamentos del hardware de computadoras, programación en lenguaje ensamblador para el microprocesador{' '}
                <strong className="text-primary font-mono">Intel 8086</strong>,
                arquitectura de microcontroladores y desarrollo con{' '}
                <strong className="text-emerald-400 font-mono">Arduino</strong>.
              </p>
            </div>

            {/* Bus pulse divider */}
            <div className="h-[2px] w-full max-w-sm bg-muted/20 relative rounded-full overflow-hidden mx-auto lg:mx-0">
              <div className="absolute inset-0 data-bus-pulse" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/unidades"
                className="btn-primary inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all duration-300"
              >
                <BookOpen size={18} />
                Comenzar Aprendizaje
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/tutorial-emu8086"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-primary/40 bg-primary/5 px-8 py-4 font-semibold text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-200 hover:shadow-[0_0_20px_-4px_oklch(0.68_0.17_228_/0.3)]"
              >
                <Terminal size={18} />
                Simulador CPU 8086
              </Link>
            </div>

            {/* Micro-features row */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-xs font-mono text-muted-foreground/70 uppercase tracking-wider pt-2">
              {['5 Unidades Curriculares', 'Simulador EMU8086', 'Tutorial Arduino', 'Quizzes Interactivos'].map((feat) => (
                <span key={feat} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary/60" />
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Right: CPU Diagram */}
          <div className="lg:col-span-5 flex items-center justify-center relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="relative w-full aspect-square max-w-[400px]">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/5 blur-sm" />

              <div className="relative rounded-2xl border border-primary/20 bg-card/50 p-5 shadow-2xl glass-panel overflow-hidden group animate-float">
                {/* Corner tech labels */}
                <div className="absolute top-2.5 left-3 font-mono text-[9px] text-muted-foreground/45 select-none">SYS_CLK: 4.77MHz</div>
                <div className="absolute top-2.5 right-3 font-mono text-[9px] text-muted-foreground/45 select-none">BUS: 16-BIT</div>
                <div className="absolute bottom-2.5 left-3 font-mono text-[9px] text-muted-foreground/45 select-none">ADDR_BUS: 20-BIT</div>
                <div className="absolute bottom-2.5 right-3 font-mono text-[9px] text-primary/50 select-none animate-pulse">ACTIVE ●</div>

                {/* Scanning animation line */}
                <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" style={{ animation: 'scanline 4s ease-in-out infinite' }} />

                {/* Central CPU core */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[160px] h-[160px] rounded-xl border border-primary/25 bg-primary/5 flex flex-col items-center justify-center glow-primary transition-all duration-500 group-hover:scale-110 group-hover:glow-cyan">
                    <CpuIcon size={44} className="text-primary mb-2" style={{ animation: 'pulseSlow 2.5s ease-in-out infinite' }} />
                    <span className="font-mono text-xs font-bold text-primary tracking-widest">INTEL 8086</span>
                    <span className="font-mono text-[9px] text-muted-foreground/70 mt-1">16-BIT CISC MPU</span>
                    {/* Bus lines */}
                    <div className="flex gap-1 mt-3">
                      {['EU', 'BIU', 'ALU'].map(unit => (
                        <span key={unit} className="text-[7px] font-mono text-muted-foreground/40 border border-muted/20 px-1 py-0.5 rounded">{unit}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Data Paths */}
                <div className="w-full h-full border border-dashed border-muted/15 rounded-lg flex flex-col justify-between p-3 pointer-events-none">
                  <div className="flex justify-between items-start text-[9px] font-mono text-muted-foreground/35">
                    <span>EXECUTION UNIT</span>
                    <span>BUS INTERFACE</span>
                  </div>

                  {/* Registers Grid */}
                  <div className="grid grid-cols-4 gap-1.5 mt-2">
                    {[
                      { name: 'AX', val: '00A0', color: 'text-cyan-400' },
                      { name: 'BX', val: '0000', color: 'text-primary' },
                      { name: 'CX', val: '0005', color: 'text-purple-400' },
                      { name: 'DX', val: '0000', color: 'text-amber-400' },
                    ].map(({ name, val, color }) => (
                      <div key={name} className="border border-muted/25 rounded-md p-1 text-center bg-background/40">
                        <div className="text-muted-foreground/60 text-[8px] font-mono">{name}</div>
                        <div className={`${color} font-bold text-[9px] font-mono`}>{val}h</div>
                      </div>
                    ))}
                  </div>

                  {/* Flags row */}
                  <div className="flex justify-around items-center bg-primary/5 border border-primary/15 rounded-md p-2 text-[8px] font-mono mt-auto">
                    <span className="text-muted-foreground/70">ZF: <strong className="text-emerald-400">1</strong></span>
                    <span className="w-[1px] h-3 bg-border/40" />
                    <span className="text-muted-foreground/70">CF: <strong className="text-primary">0</strong></span>
                    <span className="w-[1px] h-3 bg-border/40" />
                    <span className="text-muted-foreground/70">SF: <strong className="text-primary">0</strong></span>
                    <span className="w-[1px] h-3 bg-border/40" />
                    <span className="text-muted-foreground/70">IF: <strong className="text-emerald-400">1</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Unidades Temáticas', value: units.length, color: 'bg-primary', hover: 'group-hover:text-primary', note: 'Currículum Oficial UNI' },
            { label: 'Lecciones Académicas', value: '18+', color: 'bg-cyan-500', hover: 'group-hover:text-cyan-400', note: 'Con ejemplos y diagramas' },
            { label: 'Quizzes Interactivos', value: '6', color: 'bg-amber-500', hover: 'group-hover:text-amber-400', note: 'Retroalimentación técnica' },
            { label: 'Materiales Descargables', value: '6+', color: 'bg-emerald-500', hover: 'group-hover:text-emerald-400', note: 'Guías y prácticas Word/PDF' },
          ].map(({ label, value, color, hover, note }) => (
            <div key={label} className="relative rounded-xl border border-border/50 bg-card/35 p-5 glass-panel text-center overflow-hidden group glass-card-hover">
              <div className={`absolute top-0 left-0 w-full h-[3px] ${color}`} />
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">{label}</p>
              <h3 className={`text-3xl font-extrabold text-foreground transition-colors duration-200 ${hover}`}>{value}</h3>
              <div className="text-[9px] text-muted-foreground/55 mt-1 font-sans">{note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MODULE CARDS SECTION ===== */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-4">
            <Zap size={13} />
            <span>Módulos de Aprendizaje</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Módulos del Sistema Educativo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Explora las secciones especialmente diseñadas para facilitar el aprendizaje de hardware, arquitectura y sistemas embebidos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BookOpen,
              title: '1. Unidades Curriculares',
              desc: 'Accede al programa oficial de la UNI con lecciones detalladas, diagramas técnicos y quizzes de autoevaluación por unidad temática.',
              href: '/unidades',
              iconBg: 'bg-primary/10',
              iconColor: 'text-primary',
              borderHover: 'hover:border-primary/50',
              textHover: 'group-hover:text-primary',
              linkColor: 'text-primary',
              cta: 'Explorar Unidades',
            },
            {
              icon: Terminal,
              title: '2. Simulador CPU 8086',
              desc: 'Escribe código ensamblador Intel 8086 y visualiza en tiempo real cómo cambian los registros, banderas de estado y memoria.',
              href: '/tutorial-emu8086',
              iconBg: 'bg-cyan-500/10',
              iconColor: 'text-cyan-400',
              borderHover: 'hover:border-cyan-500/50',
              textHover: 'group-hover:text-cyan-400',
              linkColor: 'text-cyan-400',
              cta: 'Probar Simulador',
            },
            {
              icon: CircuitBoard,
              title: '3. Tutorial Arduino',
              desc: 'Simula circuitos de Arduino con LEDs, sensores de temperatura y semáforos en una interfaz visual interactiva e instructiva.',
              href: '/tutorial-arduino',
              iconBg: 'bg-emerald-500/10',
              iconColor: 'text-emerald-400',
              borderHover: 'hover:border-emerald-500/50',
              textHover: 'group-hover:text-emerald-400',
              linkColor: 'text-emerald-400',
              cta: 'Ver Arduino',
            },
            {
              icon: Download,
              title: '4. Repositorio de Guías',
              desc: 'Descarga guías oficiales de laboratorio en formato Word/PDF para practicar en EMU8086 y tus actividades académicas.',
              href: '/descargas',
              iconBg: 'bg-amber-500/10',
              iconColor: 'text-amber-400',
              borderHover: 'hover:border-amber-500/50',
              textHover: 'group-hover:text-amber-400',
              linkColor: 'text-amber-400',
              cta: 'Descargar Materiales',
            },
          ].map(({ icon: Icon, title, desc, href, iconBg, iconColor, borderHover, textHover, linkColor, cta }) => (
            <div
              key={href}
              className={`rounded-xl border border-border/50 bg-card/40 p-6 ${borderHover} transition-all duration-300 flex flex-col justify-between group glass-panel glass-card-hover cursor-pointer`}
            >
              <div>
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${iconBg} ${iconColor} mb-5 group-hover:scale-110 transition-transform duration-300 border border-current/10`}>
                  <Icon size={22} />
                </div>
                <h3 className={`text-base font-bold mb-2.5 text-foreground transition-colors duration-200 ${textHover}`}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{desc}</p>
              </div>
              <Link
                href={href}
                className={`inline-flex items-center gap-2 text-sm font-semibold ${linkColor} hover:underline group/btn`}
              >
                {cta}
                <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ===== INTERACTIVE DEMO SECTION ===== */}
      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 z-10">
        <div className="rounded-2xl border border-primary/20 bg-card/25 p-8 sm:p-12 glass-panel relative overflow-hidden group">
          {/* Background glow */}
          <div className="absolute top-[-60%] right-[-25%] w-[80%] h-[120%] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest">
                <CircuitBoard size={15} className="text-primary" style={{ animation: 'fanSpin 8s linear infinite' }} />
                <span>Interactividad Académica</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                ¿Por qué estudiar con simuladores interactivos?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                La arquitectura de computadoras puede sentirse abstracta. Al combinar teoría estructurada con un visualizador de CPU integrado y un simulador de circuitos Arduino, puedes &ldquo;ver&rdquo; cómo fluyen los datos dentro del microprocesador y los circuitos físicos en tiempo real.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {[
                  { title: 'Comprensión Directa', desc: 'Mapeo dinámico de registros y memoria.', icon: Brain },
                  { title: 'Evaluación Inmediata', desc: 'Feedback con justificación técnica.', icon: Star },
                  { title: 'Simulación de Hardware', desc: 'Arduino y EMU8086 en el navegador.', icon: CircuitBoard },
                  { title: 'Aprendizaje Activo', desc: 'Experimenta sin riesgo de errores reales.', icon: Zap },
                ].map(({ title, desc, icon: Icon }) => (
                  <div key={title} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white text-sm block">{title}</strong>
                      <span className="text-xs text-muted-foreground">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/tutorial-emu8086"
                  className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
                >
                  <Terminal size={15} />
                  Probar EMU8086
                </Link>
                <Link
                  href="/tutorial-arduino"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all"
                >
                  <CircuitBoard size={15} />
                  Simulador Arduino
                </Link>
              </div>
            </div>

            {/* Code preview panel */}
            <div className="lg:col-span-5 rounded-xl border border-border/40 bg-background/60 overflow-hidden font-mono text-xs glass-panel">
              <div className="flex items-center justify-between bg-card/80 px-4 py-2.5 border-b border-border/40">
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <Terminal size={13} />
                  PROG_8086.ASM
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
              </div>
              <div className="p-4 space-y-0.5 text-[11px] leading-relaxed">
                <div><span className="code-comment">; Suma de dos números de 8 bits</span></div>
                <div><span className="code-keyword">.model</span> <span className="text-muted-foreground/80">small</span></div>
                <div><span className="code-keyword">.data</span></div>
                <div className="pl-4"><span className="text-muted-foreground/70">n1 </span><span className="code-keyword">db</span> <span className="code-number">05h</span></div>
                <div className="pl-4"><span className="text-muted-foreground/70">n2 </span><span className="code-keyword">db</span> <span className="code-number">09h</span></div>
                <div className="pl-4"><span className="text-muted-foreground/70">res </span><span className="code-keyword">db</span> <span className="code-number">?</span></div>
                <div><span className="code-keyword">.code</span></div>
                <div className="pl-4"><span className="code-mnemonic">mov</span> <span className="code-register">ax</span>, <span className="code-muted">@data</span></div>
                <div className="pl-4"><span className="code-mnemonic">mov</span> <span className="code-register">ds</span>, <span className="code-register">ax</span></div>
                <div className="pl-4"><span className="code-mnemonic">mov</span> <span className="code-register">al</span>, n1</div>
                <div className="pl-4"><span className="code-mnemonic">add</span> <span className="code-register">al</span>, n2 <span className="code-comment">  ; AL = 0Eh</span></div>
                <div className="pl-4"><span className="code-mnemonic">mov</span> res, <span className="code-register">al</span></div>
                <div className="pl-4"><span className="code-mnemonic">mov</span> <span className="code-register">ah</span>, <span className="code-number">4ch</span></div>
                <div className="pl-4"><span className="code-mnemonic">int</span> <span className="code-number">21h</span></div>
              </div>
              <div className="border-t border-border/40 px-4 py-2 flex items-center justify-between text-[9px] text-muted-foreground/50 bg-card/60">
                <span>Líneas: 13 · Segmento: .code</span>
                <span className="text-emerald-400 font-bold">✓ Compilado OK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative border-t border-border/50 bg-card/20 backdrop-blur-sm z-10 mt-8">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-sm font-mono">
                  AM
                </div>
                <span className="font-bold text-base text-white">Arquitectura de Máquinas 1</span>
              </div>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Plataforma educativa interactiva para la carrera de Ingeniería de Sistemas y Computación de la Universidad Nacional de Ingeniería.
              </p>
              <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sistema activo</span>
              </div>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Navegación</p>
              {[
                { href: '/unidades', label: 'Unidades Curriculares' },
                { href: '/tutorial-emu8086', label: 'Simulador EMU8086' },
                { href: '/tutorial-arduino', label: 'Tutorial Arduino' },
                { href: '/descargas', label: 'Centro de Descargas' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 transition-all duration-150" />
                  {label}
                </Link>
              ))}
            </div>

            {/* Info */}
            <div className="text-right md:text-right">
              <p className="text-xs text-muted-foreground">Universidad Nacional de Ingeniería (UNI)</p>
              <p className="text-xs text-muted-foreground/60 mt-1">RUPAP · Managua, Nicaragua</p>
              <p className="text-[10px] text-muted-foreground/40 mt-3">
                © 2026 Arquitectura de Máquinas 1
              </p>
              <p className="text-[10px] text-muted-foreground/30 mt-1">
                Desarrollado con Next.js · React 19 · TailwindCSS 4
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
