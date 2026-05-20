import { Header } from '@/components/header'
import Link from 'next/link'
import { ChevronRight, Home, ChevronLeft, AlertTriangle } from 'lucide-react'
import { getQuizWithQuestions } from '@/lib/db-service'
import { QuizClient } from '@/components/quiz-client'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function QuizPage({ params }: PageProps) {
  let quiz = null
  let questions: any[] = []
  let errorMsg = null

  try {
    const { id } = await params
    const data = await getQuizWithQuestions(id)
    if (data) {
      quiz = data.quiz
      questions = data.questions
    }
  } catch (err: any) {
    console.error('Error fetching quiz on server:', err)
    errorMsg = err.message || 'Error desconocido'
  }

  if (!quiz) {
    return (
      <main className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>
        <Header />
        <section className="mx-auto max-w-3xl px-4 py-24 text-center z-10 relative">
          <div className="p-8 rounded-xl border border-destructive/20 bg-destructive/5 glass-panel">
            <AlertTriangle className="mx-auto text-rose-500 mb-4 animate-pulse" size={40} />
            <h1 className="text-3xl font-extrabold text-white mb-4">Evaluación No Encontrada</h1>
            <p className="text-muted-foreground mb-8">
              No hemos podido localizar la evaluación o quiz interactivo seleccionado en la base de datos local del curso.
            </p>
            <Link
              href="/unidades"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-primary/95 transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
              Volver a Unidades
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden pb-16">
      {/* Visual Tech Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      <div className="absolute top-[20%] left-[-10%] w-[45%] h-[45%] bg-primary/5 rounded-full blur-[110px] pointer-events-none"></div>

      <Header />

      <section className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-8 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">
            <Home size={14} />
          </Link>
          <ChevronRight size={12} />
          <Link href="/unidades" className="hover:text-primary transition-colors">
            Unidades
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Evaluación</span>
        </div>

        {/* Master Quiz Client Mounting */}
        <QuizClient quiz={quiz} questions={questions} />
      </section>
    </main>
  )
}
