import { Link } from 'react-router'
import { Arrow } from '../../components/Arrow/Arrow.tsx'
import { useDocumentMeta } from '../../hooks/useDocumentMeta.ts'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  useDocumentMeta({ title: 'Страница не найдена' })

  return (
    <div className={`container ${styles.page}`}>
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.text}>Возможно, адрес изменился или такой страницы никогда не было.</p>
      <div className={styles.actions}>
        <Link to="/" className="arrow-link">
          На главную
          <Arrow />
        </Link>
        <Link to={{ pathname: '/', hash: '#work' }} className="arrow-link">
          К работам
          <Arrow />
        </Link>
      </div>
    </div>
  )
}
