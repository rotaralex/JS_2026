import { TaskProvider } from './context/TaskContext'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskStats from './components/TaskStats'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import Toast from './components/Toast'

export default function App() {
  return (
    <TaskProvider>
      <div className="container">
        <Header />
        <TaskForm />
        <TaskStats />
        <TaskFilters />
        <TaskList />
      </div>
      <Toast />
    </TaskProvider>
  )
}