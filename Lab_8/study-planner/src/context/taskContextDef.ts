import { createContext } from 'react'
import type { Task, FilterStatus, ToastMessage } from '../types/task'

export interface TaskContextType {
  tasks: Task[]
  filter: FilterStatus
  setFilter: (filter: FilterStatus) => void
  editingTask: Task | null
  setEditingTask: (task: Task | null) => void
  toast: ToastMessage | null
  dismissToast: () => void
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void
  updateTask: (task: Omit<Task, 'completed' | 'isDeleting'>) => void
  toggleTask: (id: number) => void
  requestDelete: (id: number) => void
  undoDelete: () => void
  clearCompleted: () => void
  resetTasks: () => void
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined)