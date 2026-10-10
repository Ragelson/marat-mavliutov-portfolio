import styles from './VincArchitectureDiagram.module.css'

const layers = [
  { id: 'pages', label: 'Страницы', items: ['Лендинг', 'Приложение', 'Кабинет специалиста', 'Оплата', 'Юридические'] },
  {
    id: 'modules',
    label: 'Модули',
    items: ['Календарь', 'Доска задач', 'Окно задачи', 'Заметки', 'Достижения', 'Чаты'],
  },
  { id: 'dto', label: 'DTO', items: ['Task', 'User', 'Sphere', '…'] },
  { id: 'api', label: 'API-клиент', items: ['GET', 'POST', 'PUT', 'DELETE', 'cookie-сессия', 'XSRF'] },
]

/** Слои frontend-архитектуры Vinc: от страниц до API-клиента. Backend и оплата — внешние системы. */
export function VincArchitectureDiagram() {
  return (
    <figure className={styles.figure}>
      <ol className={styles.layers}>
        {layers.map((layer, index) => (
          <li key={layer.id} className={styles.layer} data-layer={layer.id}>
            <span className="label">
              {String(index + 1).padStart(2, '0')} · {layer.label}
            </span>
            <ul className={styles.items}>
              {layer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <div className={styles.outside}>
        <span className="label">Вне frontend</span>
        <p>REST API · внешний платёжный провайдер</p>
      </div>
      <figcaption className={styles.caption}>
        Упрощённая схема слоёв frontend на Vanilla JS. Интерфейс на двух языках: RU / EN.
      </figcaption>
    </figure>
  )
}
