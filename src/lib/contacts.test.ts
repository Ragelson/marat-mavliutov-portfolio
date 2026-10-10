import { describe, expect, it } from 'vitest'
import { getContactLinks } from './contacts.ts'

describe('getContactLinks', () => {
  it('показывает только заполненные контакты', () => {
    const links = getContactLinks({ github: 'https://github.com/Ragelson', email: '', telegram: '   ' })
    expect(links).toHaveLength(1)
    expect(links[0]).toMatchObject({ label: 'GitHub', href: 'https://github.com/Ragelson' })
  })

  it('делает из почты ссылку mailto', () => {
    const links = getContactLinks({ github: 'https://github.com/Ragelson', email: 'name@example.com' })
    expect(links.map((link) => link.href)).toEqual(['mailto:name@example.com', 'https://github.com/Ragelson'])
  })
})
