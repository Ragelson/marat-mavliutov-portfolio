/**
 * Профиль и контакты — единственное место, где они хранятся.
 * Необязательные контакты не заполняйте, пока они неизвестны: пустые поля не выводятся на сайте.
 */
export interface Contacts {
  github: string
  /** Полный адрес, например "name@example.com". */
  email?: string
  /** Ссылка вида "https://t.me/username". */
  telegram?: string
  linkedin?: string
}

/** Короткие факты о работе для первого экрана. Пустые поля не выводятся. */
export interface Availability {
  status?: string
  format?: string
  timezone?: string
  languages?: string
}

export interface SiteConfig {
  name: string
  /** Публичный ник: небольшая дополнительная подпись, не замена имени. */
  handle: string
  location: string
  headline: string
  intro: string
  /** Описание для meta description и Open Graph. */
  description: string
  /**
   * Адрес опубликованного сайта без завершающего слэша. Нужен для canonical, og:url и sitemap.xml.
   * При переезде на свой домен поменяйте его здесь.
   */
  url?: string
  availability: Availability
  contacts: Contacts
}

export const site: SiteConfig = {
  name: 'Марат Мавлютов',
  handle: 'Ragelson',
  location: 'Астана, Казахстан',
  headline: 'Инженер AI-инфраструктуры и безопасности',
  intro:
    'Строю и сопровождаю on-prem ИИ-инфраструктуру и сети: от сервера инференса и агентного Pipe до VPN и Telegram-ботов. Работаю через Claude Code: задачу ставлю и результат проверяю сам, решения о доступах и данных принимаю сам.',
  description:
    'Марат Мавлютов — портфолио: on-prem ИИ-инфраструктура (vLLM, Open WebUI, PostgreSQL), Linux и Docker, сети и безопасность, Telegram-боты.',
  url: 'https://ragelson.github.io/marat-mavliutov-portfolio',
  availability: {
    status: 'Открыт к предложениям',
    format: 'Полностью удалённо, полная занятость',
    timezone: 'UTC+5',
    languages: 'Русский — родной · Английский — B1',
  },
  contacts: {
    github: 'https://github.com/Ragelson',
    email: 'hallblur@gmail.com',
  },
}
