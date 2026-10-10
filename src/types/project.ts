/** Направление проекта. По нему работают фильтр и будущие страницы /frontend, /infrastructure, /ai. */
export type ProjectCategory = 'frontend' | 'infrastructure' | 'ai' | 'docs'

/** Тип проекта — указываем, только если он известен. */
export type ProjectKind = 'commercial' | 'educational'

/** Состояние самого проекта (не путать с публикацией на сайте). */
export type ProjectStatus = 'in-development' | 'completed'

/**
 * Публикация на сайте: draft-проекты не показываются в интерфейсе и не открываются по ссылке.
 * Внимание: данные draft-проектов всё равно попадают в сборку — не храните в них секреты.
 */
export type PublicationStatus = 'draft' | 'published'

/** Простой текстовый блок кейса: абзацы и/или маркированный список. */
export interface TextBlock {
  paragraphs?: string[]
  items?: string[]
}

/** Техническое решение и его причина. */
export interface Decision {
  title: string
  reason: string
}

export interface ProjectLink {
  label: string
  url: string
}

export interface ProjectImage {
  /** Путь от папки public, например "/projects/vinc/calendar.webp". */
  src: string
  /** Содержательное описание изображения. */
  alt: string
  width: number
  height: number
  caption?: string
}

/** Оригинальные схемы, которые нарисованы компонентами (см. src/components/Diagrams). */
export type DiagramId = 'vivoai-flow' | 'office-network'

/** Разделы подробного кейса. Любой раздел можно не заполнять — тогда он не выводится. */
export interface ProjectCase {
  context?: TextBlock
  constraints?: TextBlock
  work?: TextBlock
  decisions?: Decision[]
  result?: TextBlock
  limitations?: TextBlock
}

export interface Project {
  slug: string
  title: string
  /** Кратко: задача и мой вклад. Используется в карточке и в начале кейса. */
  summary: string
  categories: ProjectCategory[]
  /** Технологии в порядке важности: в карточке показываются первые несколько. */
  stack: string[]
  /** Приоритетный проект — выводится раньше остальных. */
  featured: boolean
  publicationStatus: PublicationStatus
  kind?: ProjectKind
  projectStatus?: ProjectStatus
  role?: string
  case?: ProjectCase
  diagram?: DiagramId
  links?: ProjectLink[]
  images?: ProjectImage[]
}
