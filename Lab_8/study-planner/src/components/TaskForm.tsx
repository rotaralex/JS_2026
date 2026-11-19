import { useState, type FormEvent } from 'react'
import type { Priority, Task } from '../types/task'
import { useTaskContext } from '../hooks/useTaskContext'

interface InnerFormProps {
  editingTask: Task | null
  onAdd: (task: Omit<Task, 'id' | 'completed'>) => Promise<void>
  onUpdate: (task: Omit<Task, 'completed'>) => Promise<void>
  onCancelEdit: () => void
}

function InnerTaskForm({ editingTask, onAdd, onUpdate, onCancelEdit }: InnerFormProps) {
  const [title, setTitle] = useState(editingTask?.title ?? '')
  const [description, setDescription] = useState(editingTask?.description ?? '')
  const [category, setCategory] = useState(editingTask?.category ?? 'React')
  const [priority, setPriority] = useState<Priority>(editingTask?.priority ?? 'medium')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      if (editingTask) {
        await onUpdate({
          id: editingTask.id,
          title: title.trim(),
          description: description.trim(),
          category: category.trim() || 'General',
          priority,
        })
      } else {
        await onAdd({
          title: title.trim(),
          description: description.trim(),
          category: category.trim() || 'General',
          priority,
        })
        setTitle('')
        setDescription('')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editingTask ? 'Редагувати завдання' : 'Додати нове завдання'}</h3>
      <input
        type="text"
        placeholder="Назва завдання *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isSubmitting}
        required
      />
      <textarea
        placeholder="Короткий опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isSubmitting}
      />
      <div className="form-row">
        <input
          type="text"
          placeholder="Категорія"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isSubmitting}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          disabled={isSubmitting}
        >
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? 'Збереження...'
            : editingTask
              ? 'Зберегти зміни'
              : 'Додати завдання'}
        </button>
        {editingTask && (
          <button
            type="button"
            className="cancel-edit-btn"
            disabled={isSubmitting}
            onClick={onCancelEdit}
          >
            Скасувати
          </button>
        )}
      </div>
    </form>
  )
}

export default function TaskForm() {
  const { addTask, updateTask, editingTask, setEditingTask } = useTaskContext()

  return (
    <InnerTaskForm
      key={editingTask?.id ?? 'new'}
      editingTask={editingTask}
      onAdd={addTask}
      onUpdate={updateTask}
      onCancelEdit={() => setEditingTask(null)}
    />
  )
}