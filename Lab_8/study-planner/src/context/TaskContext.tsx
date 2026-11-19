import { useEffect, useState, useCallback, type ReactNode } from 'react'
import type { Task, FilterStatus, ToastMessage } from '../types/task'
import { taskRepository } from '../repositories/taskRepository'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { TaskContext } from './taskContextDef'

const ITEMS_PER_PAGE = 10

export function TaskProvider({ children }: { children: ReactNode }) {
  // Server state
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [totalTasks, setTotalTasks] = useState<number>(0)
  const [reloadTrigger, setReloadTrigger] = useState<number>(0)

  // Client / UI state
  const [filter, setFilter] = useLocalStorage<FilterStatus>('study_planner_filter', 'all')
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
  const [toast, setToast] = useState<ToastMessage | null>(null)

  const totalPages = Math.max(1, Math.ceil(totalTasks / ITEMS_PER_PAGE))

  // Завантаження списку з пагінацією та скасуванням через AbortController
  useEffect(() => {
    const controller = new AbortController()
    const skip = (page - 1) * ITEMS_PER_PAGE

    async function loadTasks() {
      setIsLoading(true)
      setError(null)
      try {
        const result = await taskRepository.getAll(ITEMS_PER_PAGE, skip, controller.signal)
        setTasks(result.tasks)
        setTotalTasks(result.total)
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        setError((err as Error).message || 'Помилка завантаження завдань із сервера')
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadTasks()

    return () => controller.abort()
  }, [page, reloadTrigger])

  // Синхронізація заголовка вкладки браузера
  useEffect(() => {
    const activeCount = tasks.filter((t) => !t.completed).length
    document.title =
      activeCount > 0
        ? `Study Planner — ${activeCount} active tasks`
        : 'Study Planner'
  }, [tasks])

  // Автоматичне приховування Toast
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), toast.duration || 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const showToast = useCallback((text: string, type: ToastMessage['type'] = 'success') => {
    setToast({ id: Date.now(), text, type, duration: 3000 })
  }, [])

  const dismissToast = () => setToast(null)
  const retryFetch = () => setReloadTrigger((prev) => prev + 1)

  const addTask = async (taskData: Omit<Task, 'id' | 'completed'>) => {
    try {
      const created = await taskRepository.create(taskData)
      setTasks((prev) => [created, ...prev])
      setTotalTasks((prev) => prev + 1)
      showToast('Завдання успішно створено!')
    } catch (err) {
      showToast((err as Error).message || 'Не вдалося створити завдання', 'error')
      throw err
    }
  }

  const updateTask = async (taskData: Omit<Task, 'completed'>) => {
    try {
      const updatedFields = await taskRepository.update(taskData.id, {
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        priority: taskData.priority,
      })
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...t, ...updatedFields } : t))
      )
      setEditingTask(null)
      showToast('Завдання успішно оновлено!')
    } catch (err) {
      showToast((err as Error).message || 'Не вдалося оновити завдання', 'error')
      throw err
    }
  }

  const toggleTask = async (id: number) => {
    const target = tasks.find((t) => t.id === id)
    if (!target) return

    const nextCompleted = !target.completed
    try {
      await taskRepository.update(id, { completed: nextCompleted })
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: nextCompleted } : t))
      )
      showToast(nextCompleted ? 'Завдання виконано' : 'Завдання повернуто в роботу', 'info')
    } catch (err) {
      showToast((err as Error).message || 'Помилка оновлення статусу', 'error')
    }
  }

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return
    const id = taskToDelete.id
    try {
      await taskRepository.delete(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
      setTotalTasks((prev) => Math.max(0, prev - 1))
      if (editingTask?.id === id) setEditingTask(null)
      if (selectedTaskId === id) setSelectedTaskId(null)
      setTaskToDelete(null)
      showToast('Завдання успішно видалено', 'info')
    } catch (err) {
      showToast((err as Error).message || 'Не вдалося видалити завдання', 'error')
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        retryFetch,
        page,
        totalPages,
        totalTasks,
        setPage,
        filter,
        setFilter,
        editingTask,
        setEditingTask,
        selectedTaskId,
        setSelectedTaskId,
        taskToDelete,
        setTaskToDelete,
        toast,
        dismissToast,
        addTask,
        updateTask,
        toggleTask,
        confirmDeleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}