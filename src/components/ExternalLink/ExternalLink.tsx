import type { ReactNode } from 'react'

interface ExternalLinkProps {
  href: string
  className?: string
  children: ReactNode
}

/** Ссылка на внешний сайт в новой вкладке — с предупреждением для скринридеров. */
export function ExternalLink({ href, className, children }: ExternalLinkProps) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="visually-hidden"> (откроется в новой вкладке)</span>
    </a>
  )
}
