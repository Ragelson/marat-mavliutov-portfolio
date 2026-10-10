import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { App } from '../App.tsx'

/** Рендерит приложение целиком на нужном адресе. */
export function renderApp(path = '/') {
  const user = userEvent.setup()
  const result = render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
  return { user, ...result }
}
