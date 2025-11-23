import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Task } from '@/types'

import { createTask } from '../api'
import { todoListKey } from './useTodoList'

export const useCreateTask = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (task: Omit<Task, 'id'>) => createTask({ task }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: ({ queryKey: key }) => Array.isArray(key) && key[0] === todoListKey,
            })
            navigate('/')
        },
    })
}
