/** Направление проекта. По нему можно будет собрать страницы /frontend, /infrastructure, /ai. */
export type ProjectCategory = 'frontend' | 'infrastructure' | 'ai' | 'docs'

/** Тип проекта — указываем, только если он известен. */
export type ProjectKind = 'commercial' | 'educational'

/** Состояние самого проекта (не путать с публикацией на сайте). */
export type ProjectStatus = 'in-development' | 'completed'

/**
 * Публикация на сайте:
 * - published — карточка на главной и страница кейса /projects/<slug>;
 * - listed — строка в списке «Другие работы» на главной, без страницы кейса (материалов пока мало);
 * - draft — нигде не показывается.
 * Внимание: данные всех проектов попадают в сборку — не храните в них секреты.
 */
export type PublicationStatus = 'draft' | 'listed' | 'published'

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
export type DiagramId = 'vinc-architecture' | 'vivoai-flow' | 'office-network'

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
  /** Кратко: задача и мой вклад. Используется на главной и в начале кейса. */
  summary: string
  /** Тип работы одной фразой, например «Доработка сайта на 1С-Битрикс». */
  workType?: string
  /** 2–3 конкретных пункта для избранного проекта на главной. */
  highlights?: string[]
  categories: ProjectCategory[]
  /** Технологии в порядке важности. */
  stack: string[]
  /** Избранный проект: отдельная крупная композиция на главной (только для published). */
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
