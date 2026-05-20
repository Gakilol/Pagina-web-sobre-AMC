'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw, HelpCircle, ArrowRight, Brain, AlertCircle, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import type { Quiz, QuizQuestion, QuizOption } from '@/lib/types'

interface QuestionWithOptions extends QuizQuestion {
  quiz_options: QuizOption[]
}

interface QuizClientProps {
  quiz: Quiz
  questions: QuestionWithOptions[]
}

export function QuizClient({ quiz, questions }: QuizClientProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: string }>({})
  const [revealedQuestions, setRevealedQuestions] = useState<{ [questionId: string]: boolean }>({})
  const [completed, setCompleted] = useState(false)

  if (questions.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card/25 p-8 text-center glass-panel">
        <AlertCircle className="mx-auto text-amber-500 mb-4 animate-pulse" size={40} />
        <h3 className="text-lg font-bold mb-1 text-white">Cuestionario vacío</h3>
        <p className="text-sm text-muted-foreground">Esta evaluación no cuenta con preguntas vinculadas actualmente.</p>
        <Link
          href="/unidades"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-bold text-primary-foreground hover:opacity-90 mt-6 transition-all text-xs uppercase tracking-wider font-mono cursor-pointer"
        >
          Volver a Unidades
        </Link>
      </div>
    )
  }

  const currentQuestion = questions[currentIdx]
  const selectedOptionId = selectedAnswers[currentQuestion?.id]
  const isAnswered = selectedOptionId !== undefined
  const isRevealed = revealedQuestions[currentQuestion?.id] === true
  
  const handleSelectOption = (optionId: string) => {
    if (!isRevealed) {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: optionId
      }))
    }
  }

  const handleReveal = () => {
    if (isAnswered) {
      setRevealedQuestions(prev => ({
        ...prev,
        [currentQuestion.id]: true
      }))
    }
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1)
    } else {
      setCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentIdx(0)
    setSelectedAnswers({})
    setRevealedQuestions({})
    setCompleted(false)
  }

  // Calculate correct responses
  const correctCount = Object.entries(selectedAnswers).filter(([qId, optId]) => {
    const question = questions.find(q => q.id === qId)
    return question && question.correct_option_id === optId
  }).length

  const percentage = Math.round((correctCount / questions.length) * 100)

  // Feedback strings based on percentage
  const getFeedbackMessage = (pct: number) => {
    if (pct === 100) return { title: '¡Excelente, Ingeniero!', text: 'Has respondido todas las preguntas a la perfección. Tu comprensión de este hardware y sus operaciones es absoluta.', color: 'text-emerald-400' }
    if (pct >= 80) return { title: '¡Sobresaliente!', text: 'Has demostrado un gran dominio conceptual de la arquitectura de máquinas. ¡Sigue así!', color: 'text-cyan-400' }
    if (pct >= 60) return { title: 'Buen Intento', text: 'Tienes los fundamentos claros, pero te sugerimos repasar algunas lecciones teóricas para pulir detalles técnicos.', color: 'text-amber-400' }
    return { title: 'Sigue Repasando', text: 'El hardware de bajo nivel es riguroso. Te recomendamos leer las guías de estudio descargables y volver a intentarlo.', color: 'text-rose-400' }
  }

  const feedback = getFeedbackMessage(percentage)

  return (
    <div className="space-y-8">
      {completed ? (
        /* ================= RESULTS SCREEN ================= */
        <div className="rounded-xl border border-border/60 bg-card/20 p-8 sm:p-12 glass-panel text-center relative overflow-hidden">
          {/* Cyber accents */}
          <div className="absolute top-2 left-4 font-mono text-[9px] text-muted-foreground/30 select-none">
            SYS_QUIZ_FINAL_REP // V1.0.0
          </div>
          
          <div className="space-y-6 max-w-xl mx-auto mt-4">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
              <Brain size={32} />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-none">
              ¡Evaluación Completada!
            </h1>
            
            <p className="text-muted-foreground text-sm font-sans leading-relaxed">
              Has respondido las preguntas sobre la unidad oficial. Aquí tienes tus métricas de rendimiento conceptual.
            </p>

            {/* Glowing circular score display */}
            <div className="relative py-4 flex items-center justify-center">
              <div className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center bg-background/80 shadow-2xl relative ${
                percentage >= 80 
                  ? 'border-emerald-500/50 shadow-emerald-500/10' 
                  : percentage >= 60 
                    ? 'border-amber-500/50 shadow-amber-500/10' 
                    : 'border-rose-500/50 shadow-rose-500/10'
              }`}>
                <span className={`text-4xl font-extrabold font-mono ${feedback.color}`}>{percentage}%</span>
                <span className="text-[10px] font-mono text-muted-foreground/80 mt-1 uppercase">Aprobación</span>
              </div>
            </div>

            {/* Score detail text */}
            <div className="space-y-2">
              <h3 className={`text-xl font-bold ${feedback.color}`}>{feedback.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feedback.text}</p>
              <div className="font-mono text-xs text-muted-foreground/70 pt-2">
                Respondiste correctamente <strong className="text-white">{correctCount}</strong> de <strong className="text-white">{questions.length}</strong> preguntas formuladas.
              </div>
            </div>

            {/* Button Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                onClick={handleRestart}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-95 transition-all text-sm cursor-pointer"
              >
                <RotateCcw size={16} />
                Repetir Evaluación
              </button>
              <Link
                href="/unidades"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/80 hover:border-primary px-6 py-3 font-semibold text-muted-foreground hover:text-primary transition-all text-sm"
              >
                Volver a Unidades
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* ================= ACTIVE QUESTIONS SCREEN ================= */
        <div className="space-y-6">
          {/* Header Progress Dashboard */}
          <div className="rounded-xl border border-border/60 bg-card/25 p-6 glass-panel relative overflow-hidden">
            <div className="absolute top-2 left-4 font-mono text-[9px] text-muted-foreground/30 select-none">
              SYS_EVAL_PROGRESS_METER
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4 mt-2">
              <div>
                <span className="text-xs font-mono text-primary uppercase tracking-wider block">Evaluación Curricular</span>
                <h2 className="text-lg font-bold text-white line-clamp-1">{quiz.title}</h2>
              </div>
              
              <div className="font-mono text-xs text-right bg-background/50 border border-border/60 px-3 py-1.5 rounded-lg flex-shrink-0">
                Pregunta <strong className="text-primary">{currentIdx + 1}</strong> de {questions.length}
              </div>
            </div>

            {/* Glowing progress line */}
            <div className="w-full h-1.5 bg-background border border-border/40 rounded-full mt-5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-300 relative"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              >
                {/* Visual pulse glow pointer */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white glow-cyan"></div>
              </div>
            </div>
          </div>

          {/* Active Question Box */}
          <div className="rounded-xl border border-border/60 bg-card/30 p-8 glass-panel relative overflow-hidden">
            <div className="absolute top-2 left-4 font-mono text-[9px] text-muted-foreground/30 select-none">
              SYS_QUESTION_ID: 0{currentIdx + 1}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed mt-2 mb-8">
              {currentQuestion.question_text}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-3.5">
              {currentQuestion.quiz_options.map((option, oIdx) => {
                const isSelected = selectedOptionId === option.id
                const isCorrect = option.id === currentQuestion.correct_option_id
                
                let buttonStyle = 'border-border/60 bg-background/20 hover:border-primary/40 text-muted-foreground hover:text-foreground'
                let indicatorStyle = 'border-border'
                let indicatorChild = null

                if (isRevealed) {
                  if (isCorrect) {
                    buttonStyle = 'border-emerald-500/50 bg-emerald-500/5 text-white glow-emerald'
                    indicatorStyle = 'border-emerald-500 bg-emerald-500 text-white'
                    indicatorChild = <CheckCircle2 size={12} className="text-white" />
                  } else if (isSelected) {
                    buttonStyle = 'border-rose-500/50 bg-rose-500/5 text-white glow-rose'
                    indicatorStyle = 'border-rose-500 bg-rose-500 text-white'
                    indicatorChild = <XCircle size={12} className="text-white" />
                  } else {
                    buttonStyle = 'border-border/30 bg-background/10 text-muted-foreground/40 cursor-not-allowed opacity-50'
                    indicatorStyle = 'border-border/30'
                  }
                } else if (isSelected) {
                  buttonStyle = 'border-primary bg-primary/5 text-white glow-primary'
                  indicatorStyle = 'border-primary bg-primary text-white'
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isRevealed}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-3.5 group ${buttonStyle} ${
                      isRevealed ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    {/* Circle Indicator */}
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${indicatorStyle}`}>
                      {indicatorChild || (
                        <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-white' : 'text-muted-foreground/60 group-hover:text-foreground transition-colors'}`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                      )}
                    </div>
                    
                    <span className="text-sm sm:text-base font-sans font-medium leading-snug">{option.option_text}</span>
                  </button>
                )
              })}
            </div>

            {/* Explanation Section */}
            {isRevealed && currentQuestion.explanation && (
              <div className="mt-8 p-5 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs text-blue-300 leading-relaxed font-sans flex items-start gap-3 animate-fade-in">
                <HelpCircle size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <strong className="text-white font-mono text-[10px] uppercase block tracking-wider">Justificación Técnica:</strong>
                  <p>{currentQuestion.explanation}</p>
                </div>
              </div>
            )}

            {/* Bottom Actions Row */}
            <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] text-muted-foreground/60">
                {isRevealed ? 'REVELADO' : isAnswered ? 'LISTO' : 'SELECCIONAR RESPUESTA'}
              </span>

              <div className="flex gap-3">
                {!isRevealed ? (
                  <button
                    onClick={handleReveal}
                    disabled={!isAnswered}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary/10 border border-primary/20 text-primary px-5 py-2.5 text-xs font-bold font-mono tracking-wider uppercase hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Ver Respuesta
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold font-mono tracking-wider uppercase text-primary-foreground hover:opacity-90 transition-all cursor-pointer"
                  >
                    {currentIdx === questions.length - 1 ? 'Terminar Evaluación' : 'Siguiente Pregunta'}
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
