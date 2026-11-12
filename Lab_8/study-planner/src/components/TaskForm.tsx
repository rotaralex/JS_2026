import { useState, type FormEvent } from 'react'
import type { Priority, Task } from '../types/task'
import { useTaskContext } from '../hooks/useTaskContext'

interface InnerFormProps {
  editingTask: Task | null
  onAdd: (task: Omit<Task, 'id' | 'completed'>) => void
  onUpdate: (task: Omit<Task, 'completed' | 'isDeleting'>) => void
  onCancelEdit: () => void
}

function InnerTaskForm({ editingTask, onAdd, onUpdate, onCancelEdit }: InnerFormProps) {
  const [title, setTitle] = useState(editingTask?.title ?? '')
  const [description, setDescription] = useState(editingTask?.description ?? '')
  const [category, setCategory] = useState(editingTask?.category ?? 'React')
  const [priority, setPriority] = useState<Priority>(editingTask?.priority ?? 'medium')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    if (editingTask) {
      onUpdate({
        id: editingTask.id,
        title: title.trim(),
        description: description.trim(),
        category: category.trim() || 'Загальне',
        priority,
      })
    } else {
      onAdd({
        title: title.trim(),
        description: description.trim(),
        category: category.trim() || 'Загальне',
        priority,
      })
      setTitle('')
      setDescription('')
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
        required
      />
      <textarea
        placeholder="Короткий опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="form-row">
        <input
          type="text"
          placeholder="Категорія"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit">
          {editingTask ? 'Зберегти зміни' : 'Додати завдання'}
        </button>
        {editingTask && (
          <button
            type="button"
            className="cancel-edit-btn"
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