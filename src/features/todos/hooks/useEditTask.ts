import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Task } from '@/types'

import { editTask } from '../api'
import { todoListKey } from './useTodoList'

export const useUpdateTask = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (task: Task) => editTask({ task }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: ({ queryKey: key }) => Array.isArray(key) && key[0] === todoListKey,
            })
            navigate('/')
        },
    })
}
