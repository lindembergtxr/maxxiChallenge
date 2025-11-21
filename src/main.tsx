import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import '@i18n/index'
import { App } from './App.tsx'

export const ENABLE_MOCKS = import.meta.env.VITE_ENABLE_MOCKS === 'true'

if (import.meta.env.DEV && ENABLE_MOCKS) {
    const { worker } = await import('./mocks/browser')
    worker.start()
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
