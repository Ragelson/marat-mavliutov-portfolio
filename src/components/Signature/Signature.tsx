import { site } from '../../config/site.ts'
import styles from './Signature.module.css'

/** Последняя строка страницы вместо подвала: «$ exit» с годом и подписями. */
export function Signature() {
  const year = new Date().getFullYear()

  return (
    <p className={styles.signature}>
      <span className={styles.command} aria-hidden="true">
        $ exit
      </span>
      <span>
        © {year} {site.name}
      </span>
      <span>{site.handle}</span>
      <span>{site.location}</span>
      <span className={styles.note}>Сайт на React и TypeScript</span>
    </p>
  )
}
