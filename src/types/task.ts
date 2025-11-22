export type GeoPoint = {
    latitude: number
    longitude: number
}

export type Priority = 'low' | 'medium' | 'high'

export type Status = 'pending' | 'in_progress' | 'completed' | 'cancelled'

export type Task = {
    id: string
    title: string
    description: string
    priority: Priority
    status: Status
    location: GeoPoint
    dueDate: string | null // ISO 8601 ou null
}
