import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const savedItem = localStorage.getItem(key)
    return savedItem ? JSON.parse(savedItem) : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
