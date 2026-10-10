import { useEffect } from 'react'
import { site } from '../config/site.ts'
import { formatPageTitle } from '../lib/meta.ts'

interface DocumentMeta {
  /** Заголовок страницы без имени сайта; для главной не передаётся. */
  title?: string
  description?: string
  /** Путь страницы для canonical, например "/projects/vivoai". Без пути canonical убирается (страница 404). */
  path?: string
}

function setMetaContent(selector: string, content: string) {
  document.head.querySelector(selector)?.setAttribute('content', content)
}

/**
 * Обновляет title, description и canonical при переходах внутри сайта.
 * При первой загрузке те же значения уже есть в HTML: их подставляет сборка (vite-plugins/site-meta.ts).
 */
export function useDocumentMeta({ title, description = site.description, path }: DocumentMeta) {
  const fullTitle = formatPageTitle(title)

  useEffect(() => {
    document.title = fullTitle
    setMetaContent('meta[name="description"]', description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    // canonical нужен, только когда в конфиге указан реальный адрес сайта
    if (!site.url || path === undefined) {
      canonical?.remove()
      return
    }
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = `${site.url}${path}`
  }, [fullTitle, description, path])
}
