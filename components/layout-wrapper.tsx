'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Menu, X, BookOpen, Terminal, CircuitBoard, Zap, HelpCircle, 
  Download, Search, Home, ChevronRight, Cpu, ArrowLeftRight
} from 'lucide-react'
import { localUnits } from '@/lib/data/units'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // Auto trigger search dialog
  const triggerSearch = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
      cancelable: true
    })
    window.dispatchEvent(event)
  }

  // Create Breadcrumbs based on the URL path
  const getBreadcrumbs = () => {
    const parts = pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ label: 'Inicio', href: '/' }]

    let currentPath = ''
    parts.forEach((part, index) => {
      currentPath += `/${part}`
      
      let label = part.charAt(0).toUpperCase() + part.slice(1)
      
      if (part === 'unidades') {
        label = 'Unidades'
      } else if (part === 'tutorial-emu8086') {
        label = 'EMU8086'
      } else if (part === 'tutorial-arduino') {
        label = 'Arduino'
      } else if (part === 'diagramas') {
        label = 'Diagramas'
      } else if (part === 'glosario') {
        label = 'Glosario'
      } else if (part === 'descargas') {
        label = 'Descargas'
      } else if (part.startsWith('unidad-')) {
        const unitNum = part.split('-')[1]
        label = `Unidad 0${unitNum}`
      } else if (part.length > 20) {
        // dynamic ID fallback
        label = 'Detalle'
      }

      breadcrumbs.push({ label, href: currentPath })
    })

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  const sidebarLinks = [
    { href: '/unidades',         label: 'Unidades Académicas', icon: BookOpen,     color: 'text-cyan-400' },
    { href: '/tutorial-emu8086', label: 'Simulador EMU8086',   icon: Terminal,     color: 'text-primary' },
    { href: '/tutorial-arduino', label: 'Laboratorio Arduino', icon: CircuitBoard, color: 'text-emerald-400' },
    { href: '/diagramas',        label: 'Mapas Conceptuales',  icon: Zap,          color: 'text-purple-400' },
    { href: '/glosario',         label: 'Glosario Técnico',    icon: HelpCircle,   color: 'text-rose-400' },
    { href: '/descargas',        label: 'Centro de Descargas', icon: Download,     color: 'text-amber-400' },
  ]

  return (
    <div className="min-h-screen bg-background relative flex overflow-hidden">
      {/* Dynamic glow orbs in the layout background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 tech-grid-fine opacity-[0.25]" />
        <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-primary/4 rounded-full blur-[130px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[45%] h-[45%] bg-cyan-500/3 rounded-full blur-[140px]" />
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside 
        className={`hidden lg:flex flex-col flex-shrink-0 border-r border-border/40 bg-card/15 backdrop-blur-2xl transition-all duration-300 z-30 relative ${
          isSidebarCollapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        {/* Sidebar Header / Brand */}
        <div className="p-4 flex items-center justify-between border-b border-border/40 h-16">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-xs font-mono shadow-md group-hover:shadow-primary/35 transition-all duration-300 flex-shrink-0">
              <span>AM</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-primary/80" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col leading-none animate-fade-in select-none">
                <span className="font-bold text-xs text-white group-hover:text-primary transition-colors">
                  Arquitectura
                </span>
                <span className="text-[8px] font-mono text-muted-foreground/60 uppercase tracking-wider mt-0.5">
                  Máquinas 1 · UNI
                </span>
              </div>
            )}
          </Link>

          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1 rounded bg-muted/20 border border-border/30 hover:border-primary/40 text-muted-foreground/60 hover:text-foreground cursor-pointer transition-colors"
            title={isSidebarCollapsed ? "Expandir Sidebar" : "Colapsar Sidebar"}
          >
            <ArrowLeftRight size={13} />
          </button>
        </div>

        {/* Search trigger widget inside sidebar */}
        <div className="p-3">
          <button
            onClick={triggerSearch}
            className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg border border-border/60 bg-background/30 hover:bg-background/80 hover:border-primary/35 text-left text-xs font-mono text-muted-foreground/60 transition-all cursor-pointer ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <Search size={14} className="text-muted-foreground/80 flex-shrink-0" />
            {!isSidebarCollapsed && (
              <>
                <span className="flex-1 truncate">Buscar (Ctrl+K)...</span>
                <kbd className="bg-card border border-border/80 px-1 py-0.2 rounded text-[8px] opacity-70">Ctrl+K</kbd>
              </>
            )}
          </button>
        </div>

        {/* Sidebar Links Menu */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1 scrollbar-thin">
          {sidebarLinks.map(({ href, label, icon: Icon, color }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center rounded-lg border transition-all duration-200 group relative ${
                  isSidebarCollapsed ? 'justify-center p-2.5' : 'p-2.5 px-3'
                } ${
                  isActive
                    ? 'border-primary/35 bg-primary/8 text-white'
                    : 'border-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                }`}
                title={label}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r bg-primary" />
                )}
                <Icon size={16} className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${isActive ? color : 'opacity-75'}`} />
                {!isSidebarCollapsed && (
                  <span className="text-xs font-semibold ml-3 truncate animate-fade-in">{label}</span>
                )}
              </Link>
            )
          })}

          {/* Sub-menu of Units in Sidebar (only shown when expanded) */}
          {!isSidebarCollapsed && (
            <div className="pt-4 mt-4 border-t border-border/40 space-y-1.5 pl-2">
              <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest pl-1 block">Unidades UNI</span>
              <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                {localUnits.map(unit => {
                  const unitUrl = `/unidades/${unit.id}`
                  const isActive = pathname === unitUrl
                  return (
                    <Link
                      key={unit.id}
                      href={unitUrl}
                      className={`block text-[10px] py-1.5 px-2 rounded hover:bg-muted/30 truncate transition-colors font-semibold ${
                        isActive ? 'text-primary font-bold bg-primary/5' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      U0{unit.order_number}: {unit.title.split(':')[0]}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-border/40 text-[9px] font-mono text-muted-foreground/40 text-center flex flex-col items-center justify-center gap-1">
          {!isSidebarCollapsed ? (
            <>
              <div className="flex items-center gap-1 select-none">
                <Cpu size={10} className="text-primary/50" />
                <span>UNI AMC1 v2.1</span>
              </div>
              <span>RUSB · Managua, Nic</span>
            </>
          ) : (
            <Cpu size={12} className="text-primary/30" />
          )}
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0 z-10 relative overflow-hidden">
        {/* Top Control Header Bar (Desktop only, mobile will render Header directly in page) */}
        <header className="hidden lg:flex items-center justify-between border-b border-border/40 bg-background/50 backdrop-blur-md px-6 h-16 flex-shrink-0 select-none">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.href}>
                {idx > 0 && <ChevronRight size={10} className="opacity-40" />}
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-foreground font-bold truncate max-w-[200px]">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.label === 'Inicio' ? <Home size={12} className="inline mr-0.5" /> : null}
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Quick status bar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/40 bg-card/35 text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              CONECTADO
            </div>
          </div>
        </header>

        {/* Inner page scroll wrapper */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
