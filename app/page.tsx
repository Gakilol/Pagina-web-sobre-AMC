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
  Terminal,
  Brain,
  ChevronRight,
  HelpCircle,
  Activity
} from 'lucide-react'
import { getUnits } from '@/lib/db-service'

export default async function Home() {
  const units = await getUnits()

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Premium multi-layer background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Fine grid */}
        <div className="absolute inset-0 tech-grid-fine opacity-65" />
        {/* Coarse grid */}
        <div className="absolute inset-0 tech-grid-dark opacity-45" />
        {/* Ambient glow orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/8 rounded-full blur-[130px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[55%] h-[55%] bg-cyan-500/6 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[110px]" />
        <div className="absolute top-[65%] left-[2%] w-[25%] h-[25%] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 z-10">
        {/* System Badge */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-primary/35 bg-primary/10 text-[10px] text-primary font-mono uppercase tracking-widest animate-pulse-slow">
            <Sparkles size={12} className="text-primary" />
            <span>ARQUITECTURA DE MÁQUINAS 1 &bull; UNI NICARAGUA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left animate-fade-in-up">
            <div className="space-y-6">
              {/* Institution label */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground text-xs font-mono tracking-widest uppercase">
                <GraduationCap className="text-primary" size={18} />
                <span>Universidad Nacional de Ingeniería &bull; RUSB</span>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.8rem] text-pretty leading-[1.05]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                  Explora la Computación de
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-primary glow-cyan">
                  Bajo Nivel
                </span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
                Aprenda los fundamentos físicos y lógicos de la arquitectura de computadoras. Programe microprocesadores CISC <strong className="text-primary font-mono">Intel 8086</strong> en lenguaje ensamblador y simule sistemas embebidos utilizando controladores <strong className="text-emerald-400 font-mono">Arduino</strong> de tipo RISC.
              </p>
            </div>

            {/* Bus pulse divider */}
            <div className="h-[2px] w-full max-w-sm bg-muted/20 relative rounded-full overflow-hidden mx-auto lg:mx-0 my-2">
              <div className="absolute inset-0 data-bus-pulse" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/unidades"
                className="btn-primary inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all duration-300 cursor-pointer"
              >
                <BookOpen size={16} />
                Comenzar Aprendizaje
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/tutorial-emu8086"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-primary/40 bg-primary/5 px-8 py-4 text-sm font-bold text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-200 hover:shadow-[0_0_20px_-4px_rgba(9,137,255,0.25)] cursor-pointer"
              >
                <Terminal size={16} />
                Simulador CPU 8086
              </Link>
            </div>

            {/* Micro-features row */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider pt-2 select-none">
              {['7 Unidades Académicas', 'Intérprete EMU8086', 'Laboratorio Arduino', 'Glosario Interactivo'].map((feat) => (
                <span key={feat} className="flex items-center gap-1.5 bg-card/45 border border-border/40 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse" />
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Right: CPU Diagram */}
          <div className="lg:col-span-5 flex items-center justify-center relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="relative w-full aspect-square max-w-[420px]">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/5 blur-sm" />

              <div className="relative rounded-2xl border border-primary/20 bg-card/65 p-6 shadow-2xl glass-panel overflow-hidden group animate-float">
                {/* Corner tech labels */}
                <div className="absolute top-2.5 left-3 font-mono text-[8px] text-muted-foreground/45 select-none">SYS_CLK: 4.77MHz</div>
                <div className="absolute top-2.5 right-3 font-mono text-[8px] text-muted-foreground/45 select-none">BUS: 16-BIT</div>
                <div className="absolute bottom-2.5 left-3 font-mono text-[8px] text-muted-foreground/45 select-none">ADDR_BUS: 20-BIT</div>
                <div className="absolute bottom-2.5 right-3 font-mono text-[8px] text-primary/50 select-none animate-pulse">ACTIVE ●</div>

                {/* Scanning animation line */}
                <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" style={{ animation: 'scanline 4s ease-in-out infinite' }} />

                {/* Data Paths */}
                <div className="w-full h-full border border-dashed border-muted/15 rounded-lg flex flex-col justify-between p-3 pointer-events-none">
                  {/* Grid layout containing EU, CPU Core, and BIU */}
                  <div className="grid grid-cols-12 gap-2 flex-1 items-center w-full">
                    {/* Left Column: Execution Unit */}
                    <div className="col-span-3 flex flex-col justify-center h-full gap-2">
                      <span className="text-[7.5px] font-mono text-muted-foreground/35 text-center uppercase tracking-wider font-bold">EXEC UNIT</span>
                      <div className="space-y-2">
                        {[
                          { name: 'AX', val: '00A0', color: 'text-cyan-400' },
                          { name: 'BX', val: '0000', color: 'text-primary' },
                        ].map(({ name, val, color }) => (
                          <div key={name} className="border border-muted/25 rounded-md p-1.5 text-center bg-background/50">
                            <div className="text-muted-foreground/60 text-[7.5px] font-mono">{name}</div>
                            <div className={`${color} font-bold text-[9px] font-mono`}>{val}h</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Center Column: CPU Core */}
                    <div className="col-span-6 flex flex-col items-center justify-center">
                      <div className="w-[125px] h-[125px] sm:w-[145px] sm:h-[145px] rounded-xl border border-primary/25 bg-primary/5 flex flex-col items-center justify-center glow-primary transition-all duration-500 group-hover:scale-105 group-hover:glow-cyan">
                        <Cpu size={30} className="text-primary mb-1 animate-pulse-slow" />
                        <span className="font-mono text-[9px] sm:text-[10px] font-bold text-primary tracking-widest">INTEL 8086</span>
                        <span className="font-mono text-[6px] sm:text-[7px] text-muted-foreground/70 mt-0.5">16-BIT CISC MPU</span>
                        {/* Bus lines */}
                        <div className="flex gap-1 mt-2">
                          {['EU', 'BIU', 'ALU'].map(unit => (
                            <span key={unit} className="text-[6px] font-mono text-muted-foreground/45 border border-muted/20 px-1 py-0.2 rounded bg-card/30">{unit}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Bus Interface */}
                    <div className="col-span-3 flex flex-col justify-center h-full gap-2">
                      <span className="text-[7.5px] font-mono text-muted-foreground/35 text-center uppercase tracking-wider font-bold">BUS INTER</span>
                      <div className="space-y-2">
                        {[
                          { name: 'CX', val: '0005', color: 'text-purple-400' },
                          { name: 'DX', val: '0000', color: 'text-amber-400' },
                        ].map(({ name, val, color }) => (
                          <div key={name} className="border border-muted/25 rounded-md p-1.5 text-center bg-background/50">
                            <div className="text-muted-foreground/60 text-[7.5px] font-mono">{name}</div>
                            <div className={`${color} font-bold text-[9px] font-mono`}>{val}h</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Flags row */}
                  <div className="flex justify-around items-center bg-primary/5 border border-primary/15 rounded-md p-1.5 text-[8px] font-mono mt-2">
                    <span className="text-muted-foreground/75">ZF: <strong className="text-emerald-400">1</strong></span>
                    <span className="w-[1px] h-3 bg-border/40" />
                    <span className="text-muted-foreground/75">CF: <strong className="text-primary">0</strong></span>
                    <span className="w-[1px] h-3 bg-border/40" />
                    <span className="text-muted-foreground/75">SF: <strong className="text-primary">0</strong></span>
                    <span className="w-[1px] h-3 bg-border/40" />
                    <span className="text-muted-foreground/75">IF: <strong className="text-emerald-400">1</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 z-10 select-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Unidades Temáticas', value: units.length, color: 'bg-primary', hover: 'group-hover:text-primary', note: 'Currículum Oficial UNI' },
            { label: 'Lecciones Académicas', value: '21 Lecciones', color: 'bg-cyan-500', hover: 'group-hover:text-cyan-400', note: 'Con ejemplos y diagramas' },
            { label: 'Quizzes Interactivos', value: '7 Quizzes', color: 'bg-amber-500', hover: 'group-hover:text-amber-400', note: 'Autoevaluación técnica' },
            { label: 'Materiales Prácticos', value: '7+ Archivos', color: 'bg-emerald-500', hover: 'group-hover:text-emerald-400', note: 'Guías de laboratorio Word/PDF' },
          ].map(({ label, value, color, hover, note }) => (
            <div key={label} className="relative rounded-xl border border-border/50 bg-card/35 p-5 glass-panel text-center overflow-hidden group glass-card-hover">
              <div className={`absolute top-0 left-0 w-full h-[3px] ${color}`} />
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5">{label}</p>
              <h3 className={`text-2xl font-extrabold text-white transition-colors duration-200 ${hover}`}>{value}</h3>
              <div className="text-[9px] text-muted-foreground/60 mt-1 font-sans">{note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MODULE CARDS SECTION ===== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-12 select-none">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-3">
            <Zap size={13} />
            <span>Módulos de Aprendizaje</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Estructura del Sistema Educativo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xs sm:text-sm">
            Acceda a las diferentes secciones diseñadas para guiar el estudio de la arquitectura y la programación física en bajo nivel.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: '1. Unidades Curriculares',
              desc: 'Acceda al programa del curso de la UNI Nicaragua con explicaciones completas por unidad temática.',
              href: '/unidades',
              iconBg: 'bg-primary/10',
              iconColor: 'text-primary',
              borderHover: 'hover:border-primary/50',
              textHover: 'group-hover:text-primary',
              linkColor: 'text-primary',
              cta: 'Explorar Contenido',
            },
            {
              icon: Terminal,
              title: '2. Simulador CPU 8086',
              desc: 'Editor e intérprete integrado para escribir ensamblador y ver registros, banderas y memoria en tiempo real.',
              href: '/tutorial-emu8086',
              iconBg: 'bg-cyan-500/10',
              iconColor: 'text-cyan-400',
              borderHover: 'hover:border-cyan-500/50',
              textHover: 'group-hover:text-cyan-400',
              linkColor: 'text-cyan-400',
              cta: 'Ejecutar Ensamblador',
            },
            {
              icon: CircuitBoard,
              title: '3. Laboratorio Arduino',
              desc: 'Esquematice y simule proyectos de microcontroladores utilizando sensores y actuadores interactivos.',
              href: '/tutorial-arduino',
              iconBg: 'bg-emerald-500/10',
              iconColor: 'text-emerald-400',
              borderHover: 'hover:border-emerald-500/50',
              textHover: 'group-hover:text-emerald-400',
              linkColor: 'text-emerald-400',
              cta: 'Abrir Workbench',
            },
            {
              icon: Zap,
              title: '4. Mapas Conceptuales',
              desc: 'Visualizaciones interactivas de bloques lógicos (CPU, ALU, buses y memorias) con explicaciones técnicas.',
              href: '/diagramas',
              iconBg: 'bg-purple-500/10',
              iconColor: 'text-purple-400',
              borderHover: 'hover:border-purple-500/50',
              textHover: 'group-hover:text-purple-400',
              linkColor: 'text-purple-400',
              cta: 'Ver Diagramas',
            },
            {
              icon: HelpCircle,
              title: '5. Glosario Técnico',
              desc: 'Diccionario y glosario interactivo de conceptos de hardware, memorias, registros e interrupciones.',
              href: '/glosario',
              iconBg: 'bg-rose-500/10',
              iconColor: 'text-rose-400',
              borderHover: 'hover:border-rose-500/50',
              textHover: 'group-hover:text-rose-400',
              linkColor: 'text-rose-400',
              cta: 'Consultar Glosario',
            },
            {
              icon: Download,
              title: '6. Repositorio de Guías',
              desc: 'Repositorio unificado de archivos complementarios oficiales y guías prácticas de laboratorio Word/PDF.',
              href: '/descargas',
              iconBg: 'bg-amber-500/10',
              iconColor: 'text-amber-400',
              borderHover: 'hover:border-amber-500/50',
              textHover: 'group-hover:text-amber-400',
              linkColor: 'text-amber-400',
              cta: 'Descargar Guías',
            },
          ].map(({ icon: Icon, title, desc, href, iconBg, iconColor, borderHover, textHover, linkColor, cta }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-xl border border-border/50 bg-card/45 p-6 ${borderHover} transition-all duration-300 flex flex-col justify-between group glass-panel glass-card-hover cursor-pointer`}
            >
              <div>
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${iconBg} ${iconColor} mb-5 group-hover:scale-105 transition-transform duration-300 border border-current/10`}>
                  <Icon size={20} />
                </div>
                <h3 className={`text-base font-bold mb-2.5 text-white transition-colors duration-200 ${textHover}`}>{title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">{desc}</p>
              </div>
              <div
                className={`inline-flex items-center gap-2 text-xs font-semibold ${linkColor} hover:underline group/btn`}
              >
                {cta}
                <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== INTERACTIVE DEMO SECTION ===== */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 z-10 mb-10">
        <div className="rounded-2xl border border-primary/20 bg-card/25 p-8 sm:p-12 glass-panel relative overflow-hidden group">
          {/* Background glow */}
          <div className="absolute top-[-60%] right-[-25%] w-[80%] h-[120%] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest select-none">
                <Activity size={14} className="text-primary" />
                <span>Interactividad Académica</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Teoría estructurada integrada con laboratorios virtuales
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-sans">
                La arquitectura de hardware puede ser abstracta de comprender. Al integrar el contenido académico estructurado de la UNI con un simulador x86 visual y un laboratorio de componentes para Arduino, usted podrá analizar en tiempo real el flujo de datos dentro de los registros y microcontroladores sin necesidad de hardware físico.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 select-none">
                {[
                  { title: 'Depuración paso a paso', desc: 'Mapeo de instrucciones del emulador 8086.', icon: Terminal },
                  { title: 'Simulación Física', desc: 'Esquematización y cableado interactivo.', icon: CircuitBoard },
                  { title: 'Autoevaluaciones', desc: 'Cuestionarios interactivos con retroalimentación.', icon: Brain },
                  { title: 'Modo Sandbox', desc: 'Experimentación libre con piezas y sensores.', icon: Zap },
                ].map(({ title, desc, icon: Icon }) => (
                  <div key={title} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white text-xs sm:text-sm block">{title}</strong>
                      <span className="text-[11px] text-muted-foreground">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/tutorial-emu8086"
                  className="btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20"
                >
                  <Terminal size={14} />
                  Probar EMU8086
                </Link>
                <Link
                  href="/tutorial-arduino"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/55 transition-all"
                >
                  <CircuitBoard size={14} />
                  Laboratorio Arduino
                </Link>
              </div>
            </div>

            {/* Code preview panel */}
            <div className="lg:col-span-5 rounded-xl border border-border/40 bg-background/60 overflow-hidden font-mono text-xs glass-panel select-none">
              <div className="flex items-center justify-between bg-card/85 px-4 py-2.5 border-b border-border/40">
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <Terminal size={13} />
                  SUMADOR_8086.ASM
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
              </div>
              <div className="p-4 space-y-0.5 text-[10px] sm:text-[11px] leading-relaxed">
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
      <footer className="relative border-t border-border/50 bg-card/20 backdrop-blur-sm z-10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3 select-none">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-xs font-mono">
                  AM
                </div>
                <span className="font-bold text-sm text-white">Arquitectura de Máquinas 1</span>
              </div>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed font-sans">
                Plataforma interactiva para Ingeniería de Sistemas y Computación de la Universidad Nacional de Ingeniería (UNI Nicaragua).
              </p>
              <div className="flex items-center gap-2 mt-4 text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Servicios activos</span>
              </div>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-2 select-none">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Módulos</p>
              {[
                { href: '/unidades', label: 'Unidades Curriculares' },
                { href: '/tutorial-emu8086', label: 'Simulador EMU8086' },
                { href: '/tutorial-arduino', label: 'Laboratorio Arduino' },
                { href: '/diagramas', label: 'Mapas Conceptuales' },
                { href: '/glosario', label: 'Glosario Técnico' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                  <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 -ml-1.5 transition-all duration-150" />
                  {label}
                </Link>
              ))}
            </div>

            {/* Info */}
            <div className="text-left md:text-right select-none">
              <p className="text-xs text-muted-foreground font-semibold">Universidad Nacional de Ingeniería (UNI)</p>
              <p className="text-xs text-muted-foreground/60 mt-1 font-sans">Recinto Universitario Simón Bolívar (RUSB)</p>
              <p className="text-[9px] text-muted-foreground/40 mt-3 font-mono">
                &copy; 2026 Arquitectura de Máquinas 1. UNI Nicaragua.
              </p>
              <p className="text-[9px] text-muted-foreground/30 mt-1 font-mono">
                Next.js &bull; React 19 &bull; Tailwind v4 &bull; Supabase SSR
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
