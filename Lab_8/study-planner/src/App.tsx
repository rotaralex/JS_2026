import { useState } from 'react'
import type { Task } from './types/task'
import { initialTasks } from './data/initialTasks'
import Header from './components/Header'
import TaskStats from './components/TaskStats'
import TaskFilters, { type FilterStatus } from './components/TaskFilters'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<FilterStatus>('all')

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now(),
      completed: false,
    }
    setTasks((prevTasks) => [newTask, ...prevTasks])
  }

  const handleToggleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed

  return (
    <div className="container">
      <Header />
      <TaskForm onAddTask={handleAddTask} />
      <TaskStats total={total} completed={completed} pending={pending} />
      <TaskFilters currentFilter={filter} onFilterChange={setFilter} />
      <TaskList
        tasks={filteredTasks}
        totalTasksCount={total}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
      />
    </div>
  )
}