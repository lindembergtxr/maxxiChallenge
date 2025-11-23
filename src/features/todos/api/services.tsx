import { apiBack } from '@/config'
import type { Paginated, Task } from '@/types'

type GetTodoListParams = {
    page?: number
    limit?: number
    sortBy: keyof Task
    sortDirection: 'asc' | 'desc'
}
export const getTodoList = (params?: GetTodoListParams) => {
    return apiBack.get<Paginated<Task>>('/todos', { params })
}

type CreateTaskParams = {
    task: Omit<Task, 'id'>
}
export const createTask = ({ task }: CreateTaskParams) => {
    return apiBack.post<Task>(`/todos`, task)
}

type EditTaskParams = {
    task: Task
}
export const editTask = ({ task }: EditTaskParams) => {
    return apiBack.put<Task>(`/todos/${task.id}`, task)
}

type RemoveTaskParams = {
    id: string
}
export const removeTask = ({ id }: RemoveTaskParams) => {
    return apiBack.delete(`/todos/${id}`)
}
