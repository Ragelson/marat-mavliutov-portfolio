import { agentChecks, agentModes, claudeMdContents } from '../../data/agents.ts'
import styles from './AgentsSection.module.css'

/** Как распределяется работа между мной и агентом: разделение задач, CLAUDE.md и проверка результата. */
export function AgentsSection() {
  return (
    <section id="agents" tabIndex={-1} className={styles.agents} aria-labelledby="agents-title">
      <div className={`container scroll-reveal ${styles.grid}`}>
        <p className="prompt" aria-hidden="true">
          cat agents.md
        </p>
        <p className={`label ${styles.kicker}`}>ИИ-агенты · рабочий процесс</p>
        <h2 id="agents-title" className={`hash glow ${styles.title}`}>
          Как я работаю с ИИ-агентами
        </h2>
        <p className={styles.lead}>
          Claude Code использую постоянно во всех рабочих проектах. В каждом проекте веду CLAUDE.md: контекст, правила и
          ограничения для агента. Код пишет агент, а решения о данных, доступах и безопасности принимаю я.
        </p>

        <ul className={styles.modes}>
          {agentModes.map((mode) => (
            <li key={mode.title} className={styles.mode}>
              <h3 className={styles.modeTitle}>{mode.title}</h3>
              <p className={`label ${styles.modeScope}`}>{mode.scope}</p>
              <p>{mode.text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.lists}>
          <div className={styles.listBlock}>
            <h3 className={`label ${styles.listHeading}`}>Что лежит в CLAUDE.md</h3>
            <ul className={styles.list}>
              {claudeMdContents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.listBlock}>
            <h3 className={`label ${styles.listHeading}`}>Как проверяю результат агента</h3>
            <ul className={styles.list}>
              {agentChecks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
