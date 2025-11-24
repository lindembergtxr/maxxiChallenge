import { Card, Container, Typography } from '@mui/material'

import { TaskPieChart } from '../components/pieChart'
import { useTodoList } from '@/features/todos/hooks'
import { useTranslation } from 'react-i18next'

export const DashboardPage = () => {
    const { todoList } = useTodoList({})

    const { t } = useTranslation()

    const tasksByStatus = Object.entries(
        todoList.reduce<Record<string, number>>((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1
            return acc
        }, {})
    ).map(([name, value]) => ({ name, value }))

    const tasksByPriority = Object.entries(
        todoList.reduce<Record<string, number>>((acc, task) => {
            const priority = task.priority ?? 'none'
            acc[priority] = (acc[priority] || 0) + 1
            return acc
        }, {})
    ).map(([name, value]) => ({ name, value }))

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 5 }}>
            <Typography variant="h6" fontWeight={600}>
                {t('navbarDashboardTitle')} ({todoList.length})
            </Typography>

            <Container disableGutters sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <Card
                    sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2, minWidth: 250 }}
                >
                    <Typography variant="caption" fontWeight={600} gutterBottom>
                        {t('navbarDashboard.status')}
                    </Typography>
                    {tasksByStatus.length === 0 ? (
                        <Typography
                            variant="caption"
                            gutterBottom
                            sx={{ mt: 5, textAlign: 'center' }}
                        >
                            {t('todoListTableEmpty')}
                        </Typography>
                    ) : (
                        <TaskPieChart tasks={tasksByStatus} field="status" />
                    )}
                </Card>

                <Card
                    sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2, minWidth: 250 }}
                >
                    <Typography variant="caption" fontWeight={600} gutterBottom>
                        {t('navbarDashboard.priority')}
                    </Typography>
                    {tasksByPriority.length === 0 ? (
                        <Typography
                            variant="caption"
                            gutterBottom
                            sx={{ mt: 5, textAlign: 'center' }}
                        >
                            {t('todoListTableEmpty')}
                        </Typography>
                    ) : (
                        <TaskPieChart tasks={tasksByPriority} field="priority" />
                    )}
                </Card>
            </Container>
        </Container>
    )
}
