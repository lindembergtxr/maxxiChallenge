import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Container, Typography } from '@mui/material'
import { TodosForm } from '../components/todosForm'
import { LocationPicker } from '@/components/locationPicker'

import { useCreateTask } from '../hooks'
import type { FormData } from '../types/formType'
import { cleanForm } from '../utils/getDefaultForm'
import type { GeoPoint } from '@/types'

export const TodosCreatePage = () => {
    const { t } = useTranslation()

    const [task, setTask] = useState<FormData | null>(null)

    const { mutate, isPending } = useCreateTask()

    const updateForm = (data: FormData) => {
        setTask(data)
    }
    const submitForm = (data: FormData) => {
        mutate(cleanForm(data))
    }
    const onCoordinateChange = (latitude: number, longitude: number) => {
        if (!task?.location) return
        setTask({ ...task, location: { latitude, longitude } })
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: 0, py: 5 }}>
            <Typography variant="h6" fontWeight={600}>
                {t('todoListPageTitle')}
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
                    task={task}
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
