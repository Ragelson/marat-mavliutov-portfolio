import type { HtmlTagDescriptor, Plugin } from 'vite'
import { site } from '../src/config/site.ts'
import { getProjectPath, getPublishedProjects } from '../src/lib/projects.ts'

/**
 * Берёт метаданные из src/config/site.ts, чтобы они не дублировались в index.html:
 * - добавляет title, description и базовые Open Graph-теги в исходный HTML;
 * - создаёт sitemap.xml при сборке, но только если в конфиге указан реальный site.url.
 * В sitemap попадают только опубликованные проекты.
 */
export function siteMeta(): Plugin {
  return {
    name: 'site-meta',

    transformIndexHtml() {
      const title = `${site.name} — ${site.headline}`
      const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: 'meta', attrs, injectTo: 'head' })

      return [
        { tag: 'title', children: title, injectTo: 'head' },
        meta({ name: 'description', content: site.description }),
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:locale', content: 'ru_RU' }),
        meta({ property: 'og:site_name', content: site.name }),
        meta({ property: 'og:title', content: title }),
        meta({ property: 'og:description', content: site.description }),
      ]
    },

    generateBundle() {
      if (!site.url) return
      const paths = ['/', ...getPublishedProjects().map((project) => getProjectPath(project.slug))]
      const urls = paths.map((path) => `  <url><loc>${site.url}${path}</loc></url>`).join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}
