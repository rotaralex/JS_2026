import { useTaskContext } from '../hooks/useTaskContext'

export default function Pagination() {
  const { page, totalPages, setPage, isLoading } = useTaskContext()

  if (totalPages <= 1) return null

  return (
    <div className="pagination">
      <button
        disabled={page <= 1 || isLoading}
        onClick={() => setPage(page - 1)}
      >
        ← Попередня
      </button>
      <span className="page-indicator">
        Сторінка <strong>{page}</strong> з <strong>{totalPages}</strong>
      </span>
      <button
        disabled={page >= totalPages || isLoading}
        onClick={() => setPage(page + 1)}
      >
        Наступна →
      </button>
    </div>
  )
}