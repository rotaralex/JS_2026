import { useState } from 'react'
import { useTaskContext } from '../hooks/useTaskContext'

export default function ConfirmDeleteModal() {
  const { taskToDelete, setTaskToDelete, confirmDeleteTask } = useTaskContext()
  const [isDeleting, setIsDeleting] = useState(false)

  if (!taskToDelete) return null

  const handleConfirm = async () => {
    setIsDeleting(true)
    try {
      await confirmDeleteTask()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={() => !isDeleting && setTaskToDelete(null)}>
      <div className="modal-card confirm-card" onClick={(e) => e.stopPropagation()}>
        <h3>Підтвердження видалення</h3>
        <p className="confirm-text">
          Ви дійсно бажаєте видалити завдання <strong>«{taskToDelete.title}»</strong>?
        </p>
        <div className="confirm-actions">
          <button
            className="cancel-edit-btn"
            disabled={isDeleting}
            onClick={() => setTaskToDelete(null)}
          >
            Скасувати
          </button>
          <button
            className="danger-btn"
            disabled={isDeleting}
            onClick={handleConfirm}
          >
            {isDeleting ? 'Видалення...' : 'Видалити'}
          </button>
        </div>
      </div>
    </div>
  )
}