import { useTaskContext } from '../hooks/useTaskContext'
import TaskItem from './TaskItem'

export default function TaskList() {
  const { tasks, filter, isLoading, error, retryFetch } = useTaskContext()

  if (isLoading) {
    return (
      <div className="state-box">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="state-box error-box">
        <p>Помилка завантаження: {error}</p>
        <button className="retry-btn" onClick={retryFetch}>
          Спробувати ще
        </button>
      </div>
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  if (filteredTasks.length === 0) {
    return <p className="empty-msg">Завдань не знайдено.</p>
  }

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}