import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import 'leaflet/dist/leaflet.css'
import './app.css'
import '@i18n/index'

import { AppRouter } from './router.tsx'

export const ENABLE_MOCKS = (import.meta.env.VITE_ENABLE_MOCKS ?? 'true') === 'true'

const theme = createTheme()

if (import.meta.env.DEV && ENABLE_MOCKS) {
    import('../mocks/browser').then(({ worker }) => {
        worker.start().then(() => {
            createRoot(document.getElementById('root')!).render(
                <StrictMode>
                    <ThemeProvider theme={theme}>
                        <AppRouter />
                    </ThemeProvider>
                </StrictMode>
            )
        })
    })
} else {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <ThemeProvider theme={theme}>
                <AppRouter />
            </ThemeProvider>
        </StrictMode>
    )
}
