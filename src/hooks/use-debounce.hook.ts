import { useEffect, useState } from 'react'

type UseDebounceParams<T> = {
   value: T
   delayInMs: number
}

export function useDebounce<T>({ value, delayInMs }: UseDebounceParams<T>) {
   const [debouncedValue, setDebouncedValue] = useState<T>(value)

   useEffect(() => {
      const timer = setTimeout(() => setDebouncedValue(value), delayInMs)

      return () => {
         clearTimeout(timer)
      }
   }, [value, delayInMs])

   return debouncedValue
}
