import { aboutTags } from '../../data/directions.ts'
import styles from './AboutSection.module.css'

export function AboutSection() {
  return (
    <section id="about" tabIndex={-1} className={`surface-inverse ${styles.about}`} aria-labelledby="about-title">
      <div className={`container scroll-reveal ${styles.grid}`}>
        <h2 id="about-title" className={`label ${styles.heading}`}>
          Обо мне
        </h2>
        <p className={styles.thesis}>Мне интересно, как работает система целиком.</p>
        <div className={styles.text}>
          <p>
            Мне интересны задачи, в которых недостаточно написать один компонент. Поэтому мой опыт включает
            веб-разработку, сети и локальные ИИ-сервисы.
          </p>
          <p>
            В работе стараюсь оставлять не только действующее решение, но и понятную структуру, описание ограничений и
            документацию для тех, кто будет его поддерживать.
          </p>
        </div>
        <ul className={styles.tags} aria-label="Области работы">
          {aboutTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
