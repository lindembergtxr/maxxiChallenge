import { apiBack } from '@/config'

type RemoveTaskParams = {
    id: string
}
export const removeTask = ({ id }: RemoveTaskParams) => {
    return apiBack.delete(`/todos/${id}`)
}
