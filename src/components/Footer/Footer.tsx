import { site } from '../../config/site.ts'
import { ExternalLink } from '../ExternalLink/ExternalLink.tsx'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {year} {site.name} <span className={styles.handle}>· {site.handle}</span>
        </p>
        <p>
          <ExternalLink href={site.contacts.github}>GitHub</ExternalLink>
        </p>
        <p className={styles.note}>Сайт на React и TypeScript</p>
      </div>
    </footer>
  )
}
