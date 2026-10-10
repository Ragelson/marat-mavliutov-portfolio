import styles from './VivoAiDiagram.module.css'

const chain = [
  { title: 'Менеджер', note: 'вопрос в чате' },
  { title: 'Open WebUI', note: 'интерфейс чата' },
  { title: 'Ollama · Qwen3:14B', note: 'ответ и вызовы инструментов' },
  { title: 'Pipe-функция', note: 'SQL tool-calling', own: true },
  { title: 'PostgreSQL', note: 'организации → контракты → зоны → позиции', own: true },
]

const external = [
  { title: 'Yandex API', note: 'поиск информации' },
  { title: '4Dealer API', note: 'подбор оборудования' },
]

/** Схема VivoAI: локальная цепочка обработки и отдельно — обращения к внешним API. */
export function VivoAiDiagram() {
  return (
    <figure className={styles.figure}>
      <div className={styles.perimeter}>
        <p className={`label ${styles.zoneLabel}`}>Локальный контур</p>
        <ol className={styles.chain}>
          {chain.map((node, index) => (
            <li key={node.title} className={styles.node} data-own={node.own ?? false}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.title}>{node.title}</span>
              <span className={styles.note}>{node.note}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.external}>
        <p className={`label ${styles.zoneLabel}`}>Внешние вызовы — за пределами контура</p>
        <ul className={styles.externalList}>
          {external.map((node) => (
            <li key={node.title} className={styles.node}>
              <span className={styles.title}>{node.title}</span>
              <span className={styles.note}>{node.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <figcaption className={styles.caption}>
        <span className={styles.legend} aria-hidden="true" />
        Собственная логика: Pipe-функция и схема базы данных. Схема упрощена; локальная обработка показана отдельно от
        обращений к внешним API.
      </figcaption>
    </figure>
  )
}
