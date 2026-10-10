import { site } from '../config/site.ts'

/** Полный заголовок страницы. Один формат для браузера (useDocumentMeta) и для HTML при сборке. */
export function formatPageTitle(title?: string): string {
  return title ? `${title} — ${site.name}` : `${site.name} — ${site.headline}`
}
