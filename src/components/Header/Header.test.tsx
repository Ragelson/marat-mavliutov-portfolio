import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../../test/renderApp.tsx'

describe('шапка', () => {
  it('переключатель темы меняет тему и сохраняет выбор', async () => {
    const { user } = renderApp('/')
    const toggle = screen.getByRole('switch', { name: 'Тёмная тема' })
    expect(toggle).toHaveAttribute('aria-checked', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-checked', 'true')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(window.localStorage.getItem('theme')).toBe('dark')
  })

  it('берёт сохранённую тему при загрузке', () => {
    window.localStorage.setItem('theme', 'dark')
    renderApp('/')
    expect(screen.getByRole('switch', { name: 'Тёмная тема' })).toHaveAttribute('aria-checked', 'true')
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
    renderApp('/projects/vivoai')
    expect(screen.getByRole('link', { name: 'Работы' })).toHaveAttribute('href', '/#work')
  })
})
