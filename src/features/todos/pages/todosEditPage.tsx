import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'

import { TodosForm } from '../components/todosForm'
import { LocationPicker } from '@/components/locationPicker'
import type { GeoPoint } from '@/types'
import { useTask } from '../hooks/useTask'
import { useUpdateTask } from '../hooks'
import { cleanForm, getDefaultForm } from '../utils/getDefaultForm'
import type { FormData } from '../types/formType'

export const TodosEditPage = () => {
    const { t } = useTranslation()

    const params = useParams()

    const { task } = useTask({ id: params?.id ?? '' })

    const [newTask, setTask] = useState<FormData | null>(null)

    const { mutate, isPending } = useUpdateTask()

    const updateForm = (data: FormData) => {
        setTask(data)
    }
    const submitForm = () => {
        if (task && newTask) mutate({ ...cleanForm(newTask), id: task?.id })
    }

    const onCoordinateChange = (latitude: number, longitude: number) => {
        if (!task?.location) return
        setTask({ ...task, location: { latitude, longitude } })
    }

    useEffect(() => {
        if (task) setTask(getDefaultForm(task))
    }, [task])

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: 0, py: 5 }}>
            <Typography variant="h6" fontWeight={600}>
                {t('todoEditPageTitle')}
            </Typography>

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
                <TodosForm
                    task={newTask}
                    onSubmit={submitForm}
                    canUpdate={!isPending}
                    canSubmit={!isPending}
                    onChange={updateForm}
                />
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
                        editable
                        onChange={onCoordinateChange}
                    />
                </Box>
            </Container>
        </Container>
    )
}
