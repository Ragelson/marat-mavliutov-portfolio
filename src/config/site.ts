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
  contacts: Contacts
}

export const site: SiteConfig = {
  name: 'Марат Мавлютов',
  handle: 'delure',
  location: 'Уфа, Россия',
  headline: 'Разработка, инфраструктура и ИИ-интеграции',
  intro:
    'Создаю веб-интерфейсы, разворачиваю локальные ИИ-сервисы и настраиваю сети. Работаю на стыке направлений: от пользовательского интерфейса и данных до серверного окружения и документации.',
  description:
    'Марат Мавлютов — портфолио: веб-интерфейсы, сети и инфраструктура, локальные ИИ-системы и интеграции.',
  url: 'https://ragelson.github.io/marat-mavliutov-portfolio',
  contacts: {
    github: 'https://github.com/Ragelson',
  },
}
