import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { removeTask } from '../api'
import { todoListKey } from './useTodoList'

export const useRemoveTask = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (id: string) => removeTask({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: ({ queryKey: key }) => Array.isArray(key) && key[0] === todoListKey,
            })
            navigate('/')
        },
    })
}
