import type { ReactNode } from 'react'
import type { TextBlock } from '../../types/project.ts'
import styles from './CaseSection.module.css'

interface CaseSectionProps {
  title: string
  children: ReactNode
}

/** Раздел кейса с заголовком второго уровня. */
export function CaseSection({ title, children }: CaseSectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
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
