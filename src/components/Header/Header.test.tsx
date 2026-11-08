import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../../test/renderApp.tsx'

describe('шапка', () => {
  it('переключатель темы меняет тему и сохраняет выбор', async () => {
    const { user } = renderApp('/')
    const night = screen.getByRole('button', { name: 'night' })
    const day = screen.getByRole('button', { name: 'day' })
    expect(day).toHaveAttribute('aria-pressed', 'true')
    expect(night).toHaveAttribute('aria-pressed', 'false')

    await user.click(night)
    expect(night).toHaveAttribute('aria-pressed', 'true')
    expect(day).toHaveAttribute('aria-pressed', 'false')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(window.localStorage.getItem('theme')).toBe('dark')
  })

  it('берёт сохранённую тему при загрузке', () => {
    window.localStorage.setItem('theme', 'dark')
    renderApp('/')
    expect(screen.getByRole('button', { name: 'night' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('мобильное меню закрывается по Escape и возвращает фокус на кнопку', async () => {
    const { user } = renderApp('/')
    const menuButton = screen.getByRole('button', { name: 'Меню' })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    await user.tab()
    expect(menuButton).not.toHaveFocus()
    await user.keyboard('{Escape}')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton).toHaveFocus()
  })

  it('ссылки навигации ведут на секции главной страницы', () => {
    renderApp('/projects/vivox')
    expect(screen.getByRole('link', { name: 'projects' })).toHaveAttribute('href', '/#work')
    expect(screen.getByRole('link', { name: 'agents' })).toHaveAttribute('href', '/#agents')
    expect(screen.getByRole('link', { name: 'about' })).toHaveAttribute('href', '/#about')
    expect(screen.getByRole('link', { name: 'contact' })).toHaveAttribute('href', '/#contacts')
  })
})
