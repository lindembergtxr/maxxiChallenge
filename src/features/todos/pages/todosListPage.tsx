import { Box, Button, Container, Typography } from '@mui/material'
import { TodosList } from '../components/todosList'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const TodosListPage = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const goToCreate = () => navigate('/tasks/new')

    return (
        <Container
            sx={{ display: 'flex', flexDirection: 'column', maxWidth: '70vw', mx: 'auto', my: 6 }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 5 }}>
                <Typography variant="h6" fontWeight={600}>
                    {t('todoListPageTitle')}
                </Typography>

                <Button onClick={goToCreate}>{t('todoListPageButton')}</Button>
            </Box>
            <TodosList />
        </Container>
    )
}
