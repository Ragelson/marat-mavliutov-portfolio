import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { projects } from '../../data/projects.ts'
import { renderApp } from '../../test/renderApp.tsx'

const byStatus = (status: string) => projects.filter((p) => p.publicationStatus === status)

describe('главная страница', () => {
  it('показывает избранные проекты отдельными композициями со ссылкой на кейс', () => {
    renderApp('/')
    const work = screen.getByRole('region', { name: 'Работы' })
    for (const project of byStatus('published').filter((p) => p.featured)) {
      const article = within(work).getByRole('article', { name: project.title })
      expect(within(article).getByRole('link', { name: `Разобрать кейс: ${project.title}` })).toHaveAttribute(
        'href',
        `/projects/${project.slug}`,
      )
    }
  })

  it('показывает listed-проекты в списке без ссылки на страницу кейса', () => {
    renderApp('/')
    const work = screen.getByRole('region', { name: 'Работы' })
    for (const project of byStatus('listed')) {
      expect(within(work).getByRole('heading', { level: 4, name: project.title })).toBeInTheDocument()
      expect(within(work).queryByRole('link', { name: project.title })).not.toBeInTheDocument()
    }
    expect(within(work).getByText('Учебный проект')).toBeInTheDocument()
  })

  it('не показывает draft-проекты', () => {
    renderApp('/')
    for (const project of byStatus('draft')) {
      expect(screen.queryByText(project.title)).not.toBeInTheDocument()
    }
  })

  it('не содержит пустых ссылок и показывает только настроенные контакты', () => {
    renderApp('/')
    for (const link of screen.getAllByRole('link')) {
      const href = link.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).not.toBe('#')
    }
    const contacts = screen.getByRole('region', { name: 'Есть задача? Обсудим.' })
    const contactLinks = within(contacts).getAllByRole('link')
    expect(contactLinks).toHaveLength(1)
    expect(contactLinks[0]).toHaveAccessibleName(/^GitHub/)
    expect(within(contacts).queryByRole('link', { name: /почт|Telegram|LinkedIn/i })).not.toBeInTheDocument()
  })
})
