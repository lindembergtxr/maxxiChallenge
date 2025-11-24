import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { Box, Button, Container, Typography } from '@mui/material'
import { TodosForm } from '../components/todosForm'
import { LocationPicker } from '@/components/locationPicker'

import type { GeoPoint } from '@/types'
import { useTask } from '../hooks/useTask'

export const TodosDetailsPage = () => {
    const { t } = useTranslation()

    const params = useParams()
    const navigate = useNavigate()

    const { task } = useTask({ id: params?.id ?? '' })

    const editTask = () => {
        if (task) navigate(`/tasks/${task.id}/edit`)
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: 0, py: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 5 }}>
                <Typography variant="h6" fontWeight={600}>
                    {t('todoDetailsPageTitle')}
                </Typography>

                <Button onClick={editTask}>{t('todoEditPageTitle')}</Button>
            </Box>

            <Container
                disableGutters
                sx={{
                    display: 'flex',
                    flexDirection: { sm: 'column', md: 'row' },
                    gap: 3,
                    width: '100%',
                    px: 0,
                }}
            >
                <TodosForm task={task} disabled />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        gap: 0.5,
                    }}
                >
                    <Typography variant="body2">{t('formCoordinateMap')}</Typography>

                    <LocationPicker
                        coordinate={
                            task?.location?.latitude && task.location?.longitude
                                ? (task.location as GeoPoint)
                                : null
                        }
                    />
                </Box>
            </Container>
        </Container>
    )
}
