import { createClient } from './supabase/server'
import type { Unit, Quiz, Guide, EMU8086Tutorial, Lesson } from './types'
import { localUnits, localLessons } from './data/units'
import { localQuizzes, localQuestions } from './data/quizzes'
import { localGuides } from './data/guides'
import { localTutorials } from './data/tutorials'

// Helper to check if Supabase env parameters are active
function hasSupabaseConfig() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// Units
export async function getUnits() {
  if (!hasSupabaseConfig()) return localUnits

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .order('order_number')
    if (error) throw error
    return data as Unit[]
  } catch (err) {
    console.warn('Supabase getUnits failed, falling back to local data:', err)
    return localUnits
  }
}

export async function getUnitById(id: string) {
  if (!hasSupabaseConfig()) {
    const unit = localUnits.find(u => u.id === id)
    if (!unit) throw new Error('Unit not found in local data')
    return unit
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data as Unit
  } catch (err) {
    console.warn(`Supabase getUnitById(${id}) failed, falling back to local data:`, err)
    const unit = localUnits.find(u => u.id === id)
    if (!unit) throw new Error('Unit not found in local data')
    return unit
  }
}

// Lessons
export async function getLessonsByUnitId(unitId: string) {
  if (!hasSupabaseConfig()) {
    return localLessons.filter(l => l.unit_id === unitId).sort((a, b) => a.order_number - b.order_number)
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('unit_id', unitId)
      .order('order_number')
    if (error) throw error
    return data as Lesson[]
  } catch (err) {
    console.warn(`Supabase getLessonsByUnitId(${unitId}) failed, falling back to local data:`, err)
    return localLessons.filter(l => l.unit_id === unitId).sort((a, b) => a.order_number - b.order_number)
  }
}

// Quizzes
export async function getQuizzesByUnitId(unitId: string) {
  if (!hasSupabaseConfig()) {
    return localQuizzes.filter(q => q.unit_id === unitId)
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('unit_id', unitId)
    if (error) throw error
    return data as Quiz[]
  } catch (err) {
    console.warn(`Supabase getQuizzesByUnitId(${unitId}) failed, falling back to local data:`, err)
    return localQuizzes.filter(q => q.unit_id === unitId)
  }
}

export async function getQuizWithQuestions(quizId: string) {
  if (!hasSupabaseConfig()) {
    const quiz = localQuizzes.find(q => q.id === quizId)
    if (!quiz) throw new Error('Quiz not found in local data')
    const questions = localQuestions
      .filter(q => q.quiz_id === quizId)
      .sort((a, b) => a.order_number - b.order_number)
    return { quiz, questions }
  }

  try {
    const supabase = await createClient()
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .single()
    
    if (quizError) throw quizError

    const { data: questions, error: questionsError } = await supabase
      .from('quiz_questions')
      .select(`
        *,
        quiz_options(*)
      `)
      .eq('quiz_id', quizId)
      .order('order_number')
    
    if (questionsError) throw questionsError

    return { quiz, questions }
  } catch (err) {
    console.warn(`Supabase getQuizWithQuestions(${quizId}) failed, falling back to local data:`, err)
    const quiz = localQuizzes.find(q => q.id === quizId)
    if (!quiz) throw new Error('Quiz not found in local data')
    const questions = localQuestions
      .filter(q => q.quiz_id === quizId)
      .sort((a, b) => a.order_number - b.order_number)
    return { quiz, questions }
  }
}

// Guides
export async function getAllGuides() {
  if (!hasSupabaseConfig()) return localGuides

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as Guide[]
  } catch (err) {
    console.warn('Supabase getAllGuides failed, falling back to local data:', err)
    return localGuides
  }
}

export async function getGuidesByUnitId(unitId: string) {
  if (!hasSupabaseConfig()) {
    return localGuides.filter(g => g.unit_id === unitId)
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .eq('unit_id', unitId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as Guide[]
  } catch (err) {
    console.warn(`Supabase getGuidesByUnitId(${unitId}) failed, falling back to local data:`, err)
    return localGuides.filter(g => g.unit_id === unitId)
  }
}

// EMU8086 Tutorials
export async function getEMU8086Tutorials() {
  if (!hasSupabaseConfig()) return localTutorials

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('emu8086_tutorials')
      .select('*')
      .order('order_number')
    if (error) throw error
    return data as EMU8086Tutorial[]
  } catch (err) {
    console.warn('Supabase getEMU8086Tutorials failed, falling back to local data:', err)
    return localTutorials
  }
}

export async function getEMU8086TutorialById(id: string) {
  if (!hasSupabaseConfig()) {
    const tutorial = localTutorials.find(t => t.id === id)
    if (!tutorial) throw new Error('Tutorial not found in local data')
    return tutorial
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('emu8086_tutorials')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data as EMU8086Tutorial
  } catch (err) {
    console.warn(`Supabase getEMU8086TutorialById(${id}) failed, falling back to local data:`, err)
    const tutorial = localTutorials.find(t => t.id === id)
    if (!tutorial) throw new Error('Tutorial not found in local data')
    return tutorial
  }
}

