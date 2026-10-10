import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout/Layout.tsx'
import { HomePage } from './pages/HomePage/HomePage.tsx'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.tsx'
import { ProjectPage } from './pages/ProjectPage/ProjectPage.tsx'

/** Маршруты сайта. Роутер (BrowserRouter) подключается в main.tsx, чтобы в тестах можно было взять MemoryRouter. */
export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
