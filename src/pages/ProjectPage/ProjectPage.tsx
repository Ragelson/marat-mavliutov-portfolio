import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { Arrow } from '../../components/Arrow/Arrow.tsx'
import { CaseSection, TextBlockView } from '../../components/CaseSection/CaseSection.tsx'
import { ProjectDiagram } from '../../components/Diagrams/ProjectDiagram.tsx'
import { ExternalLink } from '../../components/ExternalLink/ExternalLink.tsx'
import { categoryLabels } from '../../data/categories.ts'
import { useDocumentMeta } from '../../hooks/useDocumentMeta.ts'
import {
  getNextPublishedProject,
  getProjectPath,
  getPublishedProjectBySlug,
  hasText,
  projectKindLabels,
  projectStatusLabels,
} from '../../lib/projects.ts'
import { publicUrl } from '../../lib/publicUrl.ts'
import { getVisualSurface } from '../../lib/surfaces.ts'
import type { Project, ProjectImage } from '../../types/project.ts'
import { NotFoundPage } from '../NotFoundPage/NotFoundPage.tsx'
import styles from './ProjectPage.module.css'

const backToWork = { pathname: '/', hash: '#work' }

export function ProjectPage() {
  const { slug = '' } = useParams()
  const project = getPublishedProjectBySlug(slug)

  // Неизвестный slug, draft и listed-проект выглядят одинаково — как 404
  if (!project) return <NotFoundPage />

  // key сбрасывает состояние страницы при переходе между кейсами
  return <ProjectCase key={project.slug} project={project} />
}

function CaseImage({ image, eager = false }: { image: ProjectImage; eager?: boolean }) {
  return (
    <figure className={styles.figure}>
      <img
        src={publicUrl(image.src)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
      />
      {image.caption && <figcaption className="label">{image.caption}</figcaption>}
    </figure>
  )
}

function ProjectCase({ project }: { project: Project }) {
  useDocumentMeta({ title: project.title, description: project.summary, path: getProjectPath(project.slug) })

  const details = project.case ?? {}
  const [mainImage, ...moreImages] = project.images ?? []
  const next = getNextPublishedProject(project.slug)

  const facts = [
    { label: 'Направление', value: project.categories.map((category) => categoryLabels[category]).join(', ') },
    { label: 'Тип', value: project.kind && projectKindLabels[project.kind] },
    { label: 'Статус', value: project.projectStatus && projectStatusLabels[project.projectStatus] },
    { label: 'Роль', value: project.role },
    { label: 'Стек', value: project.stack.join(' / ') },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value))

  // Только заполненные разделы; нумерация идёт подряд
  const sections: { title: string; tone?: 'callout' | 'aside'; content: ReactNode }[] = []
  if (hasText(details.context)) sections.push({ title: 'Задача', content: <TextBlockView block={details.context} /> })
  if (hasText(details.constraints))
    sections.push({ title: 'Условия и ограничения', content: <TextBlockView block={details.constraints} /> })
  if (hasText(details.work)) sections.push({ title: 'Что сделано', content: <TextBlockView block={details.work} /> })
  if (details.decisions && details.decisions.length > 0) {
    sections.push({
      title: 'Решения',
      content: (
        <ol className={styles.decisions}>
          {details.decisions.map((decision) => (
            <li key={decision.title}>
              <h3 className={styles.decisionTitle}>{decision.title}</h3>
              <p>{decision.reason}</p>
            </li>
          ))}
        </ol>
      ),
    })
  }
  if (hasText(details.result))
    sections.push({ title: 'Результат', tone: 'callout', content: <TextBlockView block={details.result} /> })
  if (hasText(details.limitations))
    sections.push({ title: 'Ограничения решения', tone: 'aside', content: <TextBlockView block={details.limitations} /> })
  if (moreImages.length > 0)
    sections.push({
      title: 'Материалы',
      content: moreImages.map((image) => <CaseImage key={image.src} image={image} />),
    })
  if (project.links && project.links.length > 0) {
    sections.push({
      title: 'Ссылки',
      content: (
        <ul className={styles.links}>
          {project.links.map((link) => (
            <li key={link.url}>
              <ExternalLink href={link.url} className="arrow-link">
                {link.label}
                <Arrow direction="up-right" />
              </ExternalLink>
            </li>
          ))}
        </ul>
      ),
    })
  }

  const visualSurface = mainImage ? 'surface-base' : getVisualSurface(project.diagram)

  return (
    <article className={styles.page}>
      <header className={`container ${styles.header}`}>
        <Link to={backToWork} className={`arrow-link ${styles.back}`}>
          <Arrow direction="left" />
          Все работы
        </Link>
        <p className="label">{[project.workType, ...project.categories.map((c) => categoryLabels[c])].filter(Boolean).join(' · ')}</p>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.lead}>{project.summary}</p>
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className="label">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {(mainImage || project.diagram) && (
        <div className={`${visualSurface} ${styles.visualBand}`}>
          <div className="container">
            {mainImage ? <CaseImage image={mainImage} eager /> : project.diagram && <ProjectDiagram id={project.diagram} />}
          </div>
        </div>
      )}

      <div className={`container ${styles.sections}`}>
        {sections.map((section, index) => (
          <CaseSection key={section.title} number={index + 1} title={section.title} tone={section.tone}>
            {section.content}
          </CaseSection>
        ))}
      </div>

      <nav className={`surface-inverse ${styles.next}`} aria-label="Другие кейсы">
        <div className={`container ${styles.nextInner}`}>
          {next && (
            <Link to={getProjectPath(next.slug)} className={styles.nextLink}>
              <span className="label">Следующая работа</span>
              <span className={styles.nextTitle}>
                {next.title}
                <Arrow />
              </span>
            </Link>
          )}
          <Link to={backToWork} className="arrow-link">
            Все работы
            <Arrow />
          </Link>
        </div>
      </nav>
    </article>
  )
}
