export type FilterStatus = 'all' | 'completed' | 'pending'

interface TaskFiltersProps {
  currentFilter: FilterStatus
  onFilterChange: (filter: FilterStatus) => void
}

export default function TaskFilters({ currentFilter, onFilterChange }: TaskFiltersProps) {
  return (
    <div className="filters">
      <button
        className={currentFilter === 'all' ? 'active' : ''}
        onClick={() => onFilterChange('all')}
      >
        Всі
      </button>
      <button
        className={currentFilter === 'completed' ? 'active' : ''}
        onClick={() => onFilterChange('completed')}
      >
        Виконані
      </button>
      <button
        className={currentFilter === 'pending' ? 'active' : ''}
        onClick={() => onFilterChange('pending')}
      >
        Не виконані
      </button>
    </div>
  )
}