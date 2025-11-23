import { http, HttpResponse } from 'msw'
import { todoList } from './db'
import type { Task } from '@/types'

export const handlers = [
    http.get('/todos', ({ request }) => {
        const url = new URL(request.url)

        const page = Number(url.searchParams.get('page') ?? 1)
        const limit = Number(url.searchParams.get('limit') ?? 10)

        const start = (page - 1) * limit
        const end = start + limit

        const sortBy = (url.searchParams.get('sortBy') ?? 'title') as keyof Task
        const sortDirection = url.searchParams.get('sortDirection') ?? 'asc'

        const paginated = todoList
            .sort((a, b) => {
                const aVal = a[sortBy]
                const bVal = b[sortBy]

                if (aVal === null) return 1
                if (bVal === null) return -1

                if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
                if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
                return 0
            })
            .slice(start, end)

        return HttpResponse.json({
            data: paginated,
            total: todoList.length,
            page,
            limit,
        })
    }),
    http.post('/todos', async ({ request }) => {
        const body = (await request.json()) as Omit<Task, 'id'>

        const newTask: Task = { id: crypto.randomUUID(), ...body }

        todoList.push(newTask)

        return HttpResponse.json({ task: newTask }, { status: 201 })
    }),
    http.put('/todos/:id', async ({ params, request }) => {
        const id = params.id as string
        const index = todoList.findIndex((t) => t.id === id)

        if (index === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })

        const body = (await request.json()) as Task
        const updated = { ...todoList[index], ...body }

        todoList[index] = updated

        return HttpResponse.json({ task: updated }, { status: 200 })
    }),
    http.delete('/todos/:id', ({ params }) => {
        const id = params.id as string
        const index = todoList.findIndex((t) => t.id === id)

        if (index === -1) return HttpResponse.json({ error: 'Task not found' }, { status: 404 })

        todoList.splice(index, 1)

        return HttpResponse.json(null, { status: 204 })
    }),
]
