import { apiBack } from '@/config'
import type { Task } from '@/types'

type CreateTaskParams = {
    task: Omit<Task, 'id'>
}
export const createTask = ({ task }: CreateTaskParams) => {
    return apiBack.post<Task>(`/todos`, task)
}
