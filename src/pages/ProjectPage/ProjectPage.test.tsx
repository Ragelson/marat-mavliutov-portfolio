import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../../test/renderApp.tsx'

describe('страница кейса', () => {
  it('открывает опубликованный кейс', () => {
    renderApp('/projects/vivox')
    expect(screen.getByRole('heading', { level: 1, name: 'VivoX' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /Что сделано/ })).toBeInTheDocument()
    expect(document.title).toBe('VivoX — Марат Мавлютов')
  })

  it('показывает 404 для неизвестного slug', () => {
    renderApp('/projects/unknown-project')
    expect(screen.getByRole('heading', { level: 1, name: 'Страница не найдена' })).toBeInTheDocument()
  })

  it('показывает 404 для проекта без страницы кейса', () => {
    renderApp('/projects/vivocomp')
    expect(screen.getByRole('heading', { level: 1, name: 'Страница не найдена' })).toBeInTheDocument()
    expect(screen.queryByText('Vivocomp')).not.toBeInTheDocument()
  })

  it('показывает подтверждённые показатели проекта', () => {
    renderApp('/projects/vivox')
    expect(screen.getByText('100+')).toBeInTheDocument()
    expect(screen.getByText('документов в базе')).toBeInTheDocument()
  })

  it('показывает 404 для неизвестного маршрута', () => {
    renderApp('/frontend')
    expect(screen.getByRole('heading', { level: 1, name: 'Страница не найдена' })).toBeInTheDocument()
  })
})
