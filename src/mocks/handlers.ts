import { http, HttpResponse } from 'msw'
import { todoList } from './db'

export const handlers = [
    http.get('/todos', ({ request }) => {
        const url = new URL(request.url)

        const page = Number(url.searchParams.get('page') ?? 1)
        const limit = Number(url.searchParams.get('limit') ?? 10)

        const start = (page - 1) * limit
        const end = start + limit

        const paginated = todoList.slice(start, end)

        return HttpResponse.json({
            data: paginated,
            total: todoList.length,
            page,
            limit,
        })
    }),
]
