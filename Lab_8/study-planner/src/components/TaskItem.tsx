import type { Task } from '../types/task'
import { useTaskContext } from '../hooks/useTaskContext'

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, setTaskToDelete, setEditingTask, setSelectedTaskId } = useTaskContext()

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <h4
          className="task-title clickable-title"
          onClick={() => setSelectedTaskId(task.id)}
          title="Натисніть для перегляду деталей"
        >
          {task.title}
        </h4>
        <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-footer">
        <span className="task-category">{task.category}</span>
        <div className="item-actions">
          <button className="details-btn" onClick={() => setSelectedTaskId(task.id)}>
            Деталі
          </button>
          <button className="edit-btn" onClick={() => setEditingTask(task)}>
            Редагувати
          </button>
          <button className="delete-btn" onClick={() => setTaskToDelete(task)}>
            Видалити
          </button>
        </div>
      </div>
    </div>
  )
}