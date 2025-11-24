import { Box, Typography } from '@mui/material'
import { TodosForm } from '../components/todosForm'
import { LocationPicker } from '@/components/locationPicker'
import { useState } from 'react'
import type { TaskForm } from '@/types'
import { useTranslation } from 'react-i18next'

export const TodosCreatePage = () => {
    const { t } = useTranslation()

    const [task, setTask] = useState<TaskForm | null>(null)

    const updateForm = (data: TaskForm) => {
        setTask(data)
    }
    const submitForm = (data: TaskForm) => {
        setTask(data)
    }
    const onCoordinateChange = (latitude: number, longitude: number) => {
        if (!task) return
        setTask({ ...task, location: { latitude, longitude } })
    }

    return (
        <Box sx={{ display: 'flex', gap: 3 }}>
            <TodosForm task={task} onSubmit={submitForm} canUpdate onChange={updateForm} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 4 }}>
                <Typography variant="body2">{t('formCoordinateMap')}</Typography>
                <LocationPicker
                    coordinate={
                        task?.location?.latitude && task.location?.longitude ? task.location : null
                    }
                    editable
                    onChange={onCoordinateChange}
                />
            </Box>
        </Box>
    )
}
