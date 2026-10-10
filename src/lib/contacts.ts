import type { Contacts } from '../config/site.ts'

export interface ContactLink {
  id: keyof Contacts
  /** Подпись кнопки: честно описывает, что откроется. */
  label: string
  /** Адрес в читаемом виде. */
  text: string
  href: string
  external: boolean
}

function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

/** Превращает конфиг в список ссылок. Пустые и незаполненные контакты пропускаются. */
export function getContactLinks(contacts: Contacts): ContactLink[] {
  const links: ContactLink[] = []
  const email = contacts.email?.trim()
  const telegram = contacts.telegram?.trim()
  const linkedin = contacts.linkedin?.trim()
  const github = contacts.github.trim()

  if (email) {
    links.push({ id: 'email', label: 'Написать на почту', text: email, href: `mailto:${email}`, external: false })
  }
  if (telegram) {
    links.push({ id: 'telegram', label: 'Telegram', text: stripProtocol(telegram), href: telegram, external: true })
  }
  if (github) {
    links.push({ id: 'github', label: 'GitHub', text: stripProtocol(github), href: github, external: true })
  }
  if (linkedin) {
    links.push({ id: 'linkedin', label: 'LinkedIn', text: stripProtocol(linkedin), href: linkedin, external: true })
  }
  return links
}
