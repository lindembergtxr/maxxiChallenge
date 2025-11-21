import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RootRoute } from './routes'
import { HomeRoute } from './routes/home'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootRoute />,
        children: [{ index: true, element: <HomeRoute /> }],
    },
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}
