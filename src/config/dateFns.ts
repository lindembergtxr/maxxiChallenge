import { enUS, ptBR, type Locale } from 'date-fns/locale'

export const i18nToDateFnsLocaleMap: Record<string, Locale> = {
    en: enUS,
    'en-US': enUS,
    pt: ptBR,
    'pt-BR': ptBR,
}
