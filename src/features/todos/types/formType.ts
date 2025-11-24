import type { Priority, Status } from '@/types'

export type FormData = {
    title: string | null
    description: string | null
    status: Status
    priority: Priority | null
    dueDate: string | null
    location: {
        latitude: number | null
        longitude: number | null
    }
}
