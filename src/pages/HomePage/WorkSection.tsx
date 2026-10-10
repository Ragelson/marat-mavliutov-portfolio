import { getFeaturedProjects, getOtherProjects } from '../../lib/projects.ts'
import { FeaturedProject } from './FeaturedProject.tsx'
import { OtherProjects } from './OtherProjects.tsx'
import styles from './WorkSection.module.css'

const featured = getFeaturedProjects()
const others = getOtherProjects()

export function WorkSection() {
  return (
    <section id="work" tabIndex={-1} aria-labelledby="work-title">
      <div className={`container ${styles.intro}`}>
        <h2 id="work-title" className={styles.title}>
          Работы
        </h2>
        <p className={styles.lead}>
          Три стороны одной практики: интерфейс, система с данными и сеть. Ниже — избранные проекты и другие работы.
        </p>
      </div>

      {featured.map((project, index) => (
        <FeaturedProject key={project.slug} project={project} number={index + 1} total={featured.length} />
      ))}

      {others.length > 0 && <OtherProjects projects={others} startNumber={featured.length + 1} />}
    </section>
  )
}
