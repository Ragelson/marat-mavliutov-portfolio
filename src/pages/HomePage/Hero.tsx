import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { Arrow } from '../../components/Arrow/Arrow.tsx'
import { AsciiScene } from '../../components/AsciiScene/AsciiScene.tsx'
import { site } from '../../config/site.ts'
import { categoryLabels } from '../../data/categories.ts'
import { directions } from '../../data/directions.ts'
import { getFeaturedProjects, getProjectPath } from '../../lib/projects.ts'
import styles from './Hero.module.css'

const featured = getFeaturedProjects()

/** Факты о работе: выводятся только заполненные (см. Availability в src/config/site.ts). */
const facts = [
  { label: 'Статус', value: site.availability.status },
  { label: 'Формат', value: site.availability.format },
  { label: 'Часовой пояс', value: site.availability.timezone },
  { label: 'Языки', value: site.availability.languages },
].filter((fact): fact is { label: string; value: string } => Boolean(fact.value))

/** Длина строки в символах — для анимации «печати» (ширина растёт по одному символу). */
const typing = (text: string, delay: number) => ({ '--chars': text.length, '--delay': `${delay}ms` }) as CSSProperties

/** Очередь появления остальных элементов первого экрана (см. .intro-item в globals.css). */
const order = (i: number) => ({ '--i': i }) as CSSProperties

export function Hero() {
  return (
    <section className={`surface-base ${styles.hero}`} aria-labelledby="hero-title">
      <div className={`container ${styles.terminal}`}>
        <p className="prompt" aria-hidden="true">
          whoami
        </p>
        {/* Полный текст всегда в DOM: «печать» — только визуальная обрезка по ширине */}
        <h1 id="hero-title" className={`glow ${styles.name}`}>
          <span className={styles.typed} style={typing(site.name, 150)}>
            {site.name}
          </span>
        </h1>
        <p className="prompt" aria-hidden="true">
          cat role.txt
        </p>
        <p className={styles.role}>
          <span className={styles.typed} style={typing(site.headline, 1300)}>
            {site.headline}
          </span>
          <span className={`cursor ${styles.cursor}`} aria-hidden="true" />
        </p>
        <p className={styles.location}>
          <span aria-hidden="true"># </span>
          {site.location}
        </p>
      </div>

      <AsciiScene />

      <div className={`container ${styles.grid}`}>
        <ul className={`intro-item ${styles.directions}`} style={order(0)} aria-label="Направления">
          {directions.map((direction) => (
            <li key={direction}>{direction}</li>
          ))}
        </ul>

        <div className={`intro-item ${styles.lead}`} style={order(1)}>
          <p className={styles.intro}>{site.intro}</p>
          {facts.length > 0 && (
            <dl className={styles.facts}>
              {facts.map((fact) => (
                <div key={fact.label} className={styles.fact}>
                  <dt>{fact.label}:</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <Link to={{ hash: '#work' }} className={`intro-item ${styles.cta}`} style={order(2)}>
          <span aria-hidden="true" className={styles.ctaPrompt}>
            &gt;
          </span>
          <span>Смотреть работы</span>
          <Arrow direction="down-right" />
        </Link>

        <nav className={`intro-item ${styles.index}`} style={order(3)} aria-label="Избранные работы">
          <p className="prompt" aria-hidden="true">
            ls ./featured
          </p>
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
