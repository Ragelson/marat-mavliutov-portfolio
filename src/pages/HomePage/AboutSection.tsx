import { aboutTags, securityHabits } from '../../data/directions.ts'
import styles from './AboutSection.module.css'

export function AboutSection() {
  return (
    <section id="about" tabIndex={-1} className={`surface-inverse ${styles.about}`} aria-labelledby="about-title">
      <div className={`container scroll-reveal ${styles.grid}`}>
        <h2 id="about-title" className={`label ${styles.heading}`}>
          Обо мне
        </h2>
        <p className={styles.thesis}>Учусь на реальных задачах.</p>
        <div className={styles.text}>
          <p>
            Новые модели и инструменты сначала пробую на своих проектах, и только то, что дало пользу, оставляю в
            работе. Поэтому мой опыт идёт от сервера инференса и схемы базы данных до сетей, VPN и ботов.
          </p>
          <p>
            Опыт руководства в армии и преподавания помогает объяснять технические решения коллегам и руководству
            простым языком. Ищу команду, где ИИ-агенты делают реальную работу, и хочу со временем взять на себя
            безопасность и устойчивость такой системы целиком.
          </p>
        </div>
        <div className={styles.habits}>
          <h3 className={`label ${styles.habitsHeading}`}>Привычки безопасности</h3>
          <ul className={styles.habitsList}>
            {securityHabits.map((habit) => (
              <li key={habit}>{habit}</li>
            ))}
          </ul>
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
