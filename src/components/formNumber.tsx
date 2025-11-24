import type { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NumericFormat } from 'react-number-format'
import { FormControl, FormLabel, InputBase } from '@mui/material'

import { FormError } from './formError'

type FormNumberProps = {
    id: string
    label: string
    placeholder?: string
    name: string
    error: boolean
    required?: boolean
    errorMessage: string | undefined
} & Pick<ComponentProps<typeof NumericFormat>, 'isAllowed' | 'disabled'>
export const FormNumber = ({
    id,
    label,
    placeholder,
    name,
    error,
    errorMessage,
    required,
    ...props
}: FormNumberProps) => {
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
                    <NumericFormat
                        {...props}
                        id={id}
                        customInput={InputBase}
                        decimalScale={6}
                        value={field.value}
                        placeholder={placeholderText}
                        onValueChange={(values) => field.onChange(values.floatValue ?? null)}
                        onBlur={field.onBlur}
                        inputRef={field.ref}
                        slotProps={{
                            input: {
                                sx: (theme) => ({
                                    ...theme.typography.caption,
                                    px: 2,
                                    py: 1,
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: fieldState.invalid
                                        ? theme.palette.error.main
                                        : 'divider',
                                    '&:focus-within': {
                                        borderColor: fieldState.invalid
                                            ? theme.palette.error.main
                                            : theme.palette.primary.main,
                                    },
                                }),
                            },
                        }}
                    />
                )}
            />
            <FormError error={error} errorMessage={errorMessage} />
        </FormControl>
    )
}
