import { Link } from 'react-router'
import { directions } from '../../data/directions.ts'
import { filterByCategory, getProjectPath, getPublishedProjects } from '../../lib/projects.ts'
import styles from './HomePage.module.css'

const publishedProjects = getPublishedProjects()

export function DirectionsSection() {
  return (
    <section id="directions" tabIndex={-1} className={`container ${styles.section}`} aria-labelledby="directions-title">
      <div className={styles.sectionHeader}>
        <h2 id="directions-title" className={styles.sectionTitle}>
          Направления
        </h2>
      </div>

      <ul className={styles.directionGrid}>
        {directions.map((direction) => {
          const related = filterByCategory(publishedProjects, direction.category)
          return (
            <li key={direction.category} className={styles.direction}>
              <h3 className={styles.directionTitle}>{direction.title}</h3>
              <p>{direction.text}</p>
              {related.length > 0 && (
                <p className={styles.related}>
                  Проекты:{' '}
                  {related.map((project, index) => (
                    <span key={project.slug}>
                      {index > 0 && ', '}
                      <Link to={getProjectPath(project.slug)}>{project.title}</Link>
                    </span>
                  ))}
                </p>
              )}
            </li>
          )
        })}
      </ul>

      <p className={styles.statement}>Документация и передача знаний — часть готового решения.</p>
    </section>
  )
}
