import type { Task, TaskForm } from '@/types'
import type { FormData } from '../types/formType'

export const getDefaultForm = (task: FormData | Task | null | undefined): FormData => {
    return {
        title: task?.title ?? null,
        description: task?.description ?? null,
        status: task?.status ?? 'pending',
        priority: task?.priority ?? null,
        dueDate: task?.dueDate ?? null,
        location: {
            latitude: task?.location?.latitude ?? null,
            longitude: task?.location?.longitude ?? null,
        },
    }
}

export const cleanForm = (values: FormData, id?: string): TaskForm => ({
    ...(id && { id }),
    title: values.title ?? '',
    description: values.description ?? '',
    status: values.status ?? 'pending',
    priority: values.priority ?? 'low',
    dueDate: values.dueDate ?? '',
    location: {
        latitude: values.location.latitude ?? 0,
        longitude: values.location.longitude ?? 0,
    },
})
