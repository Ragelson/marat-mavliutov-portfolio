import { Link } from 'react-router'
import { ExternalLink } from '../../components/ExternalLink/ExternalLink.tsx'
import { categoryLabels } from '../../data/categories.ts'
import { getProjectPath, projectKindLabels } from '../../lib/projects.ts'
import type { Project } from '../../types/project.ts'
import styles from './OtherProjects.module.css'

interface OtherProjectsProps {
  projects: Project[]
  startNumber: number
}

/** Компактный список: тип работы, вклад и только существующие ссылки. Страница кейса — только у published. */
export function OtherProjects({ projects, startNumber }: OtherProjectsProps) {
  return (
    <div className={`container scroll-reveal ${styles.wrapper}`}>
      <h3 className={styles.heading}>Другие работы</h3>
      <ul className={styles.list}>
        {projects.map((project, index) => {
          const workType = project.workType ?? project.categories.map((c) => categoryLabels[c]).join(', ')
          return (
            <li key={project.slug} className={styles.item}>
              <span className={styles.number} aria-hidden="true">
                {String(startNumber + index).padStart(2, '0')}
              </span>
              <div className={styles.titleBlock}>
                <h4 className={styles.title}>
                  {project.publicationStatus === 'published' ? (
                    <Link to={getProjectPath(project.slug)}>{project.title}</Link>
                  ) : (
                    project.title
                  )}
                </h4>
                <p className="label">
                  {workType}
                  {project.kind && <span className={styles.kind}>{projectKindLabels[project.kind]}</span>}
                </p>
              </div>
              <p className={styles.summary}>{project.summary}</p>
              {project.links && project.links.length > 0 && (
                <p className={styles.links}>
                  {project.links.map((link) => (
                    <ExternalLink key={link.url} href={link.url}>
                      {link.label} <span aria-hidden="true">↗</span>
                    </ExternalLink>
                  ))}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
