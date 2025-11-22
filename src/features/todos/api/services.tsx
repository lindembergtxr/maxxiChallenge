import { apiBack } from '@/config'
import type { Paginated, Task } from '@/types'

type GetTodoListParams = {
    page: number
    limit: number
}
export const getTodoList = (params?: GetTodoListParams) => {
    return apiBack.get<Paginated<Task>>('/todos', { params })
}
