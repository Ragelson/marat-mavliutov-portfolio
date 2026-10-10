const rotation = { right: 0, down: 90, 'down-right': 45, 'up-right': -45, left: 180 }

interface ArrowProps {
  direction?: keyof typeof rotation
}

/** Декоративная стрелка: смысл передаёт текст ссылки, поэтому скрыта от скринридеров. */
export function Arrow({ direction = 'right' }: ArrowProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${rotation[direction]}deg)` }}
    >
      <path d="M3 12h17M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" />
    </svg>
  )
}
