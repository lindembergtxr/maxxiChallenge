import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material'
import { FormError } from './formError'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type FormRadioGroupProps = {
    id: string
    label: string
    placeholder?: string
    name: string
    required?: boolean
    radioList: { value: string; label: string }[]
    error: boolean
    errorMessage: string | undefined
}
export const FormRadioGroup = ({
    id,
    name,
    label,
    error,
    radioList,
    errorMessage,
}: FormRadioGroupProps) => {
    const { control } = useFormContext()
    const { t } = useTranslation()

    return (
        <FormControl error={error} sx={{ width: '100%' }}>
            <FormLabel htmlFor={`${id}-label`}>
                <Typography typography="caption" sx={{ fontWeight: 600 }}>
                    {t(label)}
                </Typography>
            </FormLabel>

            <Controller
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <RadioGroup aria-labelledby={`${id}-label`} row {...field}>
                        {radioList.map((radio) => (
                            <FormControlLabel
                                key={radio.value}
                                value={radio.value}
                                label={t(radio.label)}
                                control={<Radio size="small" />}
                                slotProps={{ typography: { variant: 'caption' } }}
                                sx={{
                                    alignItems: 'center',
                                    '& .MuiTypography-root': { lineHeight: 1 },
                                }}
                            />
                        ))}
                    </RadioGroup>
                )}
            />
            <FormError error={error} errorMessage={errorMessage} />
        </FormControl>
    )
}
