import type { Task } from '../types/task'
import { useTaskContext } from '../hooks/useTaskContext'

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, requestDelete, setEditingTask } = useTaskContext()

  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''} ${
        task.isDeleting ? 'deleting' : ''
      }`}
    >
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          disabled={task.isDeleting}
          onChange={() => toggleTask(task.id)}
        />
        <h4 className="task-title">{task.title}</h4>
        {task.isDeleting && <span className="deleting-badge">Буде видалено...</span>}
        <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-footer">
        <span className="task-category">{task.category}</span>
        {!task.isDeleting && (
          <div className="item-actions">
            <button className="edit-btn" onClick={() => setEditingTask(task)}>
              Редагувати
            </button>
            <button className="delete-btn" onClick={() => requestDelete(task.id)}>
              Видалити
            </button>
          </div>
        )}
      </div>
    </div>
  )
}