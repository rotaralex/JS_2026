import { useTaskContext } from '../hooks/useTaskContext'

export default function Toast() {
  const { toast, dismissToast } = useTaskContext()

  if (!toast) return null

  return (
    <div className={`toast toast-${toast.type}`} key={toast.id}>
      <div className="toast-content">
        <span>{toast.text}</span>
        <button className="toast-close-btn" onClick={dismissToast} aria-label="Закрити">
          ✕
        </button>
      </div>
    </div>
  )
}