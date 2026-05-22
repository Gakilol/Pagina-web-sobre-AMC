'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Cpu, BookOpen, Terminal, Download, Zap, CircuitBoard } from 'lucide-react'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '/unidades',         label: 'Unidades',        icon: BookOpen,     color: 'text-cyan-400',   border: 'hover:border-cyan-500/50',   bg: 'hover:bg-cyan-500/5' },
  { href: '/tutorial-emu8086', label: 'EMU8086',         icon: Terminal,     color: 'text-primary',    border: 'hover:border-primary/50',    bg: 'hover:bg-primary/5' },
  { href: '/tutorial-arduino', label: 'Arduino',         icon: CircuitBoard, color: 'text-emerald-400',border: 'hover:border-emerald-500/50',bg: 'hover:bg-emerald-500/5' },
  { href: '/descargas',        label: 'Descargas',       icon: Download,     color: 'text-amber-400',  border: 'hover:border-amber-500/50',  bg: 'hover:bg-amber-500/5' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]'
            : 'border-b border-transparent bg-background/40 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground font-bold text-sm font-mono shadow-lg group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
              <span className="relative z-10">AM</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-primary to-primary/80 opacity-100 group-hover:opacity-90 transition-opacity" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-bold text-base text-foreground group-hover:text-primary transition-colors duration-200">
                Arquitectura
              </span>
              <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest">
                de Máquinas 1 · UNI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon, color, border, bg }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? `border-primary/40 bg-primary/8 ${color}`
                      : `border-transparent text-muted-foreground ${border} ${bg} hover:text-foreground`
                  }`}
                >
                  <Icon size={15} className={isActive ? color : 'opacity-70'} />
                  <span>{label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-primary" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Status badge (desktop only) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/30 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SISTEMA ACTIVO
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-accent/60 rounded-xl transition-all duration-200 border border-transparent hover:border-border/40"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <Menu
                size={20}
                className={`absolute inset-0 transition-all duration-200 ${isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`}
              />
              <X
                size={20}
                className={`absolute inset-0 transition-all duration-200 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer panel */}
        <nav
          className={`absolute top-[61px] left-0 right-0 mx-3 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl shadow-2xl p-4 transition-all duration-300 ${
            isOpen
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-4 scale-98 pointer-events-none'
          }`}
        >
          <div className="flex flex-col gap-1.5">
            {NAV_LINKS.map(({ href, label, icon: Icon, color }, i) => {
              const isActive = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? 'border-primary/30 bg-primary/8 text-white'
                      : 'border-transparent text-muted-foreground hover:bg-accent/40 hover:text-foreground hover:border-border/50'
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${isActive ? 'bg-primary/15' : 'bg-muted/40'}`}>
                    <Icon size={16} className={isActive ? color : 'opacity-60'} />
                  </div>
                  <span>{label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-center gap-2 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">
            <Cpu size={10} className="text-primary/50" />
            <span>Arquitectura de Máquinas 1 · UNI RUPAP</span>
          </div>
        </nav>
      </div>
    </>
  )
}
