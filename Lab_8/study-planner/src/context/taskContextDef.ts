import { createContext } from 'react'
import type { Task, FilterStatus, ToastMessage } from '../types/task'

export interface TaskContextType {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  retryFetch: () => void
  page: number
  totalPages: number
  totalTasks: number
  setPage: (page: number) => void
  filter: FilterStatus
  setFilter: (filter: FilterStatus) => void
  editingTask: Task | null
  setEditingTask: (task: Task | null) => void
  selectedTaskId: number | null
  setSelectedTaskId: (id: number | null) => void
  taskToDelete: Task | null
  setTaskToDelete: (task: Task | null) => void
  toast: ToastMessage | null
  dismissToast: () => void
  addTask: (task: Omit<Task, 'id' | 'completed'>) => Promise<void>
  updateTask: (task: Omit<Task, 'completed'>) => Promise<void>
  toggleTask: (id: number) => Promise<void>
  confirmDeleteTask: () => Promise<void>
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined)