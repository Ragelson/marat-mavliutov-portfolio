import styles from './OfficeNetworkDiagram.module.css'

function Site({ letter }: { letter: 'A' | 'B' }) {
  return (
    <div className={styles.site}>
      <p className={styles.letter} aria-hidden="true">
        {letter}
      </p>
      <p className={styles.siteName}>Офис {letter}</p>
      <ul className={styles.parts}>
        <li>
          <span className="label">LAN {letter}</span>
          <span>своя подсеть</span>
        </li>
        <li>
          <span className="label">Роутер</span>
          <span>OpenWrt · Cudy WR3000S</span>
        </li>
      </ul>
    </div>
  )
}

/** Упрощённая топология: две условные площадки и прямой туннель между роутерами. */
export function OfficeNetworkDiagram() {
  return (
    <figure className={styles.figure}>
      <div className={styles.topology}>
        <Site letter="A" />
        <div className={styles.link}>
          <span className={styles.line} aria-hidden="true" />
          <p className={styles.linkTitle}>WireGuard</p>
          <p className="label">site-to-site · напрямую между роутерами · вместо PPTP</p>
        </div>
        <Site letter="B" />
      </div>
      <p className={styles.admin}>
        <span className={styles.adminLine} aria-hidden="true" />
        Администрирование роутеров — через отдельный WireGuard-туннель
      </p>
      <figcaption className={styles.caption}>
        Упрощённая иллюстрация. «Офис A» и «Офис B» — условные обозначения; реальные адреса, ключи и конфигурации не
        показаны.
      </figcaption>
    </figure>
  )
}
