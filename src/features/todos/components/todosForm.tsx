import { useEffect, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import type { TaskForm } from '@/types'
import { FormInput } from '@/components/formInput'
import { FormNumber } from '@/components/formNumber'
import { FormRadioGroup } from '@/components/formRadioGroup'

import type { FormData } from '../types/formType'
import { cleanForm, getDefaultForm } from '../utils/getDefaultForm'
import { useTranslation } from 'react-i18next'
import { useDebouncedEffect } from '@/hooks/useDebounce'

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

type TodosFormProps = {
    task: FormData | null
    canUpdate?: boolean
    canSubmit?: boolean
    onChange: (value: TaskForm) => void
    onSubmit: (value: TaskForm) => void
}
export const TodosForm = ({ task, canUpdate, canSubmit, onChange, onSubmit }: TodosFormProps) => {
    const lastValuesRef = useRef<FormData | null>(null)

    const { t } = useTranslation()

    const methods = useForm<FormData>({
        defaultValues: getDefaultForm(task),
        resolver: zodResolver(taskSchema),
        mode: 'onChange',
    })

    const submit = (data: FormData) => onSubmit(cleanForm(data))

    useEffect(() => {
        if (!task) return

        const currentValues = methods.getValues()
        const taskValues = cleanForm(task)

        if (JSON.stringify(currentValues) !== JSON.stringify(taskValues)) {
            methods.reset(taskValues, { keepErrors: true, keepDirty: true })
        }
    }, [task, methods])

    useDebouncedEffect(
        task,
        (debounced) => {
            if (!debounced) return

            const currentValues = methods.getValues()
            const taskValues = cleanForm(debounced)

            if (JSON.stringify(currentValues) !== JSON.stringify(taskValues)) {
                methods.reset(taskValues, { keepErrors: true, keepDirty: true })
            }
        },
        300
    )

    const watchedValues = methods.watch()

    const errors = methods.formState.errors

    useDebouncedEffect(
        watchedValues,
        (debounced) => {
            if (!onChange || !canUpdate) return

            const cleaned = cleanForm(debounced, task?.id)

            if (JSON.stringify(cleaned) !== JSON.stringify(lastValuesRef.current)) {
                lastValuesRef.current = cleaned
                onChange(cleaned)
            }
        },
        300
    )

    return (
        <FormProvider {...methods}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                }}
            >
                <form onSubmit={methods.handleSubmit(submit)}>
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
                            { value: 'in_progress', label: 'status.inProgress.label' },
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

                    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
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
                    <Button type="submit" disabled={!canSubmit}>
                        {t('formSubmit')}
                    </Button>
                </form>
            </Box>
        </FormProvider>
    )
}
