import styles from './TagList.module.css'

interface TagListProps {
  items: string[]
  label: string
}

/** Список технологий: label озвучивается скринридером, визуально не показывается. */
export function TagList({ items, label }: TagListProps) {
  if (items.length === 0) return null

  return (
    <ul className={styles.list} aria-label={label}>
      {items.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  )
}
