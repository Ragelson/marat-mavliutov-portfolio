import type { ReactNode } from 'react'
import type { TextBlock } from '../../types/project.ts'
import styles from './CaseSection.module.css'

interface CaseSectionProps {
  number: number
  title: string
  /** callout — крупный текст (результат), aside — приглушённая выноска (ограничения решения). */
  tone?: 'default' | 'callout' | 'aside'
  children: ReactNode
}

/** Раздел кейса: номер и заголовок слева, текст в колонке комфортной ширины. */
export function CaseSection({ number, title, tone = 'default', children }: CaseSectionProps) {
  return (
    <section className={styles.section} data-tone={tone}>
      <h2 className={styles.title}>
        <span className={styles.number} aria-hidden="true">
          {String(number).padStart(2, '0')}
        </span>
        {title}
      </h2>
      <div className={styles.body}>{children}</div>
    </section>
  )
}

/** Абзацы и список из данных проекта — обычный текст, без вставки HTML. */
export function TextBlockView({ block }: { block: TextBlock }) {
  return (
    <>
      {block.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {block.items && block.items.length > 0 && (
        <ul className={styles.list}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  )
}
