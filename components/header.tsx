'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">
            AM
          </div>
          <span className="hidden font-bold text-lg sm:inline-block">Arquitectura de Máquinas</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/unidades" className="text-sm font-medium transition-colors hover:text-primary">
            Unidades
          </Link>
          <Link href="/tutorial-emu8086" className="text-sm font-medium transition-colors hover:text-primary">
            Tutorial EMU8086
          </Link>
          <Link href="/descargas" className="text-sm font-medium transition-colors hover:text-primary">
            Descargas
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden border-t border-border bg-card">
          <div className="flex flex-col gap-4 px-4 py-4">
            <Link
              href="/unidades"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Unidades
            </Link>
            <Link
              href="/tutorial-emu8086"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Tutorial EMU8086
            </Link>
            <Link
              href="/descargas"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Descargas
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
