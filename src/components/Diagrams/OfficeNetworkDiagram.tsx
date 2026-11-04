import styles from './OfficeNetworkDiagram.module.css'

interface SiteData {
  number: '1' | '2'
  router: string
  tunnel: string
  lan: string
}

/** Две площадки межофисной сети. Адреса — частные диапазоны; публичные адреса и ключи не показаны. */
const sites: SiteData[] = [
  { number: '1', router: 'Cudy WR3000S · OpenWrt', tunnel: 'wg0 10.99.0.1/30', lan: '192.168.0.0/24, 192.168.1.0/24' },
  {
    number: '2',
    router: 'Cudy WR3000S · OpenWrt',
    tunnel: 'wg0 10.99.0.2/30',
    lan: '192.168.10.0/24, 192.168.11.0/24',
  },
]

function Site({ site }: { site: SiteData }) {
  return (
    <div className={styles.site}>
      <p className={styles.letter} aria-hidden="true">
        {site.number}
      </p>
      <p className={styles.siteName}>Офис №{site.number}</p>
      <ul className={styles.parts}>
        <li>
          <span className="label">Роутер</span>
          <span>{site.router}</span>
        </li>
        <li>
          <span className="label">Туннель</span>
          <span>{site.tunnel}</span>
        </li>
        <li>
          <span className="label">LAN</span>
          <span>{site.lan}</span>
        </li>
      </ul>
    </div>
  )
}

/** Топология: две площадки, прямой туннель между роутерами и отдельные слои admin-канала и обхода блокировок. */
export function OfficeNetworkDiagram() {
  const [first, second] = sites

  return (
    <figure className={styles.figure}>
      <div className={styles.topology}>
        {first && <Site site={first} />}
        <div className={styles.link}>
          <span className={styles.line} aria-hidden="true" />
          <p className={styles.linkTitle}>WireGuard</p>
          <p className="label">site-to-site · UDP 51820 · напрямую между роутерами · вместо PPTP</p>
        </div>
        {second && <Site site={second} />}
      </div>
      <p className={styles.admin}>
        <span className={styles.adminLine} aria-hidden="true" />
        Podkop / sing-box на каждом офисе даёт свой независимый выход на VLESS Reality VPS — в межофисной
        маршрутизации он не участвует
      </p>
      <figcaption className={styles.caption}>
        Схема упрощена: показаны частные подсети площадок и порт туннеля. Публичные адреса, ключи, конфигурации и
        правила firewall не публикуются.
      </figcaption>
    </figure>
  )
}
