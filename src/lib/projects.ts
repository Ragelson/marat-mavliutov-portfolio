import { projects as allProjects } from '../data/projects.ts'
import type { Project, ProjectCategory, ProjectKind, ProjectStatus, TextBlock } from '../types/project.ts'

export const projectStatusLabels: Record<ProjectStatus, string> = {
  'in-development': 'В разработке',
  completed: 'Завершён',
}

export const projectKindLabels: Record<ProjectKind, string> = {
  commercial: 'Коммерческий проект',
  educational: 'Учебный проект',
}

/** Проекты со страницей кейса: только published, в порядке из данных. */
export function getPublishedProjects(source: Project[] = allProjects): Project[] {
  return source.filter((project) => project.publicationStatus === 'published')
}

/** Избранные проекты — отдельные крупные композиции на главной. */
export function getFeaturedProjects(source: Project[] = allProjects): Project[] {
  return getPublishedProjects(source).filter((project) => project.featured)
}

/** «Другие работы»: опубликованные неизбранные и listed-проекты. Draft сюда не попадает. */
export function getOtherProjects(source: Project[] = allProjects): Project[] {
  return source.filter(
    (project) =>
      project.publicationStatus === 'listed' || (project.publicationStatus === 'published' && !project.featured),
  )
}

/** Возвращает проект со страницей кейса или undefined — для draft, listed и неизвестных slug одинаково. */
export function getPublishedProjectBySlug(slug: string, source: Project[] = allProjects): Project | undefined {
  return getPublishedProjects(source).find((project) => project.slug === slug)
}

/** Следующий опубликованный кейс по кругу — для перехода в конце страницы кейса. */
export function getNextPublishedProject(slug: string, source: Project[] = allProjects): Project | undefined {
  const published = getPublishedProjects(source)
  if (published.length < 2) return undefined
  const index = published.findIndex((project) => project.slug === slug)
  return published[(index + 1) % published.length]
}

/** Пригодится для будущих страниц /frontend, /infrastructure, /ai. */
export function filterByCategory(projects: Project[], category: ProjectCategory): Project[] {
  return projects.filter((project) => project.categories.includes(category))
}

export function getProjectPath(slug: string): string {
  return `/projects/${slug}`
}

/** Есть ли в блоке текст. Пустые разделы кейса не выводятся. */
export function hasText(block: TextBlock | undefined): block is TextBlock {
  return Boolean(block && ((block.paragraphs?.length ?? 0) > 0 || (block.items?.length ?? 0) > 0))
}
