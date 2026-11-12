import { useTaskContext } from '../hooks/useTaskContext'

export default function TaskFilters() {
  const { filter, setFilter, clearCompleted, resetTasks } = useTaskContext()

  return (
    <div className="controls-wrapper">
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
      <div className="extra-actions">
        <button className="secondary-btn" onClick={clearCompleted}>
          Очистити виконані
        </button>
        <button className="secondary-btn reset-btn" onClick={resetTasks}>
          Скинути дані
        </button>
      </div>
    </div>
  )
}