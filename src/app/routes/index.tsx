import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navbar } from '@/components/navbar'
import { Box } from '@mui/material'

const queryClient = new QueryClient()

export const RootRoute = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Box sx={{ display: 'flex', flexDirection: 'column', pt: 6 }}>
                <Navbar />
                <main>
                    <Outlet />
                </main>
            </Box>
        </QueryClientProvider>
    )
}
