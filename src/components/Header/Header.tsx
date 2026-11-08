import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { site } from '../../config/site.ts'
import { ExternalLink } from '../ExternalLink/ExternalLink.tsx'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle.tsx'
import styles from './Header.module.css'

/** Команды-ссылки на секции главной страницы: работают с любой страницы сайта. */
const navItems = [
  { hash: '#work', label: 'projects' },
  { hash: '#agents', label: 'agents' },
  { hash: '#about', label: 'about' },
  { hash: '#contacts', label: 'contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Escape закрывает меню и возвращает фокус на кнопку
  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <span className={styles.brandPath} aria-hidden="true">
            ~/
          </span>
          {site.handle}
          <span className="visually-hidden"> — {site.name}, на главную</span>
        </Link>

        <nav aria-label="Основная навигация" className={styles.nav}>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={isMenuOpen}
            aria-controls="site-nav-list"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className={styles.menuIcon} aria-hidden="true" />
            Меню
          </button>
          <ul id="site-nav-list" className={styles.list} data-open={isMenuOpen}>
            {navItems.map((item) => (
              <li key={item.hash}>
                <Link to={{ pathname: '/', hash: item.hash }} className={styles.link} onClick={closeMenu}>
                  <span className={styles.chevron} aria-hidden="true">
                    &gt;{' '}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={styles.external}>
              <ExternalLink href={site.contacts.github} className={styles.link}>
                GitHub <span aria-hidden="true">↗</span>
              </ExternalLink>
            </li>
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  )
}
