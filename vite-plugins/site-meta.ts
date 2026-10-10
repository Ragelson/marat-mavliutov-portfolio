import type { Plugin } from 'vite'
import { site } from '../src/config/site.ts'
import { formatPageTitle } from '../src/lib/meta.ts'
import { getProjectPath, getPublishedProjects } from '../src/lib/projects.ts'

interface PageMeta {
  title: string
  description: string
  /** Путь страницы; для 404 не указывается — тогда нет canonical и og:url. */
  path?: string
}

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function renderMeta({ title, description, path }: PageMeta): string {
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="ru_RU" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  ]
  if (site.url && path !== undefined) {
    tags.push(`<link rel="canonical" href="${site.url}${path}" />`)
    tags.push(`<meta property="og:url" content="${site.url}${path}" />`)
  }
  if (path === undefined) tags.push('<meta name="robots" content="noindex" />')
  return tags.join('\n    ')
}

const homeMeta: PageMeta = { title: formatPageTitle(), description: site.description, path: '/' }

/**
 * Метаданные и статические HTML-файлы из src/config/site.ts и данных проектов:
 * - index.html получает title, description и Open Graph главной страницы;
 * - при сборке для каждого опубликованного кейса создаётся projects/<slug>.html со своими метаданными,
 *   а для неизвестных адресов — 404.html. Внутри — та же оболочка приложения;
 *   так обычные URL открываются напрямую на статическом хостинге без rewrites (GitHub Pages);
 * - sitemap.xml создаётся, только если в конфиге указан site.url. Draft-проекты туда не попадают.
 */
export function siteMeta(): Plugin {
  return {
    name: 'site-meta',
    enforce: 'post',

    transformIndexHtml(html) {
      return html.replace('</head>', `  ${renderMeta(homeMeta)}\n  </head>`)
    },

    generateBundle(_options, bundle) {
      const index = bundle['index.html']
      if (!index || index.type !== 'asset' || typeof index.source !== 'string') {
        this.error('site-meta: index.html не найден в сборке')
      }
      const shell = index.source
      const homeTags = renderMeta(homeMeta)
      const emitPage = (fileName: string, meta: PageMeta) =>
        this.emitFile({ type: 'asset', fileName, source: shell.replace(homeTags, renderMeta(meta)) })

      const projects = getPublishedProjects()
      for (const project of projects) {
        const path = getProjectPath(project.slug)
        emitPage(`${path.slice(1)}.html`, { title: formatPageTitle(project.title), description: project.summary, path })
      }
      emitPage('404.html', { title: formatPageTitle('Страница не найдена'), description: site.description })

      if (!site.url) return
      const urls = ['/', ...projects.map((project) => getProjectPath(project.slug))]
        .map((path) => `  <url><loc>${site.url}${path}</loc></url>`)
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}
