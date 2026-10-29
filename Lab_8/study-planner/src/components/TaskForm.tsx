import { useState, type FormEvent } from 'react'
import type { Priority, Task } from '../types/task'

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('React')
  const [priority, setPriority] = useState<Priority>('medium')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      priority,
    })

    setTitle('')
    setDescription('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Додати нове завдання</h3>
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
      <button type="submit">Додати завдання</button>
    </form>
  )
}