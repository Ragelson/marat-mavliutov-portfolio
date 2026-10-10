import { Link } from 'react-router'
import { Arrow } from '../../components/Arrow/Arrow.tsx'
import { ProjectDiagram } from '../../components/Diagrams/ProjectDiagram.tsx'
import { ExternalLink } from '../../components/ExternalLink/ExternalLink.tsx'
import { categoryLabels } from '../../data/categories.ts'
import { getProjectPath, projectStatusLabels } from '../../lib/projects.ts'
import { publicUrl } from '../../lib/publicUrl.ts'
import { getVisualSurface } from '../../lib/surfaces.ts'
import type { Project } from '../../types/project.ts'
import styles from './FeaturedProject.module.css'

interface FeaturedProjectProps {
  project: Project
  number: number
  total: number
}

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Избранный проект — самостоятельная композиция, а не карточка.
 * Главный визуальный материал: реальное изображение, если оно есть, иначе схема проекта.
 * От вида материала зависит раскладка (data-variant), от схемы — фон (getVisualSurface).
 */
export function FeaturedProject({ project, number, total }: FeaturedProjectProps) {
  const path = getProjectPath(project.slug)
  const image = project.images?.[0]
  const variant = image ? 'media' : (project.diagram ?? 'text')
  // Фон зависит от схемы; у композиции с реальным изображением фон обычный
  const surface = image ? 'surface-base' : getVisualSurface(project.diagram)
  const titleId = `project-${project.slug}-title`
  const meta = [project.workType, ...project.categories.map((category) => categoryLabels[category])]

  return (
    <article className={`${surface} ${styles.feature}`} data-variant={variant} aria-labelledby={titleId}>
      <div className={`container scroll-reveal ${styles.grid}`}>
        <header className={styles.head}>
          <p className="label">
            <span className={styles.counter}>
              {pad(number)} / {pad(total)}
            </span>{' '}
            · {meta.filter(Boolean).join(' · ')}
          </p>
          <h3 id={titleId} className={styles.title}>
            <Link to={path}>{project.title}</Link>
          </h3>
          {project.projectStatus && <p className={styles.status}>{projectStatusLabels[project.projectStatus]}</p>}
        </header>

        <div className={styles.body}>
          <p className={styles.summary}>{project.summary}</p>
          {project.role && (
            <p className={styles.role}>
              <span className="label">Роль</span> {project.role}
            </p>
          )}
          {project.highlights && project.highlights.length > 0 && (
            <ul className={styles.highlights}>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          <div className={styles.links}>
            {/* Имя ссылки начинается с видимого текста и уточняет, какой кейс откроется */}
            <Link to={path} className={`arrow-link ${styles.caseLink}`} aria-label={`Разобрать кейс: ${project.title}`}>
              Разобрать кейс
              <Arrow />
            </Link>
            {project.links?.map((link) => (
              <ExternalLink key={link.url} href={link.url} className={styles.external}>
                {link.label} <span aria-hidden="true">↗</span>
              </ExternalLink>
            ))}
          </div>
        </div>

        {(image || project.diagram) && (
          <div className={styles.visual}>
            {image ? (
              <figure className={styles.media}>
                <div className={styles.frame}>
                  <img
                    src={publicUrl(image.src)}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                  />
                </div>
                {image.caption && <figcaption className="label">{image.caption}</figcaption>}
              </figure>
            ) : (
              project.diagram && <ProjectDiagram id={project.diagram} />
            )}
          </div>
        )}
      </div>
    </article>
  )
}
