import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'

import './app.css'
import '@i18n/index'

import { AppRouter } from './router.tsx'

export const ENABLE_MOCKS = (import.meta.env.VITE_ENABLE_MOCKS ?? 'true') === 'true'

if (import.meta.env.DEV && ENABLE_MOCKS) {
    import('../mocks/browser').then(({ worker }) => {
        worker.start().then(() => {
            createRoot(document.getElementById('root')!).render(
                <StrictMode>
                    <ThemeProvider theme={{}}>
                        <AppRouter />
                    </ThemeProvider>
                </StrictMode>
            )
        })
    })
} else {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <ThemeProvider theme={{}}>
                <AppRouter />
            </ThemeProvider>
        </StrictMode>
    )
}
