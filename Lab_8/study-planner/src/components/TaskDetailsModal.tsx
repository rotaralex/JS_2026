import { useEffect, useState } from 'react'
import type { Task } from '../types/task'
import { taskRepository } from '../repositories/taskRepository'
import { useTaskContext } from '../hooks/useTaskContext'

export default function TaskDetailsModal() {
  const { selectedTaskId, setSelectedTaskId, tasks } = useTaskContext()
  const [taskDetails, setTaskDetails] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (selectedTaskId === null) return

    const controller = new AbortController()
    // Зберігаємо локальні метадані (опис, пріоритет, категорію), якщо завдання було створене/відредаговане в поточній сесії
    const localTask = tasks.find((t) => t.id === selectedTaskId)

    async function fetchDetails() {
      setIsLoading(true)
      setError(null)
      try {
        if (selectedTaskId! > 254 && localTask) {
          setTaskDetails(localTask)
          return
        }
        const fetched = await taskRepository.getById(selectedTaskId!, controller.signal)
        setTaskDetails({
          ...fetched,
          description: localTask?.description || fetched.description || 'Опис відсутній',
          priority: localTask?.priority || fetched.priority,
          category: localTask?.category || fetched.category,
        })
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        setError((err as Error).message || 'Не вдалося завантажити деталі завдання')
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchDetails()
    return () => controller.abort()
  }, [selectedTaskId, tasks])

  if (selectedTaskId === null) return null

  return (
    <div className="modal-backdrop" onClick={() => setSelectedTaskId(null)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Деталі завдання #{selectedTaskId}</h3>
          <button
            className="modal-close"
            onClick={() => setSelectedTaskId(null)}
            aria-label="Закрити"
          >
            ✕
          </button>
        </div>

        {isLoading && <p className="state-msg">Loading details...</p>}

        {error && <p className="state-msg error-text">{error}</p>}

        {!isLoading && !error && taskDetails && (
          <div className="details-body">
            <div className="detail-row">
              <strong>Назва:</strong>
              <span>{taskDetails.title}</span>
            </div>
            <div className="detail-row">
              <strong>Статус:</strong>
              <span className={taskDetails.completed ? 'status-done' : 'status-active'}>
                {taskDetails.completed ? 'Виконано' : 'В процесі'}
              </span>
            </div>
            <div className="detail-row">
              <strong>Пріоритет:</strong>
              <span className={`priority-badge ${taskDetails.priority}`}>
                {taskDetails.priority}
              </span>
            </div>
            <div className="detail-row">
              <strong>Категорія:</strong>
              <span>{taskDetails.category}</span>
            </div>
            <div className="detail-row">
              <strong>Опис:</strong>
              <p>{taskDetails.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}