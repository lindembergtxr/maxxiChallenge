import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type Method } from 'axios'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://api.exemplo.com'
export const ENABLE_MOCKS = (import.meta.env.VITE_ENABLE_MOCKS ?? 'true') === 'true'

class ApiError extends Error {
    status?: number
    data?: any

    constructor(error: AxiosError) {
        super(error.message)
        this.status = error.response?.status
        this.data = error.response?.data
    }
}

const createApi = (baseURL: string, extraConfig: AxiosRequestConfig = {}) => {
    const instance: AxiosInstance = axios.create({ baseURL, ...extraConfig })

    async function request<T>(method: Method, url: string, config?: AxiosRequestConfig) {
        try {
            const res = await instance.request<T>({ method, url, ...config })
            return res.data
        } catch (err) {
            throw new ApiError(err as AxiosError)
        }
    }
    return {
        get: <T>(url: string, config?: AxiosRequestConfig) => request<T>('GET', url, config),
        post: <T>(url: string, body?: any, config?: AxiosRequestConfig) =>
            request<T>('POST', url, { data: body, ...config }),
        put: <T>(url: string, body?: any, config?: AxiosRequestConfig) =>
            request<T>('PUT', url, { data: body, ...config }),
        delete: <T>(url: string, config?: AxiosRequestConfig) => request<T>('DELETE', url, config),
    }
}

export const apiBack = createApi(ENABLE_MOCKS ? '' : API_BASE_URL, {
    headers: { 'Content-Type': 'application/json' },
})
