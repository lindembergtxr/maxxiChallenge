import { apiBack } from '@/config'
import type { Task } from '@/types'

type EditTaskParams = {
    task: Task
}
export const editTask = ({ task }: EditTaskParams) => {
    return apiBack.put<Task>(`/todos/${task.id}`, task)
}
