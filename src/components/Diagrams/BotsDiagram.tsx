import { ChainDiagram } from './ChainDiagram.tsx'

/** Схема Telegram-ботов: от команды в мессенджере до панели 3x-ui и роутеров. */
export function BotsDiagram() {
  return (
    <ChainDiagram
      nodes={[
        { title: 'Telegram', note: 'бот · Mini App' },
        { title: 'Бот на VPS', note: 'Python · aiogram / aiohttp · токены в .env', own: true },
      ]}
      branch={{
        label: 'Bearer-токен',
        nodes: [
          { title: '3x-ui API', note: 'клиенты VLESS Reality' },
          { title: 'Podkop', note: 'роутеры OpenWrt · избирательная маршрутизация' },
        ],
      }}
      caption="Схема упрощена. Токены и ключи вынесены в .env и не попадают в репозиторий; адреса панели и роутеров не показаны."
    />
  )
}
