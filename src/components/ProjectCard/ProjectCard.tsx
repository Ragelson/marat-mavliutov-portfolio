import { Link } from 'react-router'
import { categoryLabels } from '../../data/categories.ts'
import { getProjectPath, projectKindLabels, projectStatusLabels } from '../../lib/projects.ts'
import type { Project } from '../../types/project.ts'
import { TagList } from '../TagList/TagList.tsx'
import styles from './ProjectCard.module.css'

const VISIBLE_STACK_ITEMS = 4

interface ProjectCardProps {
  project: Project
}

/**
 * Карточка не является ссылкой целиком: основной переход — ссылка в заголовке,
 * дополнительный — «Разобрать кейс» внизу.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const path = getProjectPath(project.slug)
  const meta = [
    ...project.categories.map((category) => categoryLabels[category]),
    project.kind && projectKindLabels[project.kind],
    project.projectStatus && projectStatusLabels[project.projectStatus],
  ].filter((value): value is string => Boolean(value))

  return (
    <article className={styles.card}>
      <p className={styles.meta}>{meta.join(' · ')}</p>
      <h3 className={styles.title}>
        <Link to={path}>{project.title}</Link>
      </h3>
      <p className={styles.summary}>{project.summary}</p>
      <TagList items={project.stack.slice(0, VISIBLE_STACK_ITEMS)} label="Ключевые технологии" />
      <Link to={path} className={styles.more}>
        Разобрать кейс<span className="visually-hidden">: {project.title}</span>
        <span aria-hidden="true"> →</span>
      </Link>
    </article>
  )
}
