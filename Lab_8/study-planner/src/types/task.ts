export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  priority: Priority
  category: string
}

// Типи для DummyJSON API
export interface ApiTodo {
  id: number
  todo: string
  completed: boolean
  userId: number
}

export interface TodosResponse {
  todos: ApiTodo[]
  total: number
  skip: number
  limit: number
}

export type FilterStatus = 'all' | 'completed' | 'pending'

export interface ToastMessage {
  id: number
  text: string
  type: 'success' | 'info' | 'warning' | 'error'
  duration?: number
}