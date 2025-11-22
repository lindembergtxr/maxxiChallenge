import Typography from '@mui/material/Typography'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'

import type { Priority } from '@/types'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

const priorityConversion = {
    low: {
        label: 'taskPriorityLow',
        color: '#129216',
        fontWeight: 700,
        icon: KeyboardDoubleArrowDownIcon,
    },
    medium: {
        label: 'taskPriorityMedium',
        color: '#026ee9',
        fontWeight: 700,
        icon: HorizontalRuleIcon,
    },
    high: {
        label: 'taskPriorityHigh',
        color: '#dd2306',
        fontWeight: 700,
        icon: KeyboardDoubleArrowUpIcon,
    },
}

type TodosListPriorityProps = {
    priority: Priority
}
export const TodosListPriority = ({ priority }: TodosListPriorityProps) => {
    const { label, icon: Icon, ...props } = priorityConversion[priority]

    const { t } = useTranslation()

    const labelText = t(priorityConversion[priority].label)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
            <Icon fontSize="small" sx={props} />
            <Typography variant="caption" component="p" sx={props}>
                {labelText}
            </Typography>
        </Box>
    )
}
