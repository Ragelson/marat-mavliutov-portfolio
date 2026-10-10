import { useEffect } from 'react'
import { site } from '../config/site.ts'

interface DocumentMeta {
  /** Заголовок страницы без имени сайта; для главной не передаётся. */
  title?: string
  description?: string
  /** Путь страницы для canonical, например "/projects/vivoai". */
  path: string
}

function setMetaContent(selector: string, content: string) {
  document.head.querySelector(selector)?.setAttribute('content', content)
}

/**
 * Обновляет title, description и canonical в браузере.
 * Это помогает вкладкам, истории и скринридерам, но не создаёт отдельные превью для мессенджеров:
 * они читают исходный HTML без выполнения JavaScript (см. README, «Ограничения SPA»).
 */
export function useDocumentMeta({ title, description = site.description, path }: DocumentMeta) {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.headline}`

  useEffect(() => {
    document.title = fullTitle
    setMetaContent('meta[name="description"]', description)

    // canonical появляется, только когда в конфиге указан реальный production-адрес
    if (!site.url) return
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = `${site.url}${path}`
  }, [fullTitle, description, path])
}
