import { Outlet } from 'react-router-dom'

export const RootRoute = () => {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
