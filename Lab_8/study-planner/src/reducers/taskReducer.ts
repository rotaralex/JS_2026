import type { Task } from '../types/task'
import { initialTasks } from '../data/initialTasks'

export type TaskAction =
  | { type: 'ADD'; payload: Omit<Task, 'id' | 'completed'> }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'UPDATE'; payload: Omit<Task, 'completed' | 'isDeleting'> }
  | { type: 'REQUEST_DELETE'; payload: number }
  | { type: 'CONFIRM_DELETE'; payload: number }
  | { type: 'UNDO_DELETE'; payload: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'RESET' }

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD': {
      const newTask: Task = {
        ...action.payload,
        id: Date.now(),
        completed: false,
      }
      return [newTask, ...state]
    }

    case 'TOGGLE':
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      )

    case 'UPDATE':
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      )

    case 'REQUEST_DELETE':
      return state.map((task) =>
        task.id === action.payload ? { ...task, isDeleting: true } : task
      )

    case 'CONFIRM_DELETE':
      return state.filter((task) => task.id !== action.payload)

    case 'UNDO_DELETE':
      return state.map((task) =>
        task.id === action.payload ? { ...task, isDeleting: false } : task
      )

    case 'CLEAR_COMPLETED':
      return state.filter((task) => !task.completed)

    case 'RESET':
      return initialTasks

    default:
      return state
  }
}