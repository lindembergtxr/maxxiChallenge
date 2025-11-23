import { useQuery } from '@tanstack/react-query'

import type { Task } from '@/types'
import { getTodoList } from '../api/services'

type UseTodoListArgs = {
    page?: number
    limit?: number
    sortBy: keyof Task
    sortDirection: 'asc' | 'desc'
}
export const useTodoList = ({ page, limit, sortBy, sortDirection }: UseTodoListArgs) => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['taskList', page, limit, sortBy, sortDirection],
        queryFn: () => getTodoList({ page, limit, sortBy, sortDirection }),
    })
    return { todoList: data?.data ?? [], totalPages: data?.total ?? 0, isPending, isError, error }
}
