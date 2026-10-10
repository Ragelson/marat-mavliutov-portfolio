import { Link } from 'react-router'
import { site } from '../../config/site.ts'
import { useDocumentMeta } from '../../hooks/useDocumentMeta.ts'
import { ContactsSection } from './ContactsSection.tsx'
import { DirectionsSection } from './DirectionsSection.tsx'
import styles from './HomePage.module.css'
import { ProjectsSection } from './ProjectsSection.tsx'

export function HomePage() {
  useDocumentMeta({ path: '/' })

  return (
    <>
      <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
        <h1 id="hero-title" className={styles.name}>
          {site.name}
        </h1>
        <p className={styles.headline}>{site.headline}</p>
        <p className={styles.intro}>{site.intro}</p>
        <div className={styles.actions}>
          <Link to={{ hash: '#projects' }} className="button button-primary">
            Посмотреть проекты
          </Link>
          <Link to={{ hash: '#contacts' }} className="button">
            Контакты
          </Link>
        </div>
        <p className={styles.location}>{site.location}</p>
      </section>

      <ProjectsSection />
      <DirectionsSection />

      <section id="about" tabIndex={-1} className={`container ${styles.section}`} aria-labelledby="about-title">
        <div className={styles.sectionHeader}>
          <h2 id="about-title" className={styles.sectionTitle}>
            Обо мне
          </h2>
        </div>
        <div className={styles.prose}>
          <p>
            Мне интересны задачи, в которых недостаточно написать один компонент — нужно понять, как работает система
            целиком. Поэтому мой опыт включает веб-разработку, сети и локальные ИИ-сервисы.
          </p>
          <p>
            В работе стараюсь оставлять не только действующее решение, но и понятную структуру, описание ограничений и
            документацию для тех, кто будет его поддерживать.
          </p>
        </div>
      </section>

      <ContactsSection />
    </>
  )
}
