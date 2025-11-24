import { Box, Container, Modal, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useTodoList } from '../hooks'
import { LocationViewer } from '@/components/locationViewer'
import { useState } from 'react'
import type { Task } from '@/types'
import { TodosDetailsPage } from './todosDetailsPage'

export const TodosMapPage = () => {
    const { t } = useTranslation()

    const [task, setTask] = useState<Task | null>(null)

    const { todoList } = useTodoList({})

    const coordinates = (todoList ?? []).map(({ id, location }) => ({ id, location }))

    const handleClose = () => setTask(null)

    const selectCoordinate = (id: string) => {
        setTask(todoList.find((t) => t.id === id) ?? null)
    }

    return (
        <Container
            sx={{ display: 'flex', flexDirection: 'column', maxWidth: '70vw', mx: 'auto', my: 6 }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                    {t('todoMapPageTitle')} ({todoList.length})
                </Typography>

                <Typography variant="subtitle2">{t('todoMapPageSubtitle')}</Typography>
            </Box>

            <LocationViewer points={coordinates} onClick={selectCoordinate} />

            <Modal
                open={!!task}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', md: '60vw' },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}
                >
                    <TodosDetailsPage id={task?.id} />
                </Box>
            </Modal>
        </Container>
    )
}
