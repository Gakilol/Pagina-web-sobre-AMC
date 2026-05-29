import { Header } from '@/components/header'
import { ArduinoSimulator } from '@/components/arduino-simulator'
import Link from 'next/link'
import { Home, ChevronRight, CircuitBoard, Cpu, Zap, BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Tutorial Arduino — Arquitectura de Máquinas 1 | UNI Nicaragua',
  description: 'Simulador interactivo de circuitos Arduino para la clase de Arquitectura de Máquinas 1. Aprende a controlar LEDs, semáforos y sensores de temperatura con código C/C++.',
}

export default function TutorialArduinoPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden pb-20">
      {/* Background layers */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 tech-grid-fine opacity-50" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <Header />

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Home size={13} />
            <span>Inicio</span>
          </Link>
          <ChevronRight size={11} className="text-muted-foreground/40" />
          <span className="text-foreground font-semibold">Tutorial Arduino</span>
        </div>

        {/* Page Header */}
        <div className="mb-10 relative">
          <div className="absolute -left-8 -top-8 w-48 h-48 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start gap-4 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex-shrink-0">
              <CircuitBoard size={26} className="text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
                <Zap size={12} />
                <span>Unidad 6 · Microcontroladores y Embebidos</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3 flex-wrap">
                Tutorial{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Arduino</span>
                {' '}e Interactivos
              </h1>
            </div>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-4xl leading-relaxed">
            Experimenta con circuitos de Arduino Uno directamente en tu navegador. Selecciona un proyecto de la{' '}
            <strong className="text-white">Actividad 6</strong>, observa el circuito SVG animado en tiempo real,
            revisa el código fuente C/C++ correspondiente y lee el monitor serial. ¡Incluso puedes usar el modo{' '}
            <strong className="text-emerald-400">Creador de Circuitos (Sandbox)</strong> para colocar tus propias piezas y conectar cables interactivos en tiempo real!
          </p>
        </div>

        {/* Quick reference strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { icon: Cpu, label: 'Microcontrolador', value: 'ATmega328P', color: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-500/20' },
            { icon: Zap, label: 'Frecuencia', value: '16 MHz', color: 'text-cyan-400', bg: 'bg-cyan-500/8', border: 'border-cyan-500/20' },
            { icon: CircuitBoard, label: 'Arquitectura', value: 'AVR RISC', color: 'text-purple-400', bg: 'bg-purple-500/8', border: 'border-purple-500/20' },
            { icon: BookOpen, label: 'Proyectos', value: '5 Ejemplos + Sandbox', color: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/20' },
          ].map(({ icon: Icon, label, value, color, bg, border }) => (
            <div key={label} className={`flex items-center gap-3 p-3.5 rounded-xl border ${border} ${bg} glass-panel`}>
              <div className={`flex-shrink-0 ${color}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground/60 font-mono uppercase">{label}</p>
                <p className={`text-sm font-bold ${color}`}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Simulator Workspace */}
        <div className="rounded-2xl border border-emerald-500/15 bg-card/20 glass-panel p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border/40">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
            </div>
            <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
              ESPACIO DE TRABAJO — SIMULADOR ARDUINO
            </span>
            <div className="ml-auto text-[10px] font-mono text-emerald-400/60 hidden sm:block">
              Arduino IDE v2.3 · C/C++ ATmega
            </div>
          </div>

          <ArduinoSimulator />
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 glass-panel flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <BookOpen size={20} />
            </div>
            <div>
              <h4 className="font-bold text-white">¿Quieres profundizar más?</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Revisa las lecciones de la Unidad 6 sobre arquitectura de microcontroladores y sistemas de control.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/unidades/unidad-6"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors font-mono tracking-wider uppercase cursor-pointer shadow-lg shadow-primary/20"
            >
              Ver Unidad 6
              <ChevronRight size={14} />
            </Link>
            <Link
              href="/tutorial-emu8086"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/60 text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors font-mono tracking-wider uppercase cursor-pointer"
            >
              Ir a EMU8086
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
