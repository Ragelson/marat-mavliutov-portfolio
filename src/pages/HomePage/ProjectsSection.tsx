import { useState } from 'react'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard.tsx'
import { ProjectFilter, type CategoryFilter } from '../../components/ProjectFilter/ProjectFilter.tsx'
import { filterByCategory, getAvailableCategories, getPublishedProjects } from '../../lib/projects.ts'
import styles from './HomePage.module.css'

// Данные статичны, поэтому списки вычисляются один раз при загрузке модуля
const publishedProjects = getPublishedProjects()
const availableCategories = getAvailableCategories(publishedProjects)

export function ProjectsSection() {
  const [category, setCategory] = useState<CategoryFilter>('all')
  // Отфильтрованный список не хранится в состоянии: он вычисляется из исходных данных при каждом рендере
  const visibleProjects = filterByCategory(publishedProjects, category)

  return (
    <section id="projects" tabIndex={-1} className={`container ${styles.section}`} aria-labelledby="projects-title">
      <div className={styles.sectionHeader}>
        <h2 id="projects-title" className={styles.sectionTitle}>
          Проекты
        </h2>
        <p className={styles.lead}>Задачи, мой вклад и принятые решения — на реальных проектах.</p>
      </div>

      {availableCategories.length > 1 && (
        <ProjectFilter categories={availableCategories} selected={category} onChange={setCategory} />
      )}
      <p className="visually-hidden" aria-live="polite">
        Показано проектов: {visibleProjects.length}
      </p>

      <ul className={styles.projectGrid}>
        {visibleProjects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  )
}
