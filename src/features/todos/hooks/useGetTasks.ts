import { useQuery } from '@tanstack/react-query'
import { getTodoList } from '../api/services'

type UseTodoListArgs = {
    page?: number
    limit?: number
}
export const useTodoList = ({ page, limit }: UseTodoListArgs) => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['taskList', page, limit],
        queryFn: () => getTodoList({ page, limit }),
    })
    return { todoList: data?.data ?? [], isPending, isError, error }
}
