'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { HelpCircle, Search, BookOpen, Cpu, Zap, Activity, ChevronRight } from 'lucide-react'
import { localGlossary, GlossaryTerm } from '@/lib/data/glossary'
import Link from 'next/link'

function GlossaryContent() {
  const searchParams = useSearchParams()
  const termParam = searchParams.get('term')

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [highlightedTerm, setHighlightedTerm] = useState<string | null>(null)

  // Sync term query parameter with highlighting
  useEffect(() => {
    if (termParam) {
      setHighlightedTerm(termParam)
      // Scroll to element after a slight delay
      const cleanTerm = termParam.replace(/\s+/g, '-').toLowerCase()
      setTimeout(() => {
        const el = document.getElementById(`term-${cleanTerm}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 300)
    }
  }, [termParam])

  // Clear query criteria
  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedLetter(null)
    setSelectedCategory(null)
    setHighlightedTerm(null)
  }

  // Categories list
  const categories = Array.from(new Set(localGlossary.map(item => item.category)))
  
  // A-Z Letters present in the glossary
  const alphabet = Array.from(new Set(localGlossary.map(item => item.term[0].toUpperCase()))).sort()

  // Filtering
  const filteredTerms = localGlossary.filter(item => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchesTerm = item.term.toLowerCase().includes(q)
      const matchesDef = item.definition.toLowerCase().includes(q)
      if (!matchesTerm && !matchesDef) return false
    }

    // 2. Letter Filter
    if (selectedLetter && item.term[0].toUpperCase() !== selectedLetter) {
      return false
    }

    // 3. Category Filter
    if (selectedCategory && item.category !== selectedCategory) {
      return false
    }

    return true
  }).sort((a, b) => a.term.localeCompare(b.term))

  return (
    <div className="grid gap-8 lg:grid-cols-4 items-start">
      {/* Left Sidebar Filters */}
      <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
        {/* Search Input widget */}
        <div className="rounded-xl border border-border/60 bg-card/25 p-4.5 glass-panel">
          <label className="block text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2 pl-0.5">
            Buscar Concepto
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Ej: CPU, Segmento, ADC..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setHighlightedTerm(null) // clear highlighted term on search
              }}
              className="w-full bg-background/50 border border-border/80 rounded-lg pl-9 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
            />
          </div>
        </div>

        {/* Alphabet Navigation index */}
        <div className="rounded-xl border border-border/60 bg-card/25 p-4.5 glass-panel">
          <h3 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3.5 pl-0.5">
            Índice Alfabético
          </h3>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg border text-[10px] font-mono font-bold transition-all cursor-pointer ${
                selectedLetter === null
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border/60 hover:border-primary/20 bg-background/30 text-muted-foreground hover:text-foreground'
              }`}
            >
              ALL
            </button>
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => {
                  setSelectedLetter(letter)
                  setHighlightedTerm(null)
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  selectedLetter === letter
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/60 hover:border-primary/20 bg-background/30 text-muted-foreground hover:text-foreground'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Categories panel */}
        <div className="rounded-xl border border-border/60 bg-card/25 p-4.5 glass-panel">
          <h3 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3.5 pl-0.5">
            Categorías
          </h3>
          <div className="space-y-1.5">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === null
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border/60 hover:border-primary/20 bg-background/20 text-muted-foreground hover:text-foreground'
              }`}
            >
              Todas las Categorías
            </button>
            {categories.map(cat => {
              const count = localGlossary.filter(item => item.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat)
                    setHighlightedTerm(null)
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                    selectedCategory === cat
                      ? 'border-primary bg-primary/5 text-primary font-bold'
                      : 'border-border/60 hover:border-primary/20 bg-background/20 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="text-xs">{cat}</span>
                  <span className="text-[9px] font-mono opacity-60 bg-muted/40 px-1.5 py-0.5 rounded">{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right Content Glossary List */}
      <div className="lg:col-span-3 space-y-6">
        {/* List Header */}
        <div className="border-b border-border/40 pb-4 flex items-center justify-between flex-wrap gap-4 select-none">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Cpu className="text-primary" size={22} />
              Glosario de Arquitectura y Hardware
            </h2>
            <p className="text-xs text-muted-foreground font-mono mt-0.5 uppercase tracking-wide">
              {filteredTerms.length} conceptos técnicos listados
            </p>
          </div>

          {(searchQuery || selectedLetter || selectedCategory || highlightedTerm) && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-primary hover:underline font-mono cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Terms list */}
        {filteredTerms.length > 0 ? (
          <div className="space-y-4">
            {filteredTerms.map((item) => {
              const cleanId = item.term.replace(/\s+/g, '-').toLowerCase()
              const isHighlighted = highlightedTerm?.toLowerCase() === item.term.toLowerCase()

              return (
                <div
                  key={item.term}
                  id={`term-${cleanId}`}
                  className={`rounded-xl border p-6 transition-all duration-300 glass-panel scroll-mt-28 ${
                    isHighlighted
                      ? 'border-primary bg-primary/8 shadow-[0_0_25px_-5px_oklch(0.68_0.17_228_/0.18)]'
                      : 'border-border/60 hover:border-primary/25 hover:bg-card/40'
                  }`}
                >
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        {item.term}
                        {isHighlighted && (
                          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                        )}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono border border-primary/20 bg-primary/10 text-primary uppercase font-bold">
                        {item.category}
                      </span>
                    </div>
                    
                    <span className="font-mono text-2xl font-black text-muted-foreground/15 select-none uppercase">
                      {item.term[0]}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                    {item.definition}
                  </p>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border/60 bg-card/10 py-16 text-center glass-panel">
            <HelpCircle className="mx-auto text-muted-foreground mb-4 opacity-40" size={48} />
            <h3 className="text-lg font-bold text-white mb-1">Sin términos encontrados</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              No hemos localizado conceptos en el glosario que coincidan con tus filtros o términos de búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden pb-16">
      {/* Visual Tech Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <Header />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 z-10">
        {/* Breadcrumb / Top Info */}
        <div className="flex items-center gap-2 mb-8 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <ChevronRight size={12} className="opacity-40" />
          <span className="text-foreground font-semibold">Glosario Técnico</span>
        </div>

        {/* Section Header */}
        <div className="mb-14 border-b border-border/40 pb-8 relative">
          <div className="absolute bottom-0 left-0 w-32 h-[3px] bg-primary"></div>
          <div className="flex items-center gap-3 text-sm font-mono text-primary uppercase tracking-widest mb-3">
            <Activity size={18} />
            <span>Referencia del Lenguaje y Arquitectura</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary/80">
            Glosario Técnico de AMC 1
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl font-sans leading-relaxed">
            Consulte la definición y el contexto académico de los componentes de hardware, registros, modos de direccionamiento y conceptos claves de programación del microprocesador <strong className="text-white">Intel 8086</strong> y microcontroladores <strong className="text-white">Arduino Uno</strong>.
          </p>
        </div>

        {/* Glossary interactive client mounting wrapped in Suspense for client query parameters */}
        <Suspense fallback={
          <div className="py-24 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            <p className="text-xs text-muted-foreground mt-4">Cargando glosario...</p>
          </div>
        }>
          <GlossaryContent />
        </Suspense>
      </section>
    </main>
  )
}
