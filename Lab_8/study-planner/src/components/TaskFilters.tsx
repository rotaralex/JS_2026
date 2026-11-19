import { useTaskContext } from '../hooks/useTaskContext'

export default function TaskFilters() {
  const { filter, setFilter } = useTaskContext()

  return (
    <div className="filters">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        Всі
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Виконані
      </button>
      <button
        className={filter === 'pending' ? 'active' : ''}
        onClick={() => setFilter('pending')}
      >
        Не виконані
      </button>
    </div>
  )
}