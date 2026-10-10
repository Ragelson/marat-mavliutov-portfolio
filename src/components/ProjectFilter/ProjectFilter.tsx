import { categoryLabels } from '../../data/categories.ts'
import type { ProjectCategory } from '../../types/project.ts'
import styles from './ProjectFilter.module.css'

export type CategoryFilter = ProjectCategory | 'all'

interface ProjectFilterProps {
  categories: ProjectCategory[]
  selected: CategoryFilter
  onChange: (category: CategoryFilter) => void
}

/** Фильтр списка, а не вкладки: обычные кнопки с aria-pressed. */
export function ProjectFilter({ categories, selected, onChange }: ProjectFilterProps) {
  const options: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'Все' },
    ...categories.map((category) => ({ value: category, label: categoryLabels[category] })),
  ]

  return (
    <div role="group" aria-label="Фильтр проектов по направлению" className={styles.filter}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={styles.button}
          aria-pressed={selected === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
