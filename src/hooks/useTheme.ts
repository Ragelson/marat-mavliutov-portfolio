import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

/** Тот же ключ читает встроенный скрипт в index.html до загрузки React. */
export const THEME_STORAGE_KEY = 'theme'

const DARK_QUERY = '(prefers-color-scheme: dark)'

// Доступ к localStorage может быть запрещён (приватный режим, настройки браузера) — сайт должен работать и так.
function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function storeTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Выбор просто не сохранится между визитами
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme() ?? getSystemTheme())
  const [hasUserChoice, setHasUserChoice] = useState(() => readStoredTheme() !== null)

  // Синхронизация с DOM: CSS-переменные зависят от атрибута data-theme на <html>
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Пока пользователь сам не выбрал тему, следуем за системной настройкой
  useEffect(() => {
    if (hasUserChoice) return
    const query = window.matchMedia(DARK_QUERY)
    const handleChange = (event: MediaQueryListEvent) => setTheme(event.matches ? 'dark' : 'light')
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [hasUserChoice])

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    setHasUserChoice(true)
    storeTheme(next)
  }

  return { theme, toggleTheme }
}
