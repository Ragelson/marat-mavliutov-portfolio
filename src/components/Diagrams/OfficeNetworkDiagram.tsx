import styles from './Diagram.module.css'

interface OfficeProps {
  name: string
  lan: string
  /** У правого офиса роутер стоит первым — ближе к туннелю. */
  reversed?: boolean
}

function Office({ name, lan, reversed = false }: OfficeProps) {
  const nodes = [
    { title: 'Рабочие места', note: `${lan} · своя подсеть` },
    { title: 'Роутер OpenWrt', note: 'Cudy WR3000S' },
  ]
  const ordered = reversed ? [...nodes].reverse() : nodes

  return (
    <div className={styles.zone}>
      <p className={styles.zoneTitle}>{name}</p>
      <ul className={styles.stack}>
        {ordered.map((node) => (
          <li key={node.title} className={styles.node}>
            <span className={styles.nodeTitle}>{node.title}</span>
            <span className={styles.nodeNote}>{node.note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function OfficeNetworkDiagram() {
  return (
    <figure className={styles.figure}>
      <div className={styles.network}>
        <Office name="Офис A" lan="LAN A" />
        <div className={styles.link}>
          <span className={styles.linkLine} aria-hidden="true" />
          <span className={styles.linkLabel}>WireGuard site-to-site, напрямую между роутерами</span>
        </div>
        <Office name="Офис B" lan="LAN B" reversed />
      </div>
      <p className={styles.aside}>Администрирование роутеров — через отдельный WireGuard-туннель.</p>
      <figcaption className={styles.caption}>
        Упрощённая иллюстрация. «Офис A» и «Офис B» — условные обозначения; реальные адреса и конфигурации не
        показаны.
      </figcaption>
    </figure>
  )
}
