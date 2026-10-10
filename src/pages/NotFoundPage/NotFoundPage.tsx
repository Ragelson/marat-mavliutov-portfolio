import { Link } from 'react-router'
import { useDocumentMeta } from '../../hooks/useDocumentMeta.ts'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  useDocumentMeta({ title: 'Страница не найдена', path: '/404' })

  return (
    <div className={`container ${styles.page}`}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.text}>Возможно, адрес изменился или такой страницы никогда не было.</p>
      <div className={styles.actions}>
        <Link to="/" className="button button-primary">
          На главную
        </Link>
        <Link to={{ pathname: '/', hash: '#projects' }} className="button">
          К проектам
        </Link>
      </div>
    </div>
  )
}
