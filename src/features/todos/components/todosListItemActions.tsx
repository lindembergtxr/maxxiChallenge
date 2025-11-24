import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import type { Task } from '@/types'
import { useRemoveTask } from '../hooks'
import { useNavigate } from 'react-router-dom'

type TodosListItemActionsProps = {
    task: Task
}
export const TodosListItemActions = ({ task }: TodosListItemActionsProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const { t } = useTranslation()

    const navigate = useNavigate()

    const { mutate, isPending } = useRemoveTask()

    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
        setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    const openTask = () => {
        if (task.id) navigate(`/tasks/${task.id}`)
    }

    const editTask = () => {
        navigate(`/tasks/${task.id}/edit`)
    }

    const removeTask = () => mutate(task.id)

    return (
        <>
            <IconButton
                id={`${task.id}-action-button`}
                aria-label="actions-menu-trigger"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id={`${task.id}-action-menu`}
                anchorEl={anchorEl}
                open={!isPending && open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': `${task.id}-action-button`,
                    },
                }}
            >
                <MenuItem onClick={openTask} sx={{ gap: 1, paddingX: 2.5, paddingY: 1 }}>
                    <InfoIcon fontSize="small" />
                    {t('todoListTableActionDetails')}
                </MenuItem>
                <MenuItem onClick={editTask} sx={{ gap: 1, paddingX: 2.5, paddingY: 1 }}>
                    <EditIcon fontSize="small" />
                    {t('todoListTableActionEdit')}
                </MenuItem>
                <MenuItem onClick={removeTask} sx={{ gap: 1, paddingX: 2.5, paddingY: 1 }}>
                    <DeleteIcon fontSize="small" />
                    {t('todoListTableActionRemove')}
                </MenuItem>
            </Menu>
        </>
    )
}
