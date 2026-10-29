import type { Task } from '../types/task'

interface TaskItemProps {
  task: Task
  onToggleComplete: (id: number) => void
  onDelete: (id: number) => void
}

export default function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <h4 className="task-title">{task.title}</h4>
        <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-footer">
        <span className="task-category">{task.category}</span>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          Видалити
        </button>
      </div>
    </div>
  )
}