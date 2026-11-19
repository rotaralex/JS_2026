import { httpClient } from '../api/httpClient'
import type { ApiTodo, Task, TodosResponse } from '../types/task'

// Мапінг з API DTO у domain model
function toTask(dto: ApiTodo, overrides?: Partial<Task>): Task {
  return {
    id: dto.id,
    title: dto.todo,
    description: overrides?.description ?? '',
    completed: dto.completed,
    priority: overrides?.priority ?? 'medium',
    category: overrides?.category ?? 'General',
  }
}

export interface PaginatedTasks {
  tasks: Task[]
  total: number
  skip: number
  limit: number
}

export const taskRepository = {
  async getAll(
    limit = 10,
    skip = 0,
    signal?: AbortSignal
  ): Promise<PaginatedTasks> {
    const data = await httpClient<TodosResponse>('/todos', {
      params: { limit, skip },
      signal,
    })

    return {
      tasks: data.todos.map((dto) => toTask(dto)),
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    }
  },

  async getById(id: number, signal?: AbortSignal): Promise<Task> {
    const dto = await httpClient<ApiTodo>(`/todos/${id}`, { signal })
    return toTask(dto)
  },

  async create(taskData: Omit<Task, 'id' | 'completed'>): Promise<Task> {
    const dto = await httpClient<ApiTodo>('/todos/add', {
      method: 'POST',
      body: JSON.stringify({
        todo: taskData.title,
        completed: false,
        userId: 1,
      }),
    })

    // DummyJSON повертає id: 255 для всіх нових записів, генеруємо унікальний локальний id при колізії
    return toTask(
      { ...dto, id: Date.now() },
      {
        description: taskData.description,
        priority: taskData.priority,
        category: taskData.category,
      }
    )
  },

  async update(
    id: number,
    updates: Partial<Pick<Task, 'title' | 'completed' | 'description' | 'priority' | 'category'>>
  ): Promise<Partial<Task>> {
    const payload: Record<string, unknown> = {}
    if (updates.title !== undefined) payload.todo = updates.title
    if (updates.completed !== undefined) payload.completed = updates.completed

    // Для локально створених завдань (id > 254), яких немає в базі DummyJSON, імітуємо відповідь
    if (id > 254) {
      return updates
    }

    const dto = await httpClient<ApiTodo>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })

    return {
      ...updates,
      title: dto.todo,
      completed: dto.completed,
    }
  },

  async delete(id: number): Promise<void> {
    if (id > 254) return

    await httpClient<ApiTodo & { isDeleted?: boolean }>(`/todos/${id}`, {
      method: 'DELETE',
    })
  },
}