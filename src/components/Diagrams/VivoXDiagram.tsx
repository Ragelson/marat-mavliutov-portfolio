import styles from './VivoXDiagram.module.css'

/** Путь запроса внутри периметра компании. */
const chain = [
  { title: 'Менеджер', note: 'текст · фото · запись звонка' },
  { title: 'Open WebUI · «VivoX»', note: 'единая модель, селектор скрыт' },
  { title: 'Router-фильтр + Pipe', note: 'vision-роутинг · agent loop · SQL tool-calling', own: true },
  { title: 'PostgreSQL', note: 'организация → контракт → зона → подгруппа → позиция', own: true },
]

/** Где выполняются модели. */
const runtime = [
  { title: 'GPU0 · vLLM', note: 'Qwen3-14B-AWQ · текст · ~29 ток/с · max-model-len 16384 · fp8 KV-cache' },
  { title: 'GPU1 · vLLM', note: 'Qwen2.5-VL-7B-AWQ · изображения · ~12.8 GiB на 16 GB VRAM' },
  { title: 'CPU · faster-whisper', note: 'расшифровка звонков · OpenAI-совместимый STT' },
]

/** Сервисы вокруг моделей. */
const services = [
  { title: 'Qdrant', note: 'векторный поиск по документам' },
  { title: 'MinIO', note: 'файлы и вложения' },
  { title: 'SearXNG', note: 'self-hosted веб-поиск' },
  { title: 'VivoX Describer', note: 'отдельная модель без инструментов' },
]

/**
 * Схема VivoX: путь запроса внутри периметра компании, модели на картах и сервисы вокруг них.
 * Отдельно показано единственное обращение за периметр — поисковые запросы веб-поиска.
 */
export function VivoXDiagram() {
  return (
    <figure className={styles.figure}>
      <div className={styles.perimeter}>
        <p className={`label ${styles.zoneLabel}`}>Периметр компании · Docker</p>

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

        <p className={`label ${styles.rowLabel}`}>Модели</p>
        <ul className={styles.row}>
          {runtime.map((node) => (
            <li key={node.title} className={styles.node}>
              <span className={styles.title}>{node.title}</span>
              <span className={styles.note}>{node.note}</span>
            </li>
          ))}
        </ul>

        <p className={`label ${styles.rowLabel}`}>Сервисы</p>
        <ul className={`${styles.row} ${styles.services}`}>
          {services.map((node) => (
            <li key={node.title} className={styles.node}>
              <span className={styles.title}>{node.title}</span>
              <span className={styles.note}>{node.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.external}>
        <p className={`label ${styles.zoneLabel}`}>За периметром</p>
        <ul className={styles.externalList}>
          <li className={styles.node}>
            <span className={styles.title}>Веб-поиск</span>
            <span className={styles.note}>наружу уходят только поисковые запросы через SearXNG</span>
          </li>
        </ul>
      </div>

      <figcaption className={styles.caption}>
        <span className={styles.legend} aria-hidden="true" />
        Собственная логика: Pipe с agent loop и схема базы данных. Схема упрощена; коммерческие данные не покидают
        периметр компании, внешние облачные ИИ-сервисы не используются.
      </figcaption>
    </figure>
  )
}
