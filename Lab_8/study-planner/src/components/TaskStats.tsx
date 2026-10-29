interface TaskStatsProps {
  total: number
  completed: number
  pending: number
}

export default function TaskStats({ total, completed, pending }: TaskStatsProps) {
  return (
    <div className="stats">
      <div className="stat-card">
        <span>Всього</span>
        <strong>{total}</strong>
      </div>
      <div className="stat-card">
        <span>Виконано</span>
        <strong>{completed}</strong>
      </div>
      <div className="stat-card">
        <span>Не виконано</span>
        <strong>{pending}</strong>
      </div>
    </div>
  )
}