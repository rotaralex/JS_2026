export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  priority: Priority
  category: string
  isDeleting?: boolean
}

export type FilterStatus = 'all' | 'completed' | 'pending'

export interface ToastMessage {
  id: number
  text: string
  type: 'success' | 'info' | 'warning'
  isUndoable?: boolean
  duration?: number
}