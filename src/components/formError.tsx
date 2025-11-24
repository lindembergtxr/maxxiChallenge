import { useTranslation } from 'react-i18next'
import { FormHelperText } from '@mui/material'

type FormErrorProps = {
    error: boolean
    errorMessage: string | undefined
}
export const FormError = ({ error, errorMessage }: FormErrorProps) => {
    const { t } = useTranslation()

    return (
        <FormHelperText
            sx={{
                minHeight: '1.5rem',
                color: error ? 'error.main' : 'transparent',
                transition: 'color .15s ease',
            }}
        >
            {t(errorMessage ?? '')}
        </FormHelperText>
    )
}
