import { useRef, useEffect } from 'react'

export function useDebouncedEffect<T>(
    value: T,
    callback: (debouncedValue: T) => void,
    delay: number
) {
    const timer = useRef<number | null>(null)

    useEffect(() => {
        if (timer.current) clearTimeout(timer.current)

        timer.current = window.setTimeout(() => callback(value), delay)

        return () => {
            if (timer.current) clearTimeout(timer.current)
        }
    }, [value, delay, callback])
}
