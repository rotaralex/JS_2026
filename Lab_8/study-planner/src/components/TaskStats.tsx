import { useTaskContext } from '../hooks/useTaskContext'

export default function TaskStats() {
  const { tasks, totalTasks } = useTaskContext()

  const completedOnPage = tasks.filter((t) => t.completed).length
  const pendingOnPage = tasks.length - completedOnPage

  return (
    <div className="stats">
      <div className="stat-card">
        <span>Всього в API</span>
        <strong>{totalTasks}</strong>
      </div>
      <div className="stat-card">
        <span>Виконано (стор.)</span>
        <strong>{completedOnPage}</strong>
      </div>
      <div className="stat-card">
        <span>Активні (стор.)</span>
        <strong>{pendingOnPage}</strong>
      </div>
    </div>
  )
}