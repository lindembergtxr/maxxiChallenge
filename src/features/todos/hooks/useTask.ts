import { useQuery } from '@tanstack/react-query'

import { getTaskById } from '../api/getTask'

type UseTaskArgs = {
    id: string
}
export const useTask = ({ id }: UseTaskArgs) => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['task', id],
        queryFn: () => getTaskById({ id }),
    })
    return { task: data?.data ?? null, isPending, isError, error }
}
