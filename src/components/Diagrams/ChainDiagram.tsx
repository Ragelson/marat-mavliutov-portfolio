import type { CSSProperties } from 'react'
import styles from './ChainDiagram.module.css'

export interface ChainNode {
  title: string
  note: string
  /** Собственная разработка — выделяется заливкой, легенда указана в подписи. */
  own?: boolean
}

interface ChainDiagramProps {
  nodes: ChainNode[]
  /** Что подключено к последнему узлу цепочки. */
  branch?: { label: string; nodes: ChainNode[] }
  caption: string
}

/**
 * Простая схема «шаг → шаг → шаг» и, если нужно, ветка из последнего шага.
 * Это обычный текст: он читается скринридером и работает в обеих темах.
 */
export function ChainDiagram({ nodes, branch, caption }: ChainDiagramProps) {
  return (
    <figure className={styles.figure}>
      <ol className={styles.chain} style={{ '--columns': nodes.length } as CSSProperties}>
        {nodes.map((node, index) => (
          <li key={node.title} className={styles.node} data-own={node.own ?? false}>
            <span className={styles.index} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={styles.title}>{node.title}</span>
            <span className={styles.note}>{node.note}</span>
          </li>
        ))}
      </ol>

      {branch && (
        <div className={styles.branchBlock}>
          <p className={`label ${styles.branchLabel}`}>{branch.label}</p>
          <ul className={styles.branch}>
            {branch.nodes.map((node) => (
              <li key={node.title} className={styles.node}>
                <span className={styles.title}>{node.title}</span>
                <span className={styles.note}>{node.note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  )
}
