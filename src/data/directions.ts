import type { ProjectCategory } from '../types/project.ts'

export interface Direction {
  /** Связь с категорией: по ней под направлением выводятся подтверждающие проекты. */
  category: ProjectCategory
  title: string
  text: string
}

export const directions: Direction[] = [
  {
    category: 'frontend',
    title: 'Веб-разработка',
    text: 'Интерфейсы на JavaScript, интеграция с REST API, адаптивная вёрстка, доработка сайтов на 1С-Битрикс.',
  },
  {
    category: 'infrastructure',
    title: 'Инфраструктура и сети',
    text: 'Linux, OpenWrt, WireGuard, маршрутизация и документирование развёртывания.',
  },
  {
    category: 'ai',
    title: 'Локальные ИИ-системы',
    text: 'Развёртывание моделей, подключение структурированных данных и внешних инструментов.',
  },
]
