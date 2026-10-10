import { categoryOrder } from '../data/categories.ts'
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

/** Только опубликованные проекты; приоритетные — первыми, остальные сохраняют порядок из данных. */
export function getPublishedProjects(source: Project[] = allProjects): Project[] {
  const published = source.filter((project) => project.publicationStatus === 'published')
  return [...published.filter((p) => p.featured), ...published.filter((p) => !p.featured)]
}

/** Возвращает опубликованный проект или undefined — для draft и неизвестных slug одинаково. */
export function getPublishedProjectBySlug(slug: string, source: Project[] = allProjects): Project | undefined {
  return getPublishedProjects(source).find((project) => project.slug === slug)
}

/** Категории, в которых есть хотя бы один проект, в порядке из categoryOrder. */
export function getAvailableCategories(projects: Project[]): ProjectCategory[] {
  return categoryOrder.filter((category) => projects.some((project) => project.categories.includes(category)))
}

export function filterByCategory(projects: Project[], category: ProjectCategory | 'all'): Project[] {
  if (category === 'all') return projects
  return projects.filter((project) => project.categories.includes(category))
}

export function getProjectPath(slug: string): string {
  return `/projects/${slug}`
}

/** Есть ли в блоке текст. Пустые разделы кейса не выводятся. */
export function hasText(block: TextBlock | undefined): block is TextBlock {
  return Boolean(block && ((block.paragraphs?.length ?? 0) > 0 || (block.items?.length ?? 0) > 0))
}
