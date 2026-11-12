import { useReducer, useEffect, useState, type ReactNode } from 'react'
import type { Task, FilterStatus, ToastMessage } from '../types/task'
import { initialTasks } from '../data/initialTasks'
import { taskReducer } from '../reducers/taskReducer'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { TaskContext } from './taskContextDef'

const STORAGE_KEY = 'study_planner_tasks_v1'

function loadInitialTasks(): Task[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as Task[]
      return parsed.map((t) => ({ ...t, isDeleting: false }))
    }
  } catch (error) {
    console.error('Помилка читання завдань із localStorage:', error)
  }
  return initialTasks
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, undefined, loadInitialTasks)
  const [filter, setFilter] = useLocalStorage<FilterStatus>('study_planner_filter', 'all')
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)
  const [toast, setToast] = useState<ToastMessage | null>(null)

  useEffect(() => {
    try {
      const toSave = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        priority: task.priority,
        category: task.category,
      }))
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch (error) {
      console.error('Помилка збереження завдань у localStorage:', error)
    }
  }, [tasks])

  useEffect(() => {
    const activeCount = tasks.filter((t) => !t.completed && !t.isDeleting).length
    document.title =
      activeCount > 0
        ? `Study Planner — ${activeCount} active tasks`
        : 'Study Planner — All done!'
  }, [tasks])

  useEffect(() => {
    if (pendingDeleteId === null) return

    const timer = setTimeout(() => {
      dispatch({ type: 'CONFIRM_DELETE', payload: pendingDeleteId })
      setPendingDeleteId(null)
      setToast({
        id: Date.now(),
        text: 'Завдання остаточно видалено',
        type: 'info',
        duration: 3000,
      })
    }, 5000)

    return () => clearTimeout(timer)
  }, [pendingDeleteId])

  useEffect(() => {
    if (!toast || toast.isUndoable) return

    const timer = setTimeout(() => {
      setToast(null)
    }, toast.duration || 3000)

    return () => clearTimeout(timer)
  }, [toast])

  const showToast = (text: string, type: ToastMessage['type'] = 'success') => {
    setToast({ id: Date.now(), text, type, duration: 3000 })
  }

  const dismissToast = () => setToast(null)

  const addTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    dispatch({ type: 'ADD', payload: taskData })
    showToast('Завдання успішно додано!')
  }

  const updateTask = (taskData: Omit<Task, 'completed' | 'isDeleting'>) => {
    dispatch({ type: 'UPDATE', payload: taskData })
    setEditingTask(null)
    showToast('Завдання оновлено!')
  }

  const toggleTask = (id: number) => {
    dispatch({ type: 'TOGGLE', payload: id })
  }

  const requestDelete = (id: number) => {
    if (pendingDeleteId !== null && pendingDeleteId !== id) {
      dispatch({ type: 'CONFIRM_DELETE', payload: pendingDeleteId })
    }
    if (editingTask?.id === id) {
      setEditingTask(null)
    }
    dispatch({ type: 'REQUEST_DELETE', payload: id })
    setPendingDeleteId(id)
    setToast({
      id: Date.now(),
      text: 'Завдання буде видалено через 5 сек.',
      type: 'warning',
      isUndoable: true,
      duration: 5000,
    })
  }

  const undoDelete = () => {
    if (pendingDeleteId === null) return
    dispatch({ type: 'UNDO_DELETE', payload: pendingDeleteId })
    setPendingDeleteId(null)
    showToast('Видалення скасовано', 'info')
  }

  const clearCompleted = () => {
    const hasCompleted = tasks.some((t) => t.completed)
    if (!hasCompleted) {
      showToast('Немає виконаних завдань для очищення', 'info')
      return
    }
    dispatch({ type: 'CLEAR_COMPLETED' })
    showToast('Виконані завдання очищено', 'info')
  }

  const resetTasks = () => {
    if (pendingDeleteId !== null) setPendingDeleteId(null)
    setEditingTask(null)
    dispatch({ type: 'RESET' })
    showToast('Дані скинуто до початкових', 'info')
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        setFilter,
        editingTask,
        setEditingTask,
        toast,
        dismissToast,
        addTask,
        updateTask,
        toggleTask,
        requestDelete,
        undoDelete,
        clearCompleted,
        resetTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}