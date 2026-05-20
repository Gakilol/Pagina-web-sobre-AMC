export interface Unit {
  id: string
  title: string
  description: string | null
  order_number: number
  created_at: string
}

export interface Lesson {
  id: string
  unit_id: string
  title: string
  content: string | null
  order_number: number
  created_at: string
}

export interface Quiz {
  id: string
  unit_id: string
  title: string
  description: string | null
  created_at: string
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  question_text: string
  correct_option_id: string | null
  explanation: string | null
  order_number: number
  created_at: string
}

export interface QuizOption {
  id: string
  question_id: string
  option_text: string
  order_number: number
  created_at: string
}

export interface Guide {
  id: string
  unit_id: string | null
  title: string
  file_url: string
  file_type: string | null
  created_at: string
}

export interface EMU8086Tutorial {
  id: string
  title: string
  description: string | null
  content: string | null
  order_number: number
  created_at: string
}
