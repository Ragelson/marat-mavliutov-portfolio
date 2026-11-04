import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { Arrow } from '../../components/Arrow/Arrow.tsx'
import { site } from '../../config/site.ts'
import { categoryLabels } from '../../data/categories.ts'
import { directions } from '../../data/directions.ts'
import { getFeaturedProjects, getProjectPath } from '../../lib/projects.ts'
import styles from './Hero.module.css'

const featured = getFeaturedProjects()
const [firstName, lastName] = site.name.split(' ')

/** Факты о работе: выводятся только заполненные (см. Availability в src/config/site.ts). */
const facts = [
  { label: 'Статус', value: site.availability.status },
  { label: 'Формат', value: site.availability.format },
  { label: 'Часовой пояс', value: site.availability.timezone },
  { label: 'Языки', value: site.availability.languages },
].filter((fact): fact is { label: string; value: string } => Boolean(fact.value))

/** Очередь появления элемента первого экрана (см. .intro-item в globals.css). */
const order = (i: number) => ({ '--i': i }) as CSSProperties

export function Hero() {
  return (
    <section className={`surface-base ${styles.hero}`} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <p className={`label intro-item ${styles.kicker}`} style={order(0)}>
          {site.headline} · {site.location}
        </p>

        <h1 id="hero-title" className={`intro-item ${styles.name}`} style={order(1)}>
          <span className={styles.first}>{firstName}</span>{' '}
          <span className={styles.last}>{lastName}</span>
        </h1>

        <ul className={`intro-item ${styles.directions}`} style={order(2)} aria-label="Направления">
          {directions.map((direction, index) => (
            <li key={direction}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {direction}
            </li>
          ))}
        </ul>

        <div className={`intro-item ${styles.lead}`} style={order(3)}>
          <p className={styles.intro}>{site.intro}</p>
          {facts.length > 0 && (
            <dl className={styles.facts}>
              {facts.map((fact) => (
                <div key={fact.label} className={styles.fact}>
                  <dt className="label">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <Link to={{ hash: '#work' }} className={`intro-item ${styles.cta}`} style={order(4)}>
          <span>Смотреть работы</span>
          <Arrow direction="down-right" />
        </Link>

        <nav className={`intro-item ${styles.index}`} style={order(5)} aria-label="Избранные работы">
          <p className="label">Избранное</p>
          <ol className={styles.indexList}>
            {featured.map((project, index) => (
              <li key={project.slug}>
                <Link to={getProjectPath(project.slug)} className={styles.indexLink}>
                  <span className={styles.number} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.indexTitle}>{project.title}</span>
                  <span className={styles.indexMeta}>{project.categories.map((c) => categoryLabels[c]).join(', ')}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}
