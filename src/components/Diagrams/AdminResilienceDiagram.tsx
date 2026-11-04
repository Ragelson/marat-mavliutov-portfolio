import { ChainDiagram } from './ChainDiagram.tsx'

/** Схема резервного администрирования: отдельный туннель и отдельный слой обхода блокировок. */
export function AdminResilienceDiagram() {
  return (
    <ChainDiagram
      nodes={[
        { title: 'Администратор', note: 'резервный доступ' },
        { title: 'wg1 · admin-туннель', note: 'работает при отказе основного VPN', own: true },
        { title: 'Роутер OpenWrt', note: 'web UI / SSH' },
      ]}
      branch={{
        label: 'Отдельный слой, не затрагивает admin-канал',
        nodes: [
          { title: 'Xray · sing-box', note: 'обход блокировок по правилам маршрутизации' },
          { title: 'AdGuard Home', note: 'фильтрация DNS-запросов' },
        ],
      }}
      caption="Схема упрощена. Реальные адреса, ключи и правила маршрутизации не показаны."
    />
  )
}
