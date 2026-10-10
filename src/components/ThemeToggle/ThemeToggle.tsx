import { useTheme } from '../../hooks/useTheme.ts'
import styles from './ThemeToggle.module.css'

/** Переключатель-«switch»: состояние передаётся через aria-checked, иконкой и положением ползунка. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button type="button" role="switch" aria-checked={isDark} className={styles.toggle} onClick={toggleTheme}>
      <span className={styles.label}>Тёмная тема</span>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb}>
          {isDark ? (
            <svg viewBox="0 0 16 16" width="12" height="12" focusable="false">
              <path d="M10.5 1.5a6.5 6.5 0 1 0 4 11.6A7 7 0 0 1 10.5 1.5Z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" width="12" height="12" focusable="false">
              <circle cx="8" cy="8" r="3.2" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3 3l1.1 1.1M11.9 11.9 13 13M3 13l1.1-1.1M11.9 4.1 13 3" />
              </g>
            </svg>
          )}
        </span>
      </span>
    </button>
  )
}
