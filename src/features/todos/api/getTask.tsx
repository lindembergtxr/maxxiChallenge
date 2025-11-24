import { apiBack } from '@/config'
import type { Task } from '@/types'

type GetTaskByIdParams = {
    id: string
}
export const getTaskById = ({ id }: GetTaskByIdParams) => {
    return apiBack.get<{ data: Task }>(`/todos/${id}`)
}
