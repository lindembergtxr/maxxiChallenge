import type { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormControl, FormLabel, InputBase } from '@mui/material'

import { FormError } from './formError'
import { useTranslation } from 'react-i18next'

type FormInputProps = ComponentProps<typeof InputBase> & {
    id: string
    label: string
    placeholder?: string
    name: string
    error: boolean
    required?: boolean
    errorMessage: string | undefined
}
export const FormInput = ({
    id,
    label,
    placeholder,
    name,
    error,
    errorMessage,
    required,
    ...props
}: FormInputProps) => {
    const { t } = useTranslation()

    const { control } = useFormContext()

    const placeholderText = t(placeholder ?? '')

    return (
        <FormControl
            sx={(theme) => ({
                py: 1,
                '&:has(input:focus)': { color: theme.palette.primary.main },
            })}
            fullWidth
        >
            <FormLabel
                htmlFor={id}
                sx={(theme) => ({
                    ...theme.typography.caption,
                    fontWeight: 600,
                    color: error ? 'error.main' : 'neutral.900',
                    '&.Mui-focused': { color: 'primary.main' },
                })}
            >
                {t(label)}
            </FormLabel>
            <Controller
                name={name}
                control={control}
                rules={{ required }}
                render={({ field, fieldState }) => (
                    <InputBase
                        {...props}
                        id={id}
                        placeholder={placeholderText}
                        value={field.value === null ? undefined : field.value}
                        onChange={(event) => field.onChange(event.target.value ?? null)}
                        onBlur={field.onBlur}
                        inputRef={field.ref}
                        sx={(theme) => ({
                            ...theme.typography.caption,
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: fieldState.invalid ? theme.palette.error.main : 'divider',
                            '&:focus-within': { borderColor: theme.palette.primary.main },
                        })}
                    />
                )}
            />
            <FormError error={error} errorMessage={errorMessage} />
        </FormControl>
    )
}
