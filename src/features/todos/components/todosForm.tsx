import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import type { Priority, Status, Task, TaskForm } from '@/types'
import { FormInput } from '@/components/formInput'
import { FormNumber } from '@/components/formNumber'
import { FormRadioGroup } from '@/components/formRadioGroup'
import { useEffect } from 'react'

type FormData = {
    title: string | null
    description: string | null
    status: Status
    priority: Priority | null
    dueDate: string | null
    location: {
        latitude: number | null
        longitude: number | null
    }
}

const defaultValues = (task?: Task): FormData => {
    return {
        title: task?.title ?? null,
        description: task?.description ?? null,
        status: task?.status ?? 'pending',
        priority: task?.priority ?? null,
        dueDate: task?.dueDate ?? null,
        location: {
            latitude: task?.location?.latitude ?? null,
            longitude: task?.location?.longitude ?? null,
        },
    }
}

const taskSchema = z.object({
    title: z
        .string()
        .nullable()
        .refine((v) => v !== null && v.length > 0, { message: 'title.required' }),
    description: z.string().nullable(),
    status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
    priority: z
        .enum(['low', 'medium', 'high'])
        .nullable()
        .refine((v) => v !== null, { message: 'priority.required' }),
    dueDate: z
        .string()
        .nullable()
        .refine((v) => v !== null, { message: 'dueDate.required' }),
    location: z.object({
        latitude: z
            .number()
            .nullable()
            .refine((v) => v !== null, { message: 'latitude.required' }),
        longitude: z
            .number()
            .nullable()
            .refine((v) => v !== null, { message: 'longitude.required' }),
    }),
})

const cleanForm = (values: FormData, id?: string): TaskForm => ({
    ...(id && { id }),
    title: values.title ?? '',
    description: values.description ?? '',
    status: values.status ?? 'pending',
    priority: values.priority ?? 'low',
    dueDate: values.dueDate ?? '',
    location: {
        latitude: values.location.latitude ?? 0,
        longitude: values.location.longitude ?? 0,
    },
})

type TodosFormProps = {
    task?: Task
    canUpdate?: boolean
    onChange: (value: TaskForm) => void
    onSubmit: (value: TaskForm) => void
}
export const TodosForm = ({ task, canUpdate, onChange, onSubmit }: TodosFormProps) => {
    const methods = useForm<FormData>({
        defaultValues: defaultValues(task),
        resolver: zodResolver(taskSchema),
        mode: 'onChange',
    })

    const submit = (data: FormData) => onSubmit(cleanForm(data))

    useEffect(() => {
        if (task) methods.reset(task, { keepErrors: true, keepDirty: true })
    }, [task, methods.reset])

    const watchedValues = methods.watch()

    const errors = methods.formState.errors

    useEffect(() => {
        if (!onChange) return

        if (canUpdate) onChange(cleanForm(watchedValues, task?.id))
    }, [watchedValues, onChange])

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submit)}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: { sm: '25vw' },
                        minWidth: { xs: '100%', sm: 450 },
                    }}
                >
                    <FormInput
                        id="task-title"
                        label="title.label"
                        name="title"
                        placeholder="title.placeholder"
                        error={!!errors?.title}
                        errorMessage={errors?.title?.message}
                    />

                    <FormInput
                        id="task-description"
                        label="description.label"
                        name="description"
                        placeholder="description.placeholder"
                        multiline
                        minRows={3}
                        error={!!errors?.description}
                        errorMessage={errors?.description?.message}
                    />

                    <FormRadioGroup
                        id="task-status"
                        name="status"
                        label="status.label"
                        radioList={[
                            { value: 'pending', label: 'status.pending.label' },
                            { value: 'inProgress', label: 'status.inProgress.label' },
                            { value: 'completed', label: 'status.completed.label' },
                            { value: 'cancelled', label: 'status.cancelled.label' },
                        ]}
                        error={!!errors.status}
                        errorMessage={errors.status?.message}
                    />

                    <FormRadioGroup
                        id="task-priority"
                        name="priority"
                        label="priority.label"
                        radioList={[
                            { value: 'low', label: 'priority.low.label' },
                            { value: 'medium', label: 'priority.medium.label' },
                            { value: 'high', label: 'priority.high.label' },
                        ]}
                        error={!!errors.priority}
                        errorMessage={errors.priority?.message}
                    />

                    <FormInput
                        id="task-duedate"
                        label="dueDate.label"
                        name="dueDate"
                        type="date"
                        error={!!errors?.dueDate}
                        errorMessage={errors?.dueDate?.message}
                    />

                    <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
                        <FormNumber
                            id="task-latitude"
                            label="latitude.label"
                            name="location.latitude"
                            placeholder="latitude.placeholder"
                            isAllowed={({ floatValue }) =>
                                floatValue === undefined || (floatValue >= -90 && floatValue <= 90)
                            }
                            error={!!errors?.location?.latitude}
                            errorMessage={errors?.location?.latitude?.message}
                        />

                        <FormNumber
                            id="task-longitude"
                            label="longitude.label"
                            name="location.longitude"
                            placeholder="longitude.placeholder"
                            isAllowed={({ floatValue }) =>
                                floatValue === undefined ||
                                (floatValue >= -180 && floatValue <= 180)
                            }
                            error={!!errors?.location?.longitude}
                            errorMessage={errors?.location?.longitude?.message}
                        />
                    </Box>
                    <Button type="submit">Submit</Button>
                </Box>
            </form>
        </FormProvider>
    )
}
