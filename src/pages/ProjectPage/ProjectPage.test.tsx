import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../../test/renderApp.tsx'

describe('страница кейса', () => {
  it('открывает опубликованный кейс', () => {
    renderApp('/projects/vivoai')
    expect(screen.getByRole('heading', { level: 1, name: 'VivoAI' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Что сделал' })).toBeInTheDocument()
    expect(document.title).toBe('VivoAI — Марат Мавлютов')
  })

  it('показывает 404 для неизвестного slug', () => {
    renderApp('/projects/unknown-project')
    expect(screen.getByRole('heading', { level: 1, name: 'Страница не найдена' })).toBeInTheDocument()
  })

  it('показывает 404 для draft-проекта', () => {
    renderApp('/projects/vivocomp')
    expect(screen.getByRole('heading', { level: 1, name: 'Страница не найдена' })).toBeInTheDocument()
    expect(screen.queryByText('Vivocomp')).not.toBeInTheDocument()
  })

  it('показывает 404 для неизвестного маршрута', () => {
    renderApp('/frontend')
    expect(screen.getByRole('heading', { level: 1, name: 'Страница не найдена' })).toBeInTheDocument()
  })
})
