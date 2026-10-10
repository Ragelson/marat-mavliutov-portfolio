import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { projects } from '../../data/projects.ts'
import { renderApp } from '../../test/renderApp.tsx'

function projectTitles() {
  const section = screen.getByRole('region', { name: 'Проекты' })
  return within(section)
    .getAllByRole('heading', { level: 3 })
    .map((heading) => heading.textContent)
}

describe('главная страница', () => {
  it('показывает только опубликованные проекты', () => {
    renderApp('/')
    const published = projects.filter((p) => p.publicationStatus === 'published').map((p) => p.title)
    const drafts = projects.filter((p) => p.publicationStatus === 'draft').map((p) => p.title)

    expect(projectTitles()).toEqual(expect.arrayContaining(published))
    expect(projectTitles()).toHaveLength(published.length)
    for (const title of drafts) {
      expect(screen.queryByText(title)).not.toBeInTheDocument()
    }
  })

  it('фильтрует проекты по категории', async () => {
    const { user } = renderApp('/')
    const allButton = screen.getByRole('button', { name: 'Все' })
    const infraButton = screen.getByRole('button', { name: 'Инфраструктура' })
    expect(allButton).toHaveAttribute('aria-pressed', 'true')

    await user.click(infraButton)
    expect(infraButton).toHaveAttribute('aria-pressed', 'true')
    expect(allButton).toHaveAttribute('aria-pressed', 'false')
    expect(projectTitles()).toEqual(['Межофисная сеть'])

    await user.click(allButton)
    expect(projectTitles().length).toBeGreaterThan(1)
  })

  it('не показывает фильтр для категории без опубликованных проектов', () => {
    renderApp('/')
    expect(screen.queryByRole('button', { name: 'Документация' })).not.toBeInTheDocument()
  })

  it('не содержит пустых ссылок и показывает только настроенные контакты', () => {
    renderApp('/')
    for (const link of screen.getAllByRole('link')) {
      const href = link.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).not.toBe('#')
    }
    const contacts = screen.getByRole('region', { name: 'Контакты' })
    const contactLinks = within(contacts).getAllByRole('link')
    expect(contactLinks).toHaveLength(1)
    expect(contactLinks[0]).toHaveAccessibleName(/GitHub/)
    expect(within(contacts).queryByRole('link', { name: /почт|Telegram|LinkedIn/i })).not.toBeInTheDocument()
  })
})
