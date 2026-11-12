import { useTaskContext } from '../hooks/useTaskContext'

export default function TaskStats() {
  const { tasks } = useTaskContext()

  const activeTasks = tasks.filter((t) => !t.isDeleting)
  const total = activeTasks.length
  const completed = activeTasks.filter((t) => t.completed).length
  const pending = total - completed

  return (
    <div className="stats">
      <div className="stat-card">
        <span>Всього</span>
        <strong>{total}</strong>
      </div>
      <div className="stat-card">
        <span>Виконано</span>
        <strong>{completed}</strong>
      </div>
      <div className="stat-card">
        <span>Не виконано</span>
        <strong>{pending}</strong>
      </div>
    </div>
  )
}