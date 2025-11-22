import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const RootRoute = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <main>
                    <Outlet />
                </main>
            </div>
        </QueryClientProvider>
    )
}
