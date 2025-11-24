import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { RootRoute } from './routes'
import { HomeRoute } from './routes/home'
import { CreateRoute } from './routes/create'
import { EditRoute } from './routes/edit'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/tasks" replace />,
    },
    {
        path: '/tasks',
        element: <RootRoute />,
        children: [
            { index: true, element: <HomeRoute /> },
            { path: 'new', element: <CreateRoute /> },
            { path: ':id', element: <EditRoute /> },
        ],
    },
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}
