import Chip from '@mui/material/Chip'

import type { Status } from '@/types'
import { useTranslation } from 'react-i18next'

const statusConversion = {
    pending: { label: 'taskStatusPending', color: '#2E2E2E', backgroundColor: '#D&D&D&' },
    in_progress: { label: 'taskStatusInProgress', color: '#0D3F77', backgroundColor: '#BBDEFB' },
    completed: { label: 'taskStatusCompleted', color: '#064C08', backgroundColor: '#8BEE8E' },
    cancelled: { label: 'taskStatusCancelled', color: '#330700', backgroundColor: '#F6988D' },
}

type TodosListStatusProps = {
    status: Status
}
export const TodosListStatus = ({ status }: TodosListStatusProps) => {
    const { t } = useTranslation()

    return (
        <Chip
            label={t(statusConversion[status].label)}
            sx={{ ...statusConversion[status], fontWeight: 600 }}
        />
    )
}
