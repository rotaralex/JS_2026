import { useTaskContext } from '../hooks/useTaskContext'
import TaskItem from './TaskItem'

export default function TaskList() {
  const { tasks, filter } = useTaskContext()

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  if (tasks.length === 0) {
    return <p className="empty-msg">Завдань поки немає. Додайте перше навчальне завдання.</p>
  }

  if (filteredTasks.length === 0) {
    return <p className="empty-msg">За цим фільтром завдань немає.</p>
  }

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}