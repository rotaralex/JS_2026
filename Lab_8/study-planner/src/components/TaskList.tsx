import type { Task } from '../types/task'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  totalTasksCount: number
  onToggleComplete: (id: number) => void
  onDelete: (id: number) => void
}

export default function TaskList({
  tasks,
  totalTasksCount,
  onToggleComplete,
  onDelete,
}: TaskListProps) {
  if (totalTasksCount === 0) {
    return <p className="empty-msg">Завдань поки немає. Додайте перше навчальне завдання.</p>
  }

  if (tasks.length === 0) {
    return <p className="empty-msg">За цим фільтром завдань немає.</p>
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}