import styles from './Diagram.module.css'

const localSteps = [
  { title: 'Менеджер', note: 'задаёт вопрос в чате' },
  { title: 'Open WebUI', note: 'интерфейс чата' },
  { title: 'Ollama · Qwen3:14B', note: 'формирует ответ и вызовы инструментов' },
  { title: 'Pipe-функция', note: 'SQL tool-calling' },
  { title: 'PostgreSQL', note: 'организации → контракты → зоны → позиции' },
]

const externalServices = [
  { title: 'Yandex API', note: 'поиск информации' },
  { title: '4Dealer API', note: 'подбор оборудования' },
]

export function VivoAiDiagram() {
  return (
    <figure className={styles.figure}>
      <div className={styles.zones}>
        <div className={styles.zone}>
          <p className={styles.zoneTitle}>Локальный контур</p>
          <ol className={styles.flow}>
            {localSteps.map((step) => (
              <li key={step.title} className={styles.node}>
                <span className={styles.nodeTitle}>{step.title}</span>
                <span className={styles.nodeNote}>{step.note}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className={`${styles.zone} ${styles.zoneExternal}`}>
          <p className={styles.zoneTitle}>Внешние вызовы</p>
          <ul className={styles.stack}>
            {externalServices.map((service) => (
              <li key={service.title} className={styles.node}>
                <span className={styles.nodeTitle}>{service.title}</span>
                <span className={styles.nodeNote}>{service.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className={styles.caption}>
        Упрощённая схема. Локальная модель и база данных показаны отдельно от обращений к внешним API.
      </figcaption>
    </figure>
  )
}
