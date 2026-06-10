'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, BookOpen, Brain, Download, HelpCircle, Terminal, CircuitBoard, X, CornerDownLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { localUnits, localLessons } from '@/lib/data/units'
import { localQuizzes } from '@/lib/data/quizzes'
import { localGuides } from '@/lib/data/guides'
import { localGlossary } from '@/lib/data/glossary'

interface SearchResult {
  id: string
  title: string
  subtitle: string
  url: string
  category: 'unidad' | 'leccion' | 'quiz' | 'descarga' | 'glosario' | 'simulador'
  icon: React.ComponentType<any>
  meta?: string
}

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Open/Close Dialog via Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Handle clicking outside the dialog to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const q = query.toLowerCase()
    const matchResults: SearchResult[] = []

    // 1. Search Simulators
    const simulators = [
      { id: 'sim-emu8086', title: 'Simulador CPU Intel 8086', subtitle: 'Escribe y emula código Assembly x86', url: '/tutorial-emu8086', category: 'simulador', icon: Terminal },
      { id: 'sim-arduino', title: 'Laboratorio de Circuitos Arduino', subtitle: 'Simulador de circuitos visual y drag-and-drop', url: '/tutorial-arduino', category: 'simulador', icon: CircuitBoard }
    ]
    simulators.forEach(sim => {
      if (sim.title.toLowerCase().includes(q) || sim.subtitle.toLowerCase().includes(q)) {
        matchResults.push(sim as SearchResult)
      }
    })

    // 2. Search Units
    localUnits.forEach(unit => {
      if (unit.title.toLowerCase().includes(q) || (unit.description && unit.description.toLowerCase().includes(q))) {
        matchResults.push({
          id: unit.id,
          title: `Unidad ${unit.order_number}: ${unit.title}`,
          subtitle: unit.description || 'Contenido curricular',
          url: `/unidades/${unit.id}`,
          category: 'unidad',
          icon: BookOpen
        })
      }
    })

    // 3. Search Lessons
    localLessons.forEach(lesson => {
      if (lesson.title.toLowerCase().includes(q) || (lesson.content && lesson.content.toLowerCase().includes(q))) {
        const unit = localUnits.find(u => u.id === lesson.unit_id)
        matchResults.push({
          id: lesson.id,
          title: lesson.title,
          subtitle: `Lección en ${unit ? unit.title.substring(0, 30) + '...' : 'Unidad'}`,
          url: `/unidades/${lesson.unit_id}?lesson=${lesson.id}`,
          category: 'leccion',
          icon: BookOpen
        })
      }
    })

    // 4. Search Quizzes
    localQuizzes.forEach(quiz => {
      if (quiz.title.toLowerCase().includes(q) || (quiz.description && quiz.description.toLowerCase().includes(q))) {
        matchResults.push({
          id: quiz.id,
          title: quiz.title,
          subtitle: quiz.description || 'Evaluación de autoevaluación',
          url: `/quiz/${quiz.id}`,
          category: 'quiz',
          icon: Brain
        })
      }
    })

    // 5. Search Guides (Descargas)
    localGuides.forEach(guide => {
      if (guide.title.toLowerCase().includes(q)) {
        matchResults.push({
          id: guide.id,
          title: guide.title,
          subtitle: `Guía de laboratorio (${guide.file_type?.toUpperCase() || 'DOCX'})`,
          url: '/descargas',
          category: 'descarga',
          icon: Download,
          meta: 'Descargar'
        })
      }
    })

    // 6. Search Glossary
    localGlossary.forEach(item => {
      if (item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q)) {
        matchResults.push({
          id: `glossary-${item.term}`,
          title: item.term,
          subtitle: item.definition,
          url: `/glosario?term=${encodeURIComponent(item.term)}`,
          category: 'glosario',
          icon: HelpCircle,
          meta: item.category
        })
      }
    })

    setResults(matchResults.slice(0, 8)) // Limit results to top 8
    setSelectedIndex(0)
  }, [query])

  // Handle keyboard navigation inside the list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex].url)
      }
    }
  }

  const handleSelect = (url: string) => {
    setIsOpen(false)
    router.push(url)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Dialog container */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-2xl rounded-2xl border border-border/80 bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden glass-panel flex flex-col max-h-[50vh] transition-all duration-300 transform scale-100"
        onKeyDown={handleKeyDown}
      >
        {/* Input area */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40 bg-background/50">
          <Search className="text-muted-foreground w-5 h-5 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar unidades, lecciones, quizzes, simuladores o conceptos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 border-0 outline-none focus:ring-0 py-1"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-muted rounded text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results area */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 select-none">
          {query === '' ? (
            <div className="py-12 text-center text-xs text-muted-foreground/80 space-y-2">
              <Search className="mx-auto opacity-30 w-8 h-8 mb-2" />
              <p className="font-medium text-sm text-white/90">Buscador Inteligente Global</p>
              <p className="max-w-[320px] mx-auto leading-relaxed">
                Escribe términos técnicos como <code className="text-primary font-mono bg-primary/10 px-1 py-0.5 rounded">ALU</code>, <code className="text-primary font-mono bg-primary/10 px-1 py-0.5 rounded">Arduino</code>, o <code className="text-primary font-mono bg-primary/10 px-1 py-0.5 rounded">Actividad 6</code>.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground space-y-1">
              <p>No se encontraron resultados para &ldquo;<span className="text-white font-semibold">{query}</span>&rdquo;</p>
              <p>Intenta con términos académicos o siglas de registros.</p>
            </div>
          ) : (
            results.map((result, idx) => {
              const Icon = result.icon
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={result.id}
                  onClick={() => handleSelect(result.url)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl border text-left cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'border-primary/45 bg-primary/8 text-white'
                      : 'border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 border ${
                      isSelected ? 'bg-primary/20 border-primary/20 text-primary' : 'bg-muted/40 border-border/40 text-muted-foreground'
                    }`}>
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white/90 truncate">{result.title}</div>
                      <div className="text-[10px] text-muted-foreground/70 truncate leading-normal mt-0.5">{result.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                    {result.meta && (
                      <span className="text-[9px] font-mono bg-muted/40 border border-border/60 px-2 py-0.5 rounded text-muted-foreground uppercase">
                        {result.meta}
                      </span>
                    )}
                    <span className="text-[9px] font-mono bg-primary/15 border border-primary/15 px-2 py-0.5 rounded text-primary uppercase">
                      {result.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft size={12} className="text-muted-foreground opacity-60 ml-1" />
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-border/40 flex items-center justify-between text-[9px] font-mono text-muted-foreground/60 bg-muted/20 select-none">
          <div className="flex items-center gap-3">
            <span><kbd className="bg-card border border-border px-1 py-0.5 rounded shadow-sm">↑↓</kbd> Navegar</span>
            <span><kbd className="bg-card border border-border px-1 py-0.5 rounded shadow-sm">Enter</kbd> Seleccionar</span>
          </div>
          <span>Esc para cerrar</span>
        </div>
      </div>
    </div>
  )
}
