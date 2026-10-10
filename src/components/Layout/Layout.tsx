import { useRef, type MouseEvent } from 'react'
import { Outlet } from 'react-router'
import { useRouteScroll } from '../../hooks/useRouteScroll.ts'
import { Footer } from '../Footer/Footer.tsx'
import { Header } from '../Header/Header.tsx'
import styles from './Layout.module.css'

/** Общий каркас всех страниц: ссылка пропуска, шапка, основное содержимое, подвал. */
export function Layout() {
  const mainRef = useRef<HTMLElement>(null)
  useRouteScroll(mainRef)

  // Обрабатываем сами, чтобы не добавлять #main в адрес и историю роутера
  const skipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    mainRef.current?.focus()
  }

  return (
    <div className={styles.layout}>
      <a href="#main" className={styles.skipLink} onClick={skipToContent}>
        Перейти к содержимому
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
