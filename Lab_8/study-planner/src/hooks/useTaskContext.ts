import { useContext } from 'react'
import { TaskContext } from '../context/taskContextDef'

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext має використовуватися всередині TaskProvider')
  }
  return context
}