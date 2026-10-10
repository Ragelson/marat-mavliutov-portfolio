import { Link, useParams } from 'react-router'
import { CaseSection, TextBlockView } from '../../components/CaseSection/CaseSection.tsx'
import { ProjectDiagram } from '../../components/Diagrams/ProjectDiagram.tsx'
import { ExternalLink } from '../../components/ExternalLink/ExternalLink.tsx'
import { TagList } from '../../components/TagList/TagList.tsx'
import { categoryLabels } from '../../data/categories.ts'
import { useDocumentMeta } from '../../hooks/useDocumentMeta.ts'
import {
  getProjectPath,
  getPublishedProjectBySlug,
  hasText,
  projectKindLabels,
  projectStatusLabels,
} from '../../lib/projects.ts'
import type { Project } from '../../types/project.ts'
import { NotFoundPage } from '../NotFoundPage/NotFoundPage.tsx'
import styles from './ProjectPage.module.css'

const backToProjects = { pathname: '/', hash: '#projects' }

export function ProjectPage() {
  const { slug = '' } = useParams()
  const project = getPublishedProjectBySlug(slug)

  // Неизвестный slug и draft-проект выглядят одинаково — как 404
  if (!project) return <NotFoundPage />

  // key сбрасывает состояние страницы при переходе между кейсами
  return <ProjectCase key={project.slug} project={project} />
}

function ProjectCase({ project }: { project: Project }) {
  useDocumentMeta({ title: project.title, description: project.summary, path: getProjectPath(project.slug) })

  const details = project.case ?? {}
  const facts = [
    { label: 'Направление', value: project.categories.map((category) => categoryLabels[category]).join(', ') },
    { label: 'Тип', value: project.kind && projectKindLabels[project.kind] },
    { label: 'Статус', value: project.projectStatus && projectStatusLabels[project.projectStatus] },
    { label: 'Роль', value: project.role },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value))

  return (
    <article className={`container ${styles.page}`}>
      <Link to={backToProjects} className={styles.back}>
        <span aria-hidden="true">← </span>Все проекты
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.summary}>{project.summary}</p>
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <TagList items={project.stack} label="Технологии" />
      </header>

      <div className={styles.sections}>
        {hasText(details.context) && (
          <CaseSection title="Контекст и задача">
            <TextBlockView block={details.context} />
          </CaseSection>
        )}

        {hasText(details.constraints) && (
          <CaseSection title="Условия и ограничения">
            <TextBlockView block={details.constraints} />
          </CaseSection>
        )}

        {hasText(details.work) && (
          <CaseSection title="Что сделал">
            <TextBlockView block={details.work} />
          </CaseSection>
        )}

        {project.diagram && (
          <CaseSection title="Схема">
            <ProjectDiagram id={project.diagram} />
          </CaseSection>
        )}

        {details.decisions && details.decisions.length > 0 && (
          <CaseSection title="Технические решения">
            <dl className={styles.decisions}>
              {details.decisions.map((decision) => (
                <div key={decision.title} className={styles.decision}>
                  <dt>{decision.title}</dt>
                  <dd>{decision.reason}</dd>
                </div>
              ))}
            </dl>
          </CaseSection>
        )}

        {hasText(details.result) && (
          <CaseSection title="Результат">
            <TextBlockView block={details.result} />
          </CaseSection>
        )}

        {hasText(details.limitations) && (
          <CaseSection title="Ограничения решения">
            <TextBlockView block={details.limitations} />
          </CaseSection>
        )}

        {project.images && project.images.length > 0 && (
          <CaseSection title="Изображения">
            {project.images.map((image) => (
              <figure key={image.src} className={styles.image}>
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
                {image.caption && <figcaption>{image.caption}</figcaption>}
              </figure>
            ))}
          </CaseSection>
        )}

        {project.links && project.links.length > 0 && (
          <CaseSection title="Ссылки">
            <ul className={styles.links}>
              {project.links.map((link) => (
                <li key={link.url}>
                  <ExternalLink href={link.url}>{link.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </CaseSection>
        )}
      </div>

      <Link to={backToProjects} className="button">
        <span aria-hidden="true">← </span>Вернуться к проектам
      </Link>
    </article>
  )
}
