'use client'

import { useState } from 'react'
import { BookOpen, ChevronRight, Terminal, Award, HelpCircle } from 'lucide-react'
import type { Lesson } from '@/lib/types'

interface LessonsTabsProps {
  lessons: Lesson[]
}

export function LessonsTabs({ lessons }: LessonsTabsProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (lessons.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card/40 p-8 text-center glass-panel">
        <BookOpen className="mx-auto text-muted-foreground mb-4 opacity-50" size={40} />
        <h3 className="text-lg font-bold mb-1">No hay lecciones disponibles</h3>
        <p className="text-sm text-muted-foreground">Esta unidad no cuenta con lecciones cargadas todavía.</p>
      </div>
    )
  }

  const activeLesson = lessons[activeIdx]

  // A very lightweight parser to convert basic markdown bold, bullet points, and code blocks to nice styled JSX
  const formatContent = (text: string | null) => {
    if (!text) return null

    return text.split('\n\n').map((paragraph, pIdx) => {
      // 1. Code block detection (starts and ends with ``` or custom code indicators)
      if (paragraph.startsWith('```') || paragraph.includes('```')) {
        const cleanCode = paragraph.replace(/```[a-z]*/g, '').trim()
        return (
          <div key={pIdx} className="my-6 border border-primary/20 bg-black/60 rounded-xl overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between bg-primary/5 px-4 py-2 border-b border-primary/10 text-muted-foreground text-[10px] uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-primary">
                <Terminal size={12} />
                Segmento de Código / Visualización
              </span>
              <span>8086 Assembly</span>
            </div>
            <pre className="p-4 overflow-x-auto text-zinc-100 leading-relaxed select-text">
              <code>{cleanCode}</code>
            </pre>
          </div>
        )
      }

      // 2. Headings and list detection
      const lines = paragraph.split('\n')
      
      // If it looks like a list
      if (lines.every(line => line.trim().startsWith('-') || line.trim().startsWith('*'))) {
        return (
          <ul key={pIdx} className="list-none space-y-2.5 my-4 pl-4 font-sans text-sm sm:text-base">
            {lines.map((line, lIdx) => {
              const cleanLine = line.replace(/^[\s-*]+/, '').trim()
              return (
                <li key={lIdx} className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span dangerouslySetInnerHTML={{ __html: parseMarkdownInline(cleanLine) }}></span>
                </li>
              )
            })}
          </ul>
        )
      }

      // Default paragraph
      return (
        <p
          key={pIdx}
          className="text-muted-foreground leading-relaxed text-sm sm:text-base font-sans my-3"
          dangerouslySetInnerHTML={{ __html: parseMarkdownInline(paragraph) }}
        ></p>
      )
    })
  }

  // Parses bold **text** and inline `code`
  const parseMarkdownInline = (text: string): string => {
    return text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      // Inline code
      .replace(/`(.*?)`/g, '<code class="bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded font-mono text-xs text-primary font-semibold">$1</code>')
      // Segment formulas (like $$math$$)
      .replace(/\$\$(.*?)\$\$/g, '<code class="bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded font-mono text-xs text-blue-400 block my-2 w-max">$1</code>')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start">
      {/* Left Sidebar Tabs - Lessons List */}
      <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24 max-h-[calc(100vh-140px)] overflow-y-auto pr-1">
        <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3 pl-1">
          Índice de Lecciones
        </h3>
        <div className="space-y-2">
          {lessons.map((lesson, idx) => {
            const isActive = idx === activeIdx
            return (
              <button
                key={lesson.id}
                onClick={() => setActiveIdx(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 group relative overflow-hidden ${
                  isActive
                    ? 'border-primary bg-primary/5 text-white glow-primary'
                    : 'border-border/60 hover:border-primary/40 bg-card/25 text-muted-foreground hover:text-foreground'
                }`}
              >
                {/* Active glow pointer */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary"></div>
                )}
                
                <div className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-mono font-bold flex-shrink-0 border ${
                  isActive 
                    ? 'bg-primary/20 border-primary text-primary' 
                    : 'bg-background border-border text-muted-foreground group-hover:border-primary/20 group-hover:text-primary transition-colors'
                }`}>
                  {idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm leading-snug line-clamp-2">{lesson.title}</div>
                  <div className="text-[10px] font-mono opacity-60 mt-1 uppercase">Lección 0{lesson.order_number}</div>
                </div>
                
                <ChevronRight 
                  size={16} 
                  className={`mt-1 flex-shrink-0 transition-transform ${
                    isActive 
                      ? 'text-primary translate-x-0.5' 
                      : 'text-muted-foreground group-hover:text-foreground opacity-50 group-hover:opacity-100'
                  }`} 
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Right Content Panel - Active Lesson */}
      <div className="lg:col-span-8">
        {activeLesson && (
          <div className="rounded-xl border border-border/60 bg-card/30 p-8 glass-panel relative overflow-hidden min-h-[400px]">
            {/* Tech decorative markings */}
            <div className="absolute top-2 left-4 font-mono text-[9px] text-muted-foreground/30 uppercase select-none">
              SYS_READER_MODULE // LECCIÓN {activeLesson.order_number}
            </div>
            <div className="absolute top-2 right-4 font-mono text-[9px] text-primary/30 uppercase select-none animate-pulse">
              READING_ONLINE
            </div>

            {/* Lesson Title and details */}
            <div className="mb-6 pb-6 border-b border-border/40 mt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
                <BookOpen size={14} />
                <span>Lección {activeLesson.order_number} de {lessons.length}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeLesson.title}
              </h2>
            </div>

            {/* Rendered styled text */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {formatContent(activeLesson.content)}
            </div>

            {/* Finish indicator */}
            <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Award size={14} className="text-emerald-400" />
                <span>Lección leída completamente</span>
              </span>
              
              {activeIdx < lessons.length - 1 ? (
                <button
                  onClick={() => setActiveIdx(prev => prev + 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors font-bold uppercase tracking-wider cursor-pointer"
                >
                  Siguiente Lección
                  <ChevronRight size={14} />
                </button>
              ) : (
                <div className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span>¡Has terminado la unidad!</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
