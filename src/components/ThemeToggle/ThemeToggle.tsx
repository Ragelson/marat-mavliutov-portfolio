import { useTheme } from '../../hooks/useTheme.ts'
import styles from './ThemeToggle.module.css'

/**
 * Переключатель «[ night | day ]»: две кнопки с aria-pressed.
 * Выбранная тема выделена инверсией, а не только цветом. Логика темы — в useTheme.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const options = [
    { value: 'dark', label: 'night' },
    { value: 'light', label: 'day' },
  ] as const

  return (
    <div role="group" aria-label="Тема оформления" className={styles.toggle}>
      <span className={styles.bracket} aria-hidden="true">
        [
      </span>
      {options.map((option, index) => (
        <span key={option.value} className={styles.item}>
          {index > 0 && (
            <span className={styles.divider} aria-hidden="true">
              |
            </span>
          )}
          <button
            type="button"
            className={styles.option}
            aria-pressed={theme === option.value}
            onClick={() => {
              if (theme !== option.value) toggleTheme()
            }}
          >
            {option.label}
          </button>
        </span>
      ))}
      <span className={styles.bracket} aria-hidden="true">
        ]
      </span>
    </div>
  )
}
