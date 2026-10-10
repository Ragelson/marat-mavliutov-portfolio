import type { ProjectCategory } from '../types/project.ts'

/** Подписи категорий. Порядок ключей задаёт порядок кнопок фильтра. */
export const categoryLabels: Record<ProjectCategory, string> = {
  frontend: 'Frontend',
  infrastructure: 'Инфраструктура',
  ai: 'ИИ-системы',
  docs: 'Документация',
}

export const categoryOrder = Object.keys(categoryLabels) as ProjectCategory[]
