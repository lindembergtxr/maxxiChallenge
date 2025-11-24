import { Box, Container, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useTodoList } from '../hooks'
import { LocationViewer } from '@/components/locationViewer'

export const TodosMapPage = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const { todoList } = useTodoList({})

    const coordinates = (todoList ?? []).map(({ id, location }) => ({ id, location }))

    const selectCoordinate = (id: string) => {
        navigate(`/tasks/${id}`)
    }

    return (
        <Container
            sx={{ display: 'flex', flexDirection: 'column', maxWidth: '70vw', mx: 'auto', my: 6 }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                    {t('todoMapPageTitle')}
                </Typography>

                <Typography variant="subtitle2">{t('todoMapPageSubtitle')}</Typography>
            </Box>

            <LocationViewer points={coordinates} onClick={selectCoordinate} />
        </Container>
    )
}
