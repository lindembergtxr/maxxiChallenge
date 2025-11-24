import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { RootRoute } from './routes'
import { HomeRoute } from './routes/home'
import { CreateRoute } from './routes/create'
import { EditRoute } from './routes/edit'
import { DetailsRoute } from './routes/details'
import { MapRoute } from './routes/map'
import { DashboardRoute } from './routes/dashboard'

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
            { path: ':id', element: <DetailsRoute /> },
            { path: ':id/edit', element: <EditRoute /> },
        ],
    },
    {
        path: '/map',
        element: <RootRoute />,
        children: [{ index: true, element: <MapRoute /> }],
    },
    {
        path: '/dashboard',
        element: <RootRoute />,
        children: [{ index: true, element: <DashboardRoute /> }],
    },
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}
