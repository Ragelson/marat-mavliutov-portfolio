/**
 * Адрес файла из папки public с учётом base (на GitHub Pages сайт лежит в подпапке).
 * publicUrl('/projects/vinc/calendar.webp') → '/marat-mavliutov-portfolio/projects/vinc/calendar.webp'
 */
export function publicUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
