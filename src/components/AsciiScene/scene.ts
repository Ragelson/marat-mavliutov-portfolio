/**
 * Генератор ASCII-пейзажа: Урал, ели, озеро с отражением, камни и трава.
 *
 * Сцена — сетка символов. Каждый символ принадлежит одному «слою» (звёзды, горы, вода…).
 * На выходе — по одной строке текста на слой: в чужих ячейках пробелы.
 * Слои рисуются наложенными друг на друга <pre>, а цвет каждого берётся из переменной темы,
 * поэтому смена ночи и дня — это только смена цветов.
 *
 * Используются только ASCII-символы: псевдографики (┌─┐, █) нет в локальном JetBrains Mono,
 * а символ из запасного шрифта другой ширины сдвинул бы всю строку.
 */

export const SCENE_LAYERS = [
  'star',
  'twinkle',
  'cloud',
  'sun',
  'far',
  'near',
  'snow',
  'tree',
  'trunk',
  'shore',
  'water',
  'echo',
  'glintA',
  'glintB',
  'rock',
  'grass',
] as const

export type SceneLayer = (typeof SCENE_LAYERS)[number]

interface Peak {
  /** Колонка вершины. */
  x: number
  /** Высота в строках. */
  h: number
  /** Полуширина подножия в колонках. */
  w: number
}

interface Range {
  peaks: Peak[]
  layer: 'far' | 'near'
  /** Плотность «текстуры» склона. */
  texture: number
  /** С какой высоты (в строках) на гребне лежит снег; не задано — без снега. */
  snowFrom?: number
}

export interface SceneSpec {
  cols: number
  /** Строка берега: на ней стоят ели, выше — небо и горы. */
  land: number
  lakeRows: number
  groundRows: number
  seed: number
  ranges: Range[]
  trees: { x: number; size: 0 | 1 | 2 }[]
  rocks: { x: number; size: 0 | 1 | 2 }[]
  clouds: { x: number; y: number }[]
  /** Центр курсора (ночью) и солнца (днём). */
  light: { x: number; y: number }
  starDensity: number
}

export interface Scene {
  cols: number
  rows: number
  layers: Record<SceneLayer, string>
  light: { x: number; y: number }
}

/** Ели трёх размеров; «|» — ствол. */
const TREES = [
  [' ^ ', '/^\\', ' | '],
  [' ^ ', '/^\\', '/^\\', ' | '],
  ['  ^  ', ' /^\\ ', ' /^\\ ', '//^\\\\', '  |  '],
]

/** Камни; пробелы внутри контура тоже принадлежат камню и закрывают траву. */
const ROCKS = [
  [' __ ', '(__)'],
  [' .--. ', '(    )'],
  ['   _   ', ' _/ \\_ ', '(_____)'],
]

const CLOUD = ['   .--.    ', ' .(    ).  ', '(___.___)_)']

const SUN = [' \\ | / ', '-- O --', ' / | \\ ']

/** Детерминированный генератор случайных чисел: сцена одинакова при каждой сборке. */
function random(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const pick = <T>(rnd: () => number, items: readonly T[]): T => items[Math.floor(rnd() * items.length)] as T

export function buildScene(spec: SceneSpec): Scene {
  const { cols, land, lakeRows, groundRows } = spec
  const rows = land + 1 + lakeRows + groundRows
  const rnd = random(spec.seed)

  const chars: string[][] = Array.from({ length: rows }, () => Array<string>(cols).fill(' '))
  const owner: (SceneLayer | null)[][] = Array.from({ length: rows }, () => Array<SceneLayer | null>(cols).fill(null))

  const inside = (x: number, y: number) => x >= 0 && x < cols && y >= 0 && y < rows
  const put = (x: number, y: number, char: string, layer: SceneLayer) => {
    if (!inside(x, y)) return
    chars[y]![x] = char
    owner[y]![x] = layer
  }
  const stamp = (sprite: string[], left: number, top: number, layer: SceneLayer, solid = false) => {
    sprite.forEach((line, dy) => {
      const first = line.search(/\S/)
      const last = line.length - 1 - [...line].reverse().join('').search(/\S/)
      ;[...line].forEach((char, dx) => {
        const isSolid = solid && dx >= first && dx <= last
        if (char === ' ' && !isSolid) return
        put(left + dx, top + dy, char, char === '|' && layer === 'tree' ? 'trunk' : layer)
      })
    })
  }

  // Небо: звёзды, часть из них мерцает. Вокруг курсора/солнца звёзд нет
  for (let y = 0; y < land; y++) {
    for (let x = 0; x < cols; x++) {
      if (Math.abs(x - spec.light.x) <= 5 && Math.abs(y - spec.light.y) <= 2) continue
      if (rnd() < spec.starDensity) put(x, y, pick(rnd, ['.', '.', '.', '+', '*']), rnd() < 0.25 ? 'twinkle' : 'star')
    }
  }

  // Облака и солнце видны только днём: ночью их цвет прозрачный
  spec.clouds.forEach((cloud) => stamp(CLOUD, cloud.x, cloud.y, 'cloud'))
  stamp(SUN, spec.light.x - 3, spec.light.y - 1, 'sun')

  // Горы: дальний хребет, затем ближний поверх. Округлые вершины — старые Уральские горы
  for (const range of spec.ranges) {
    const height = (x: number) =>
      Math.max(0, ...range.peaks.map((p) => (Math.abs(x - p.x) < p.w ? p.h * (1 - ((x - p.x) / p.w) ** 2) : 0)))
    // Ячейка, в которую попадает линия гребня, и положение линии внутри неё (0 — низ, 1 — верх)
    const ridge = (x: number) => land - Math.ceil(height(x))

    for (let x = 0; x < cols; x++) {
      const h = height(x)
      const top = ridge(x)
      if (h < 0.35) continue
      const left = ridge(x - 1)
      const right = ridge(x + 1)
      const level = h - Math.ceil(h) + 1
      const isPeak = range.peaks.some((p) => Math.round(p.x) === x && Math.abs(h - p.h) < 0.01)
      // Склон — «/» и «\», пологий участок — «_» или «-» по высоте линии в ячейке, вершина — «^»
      let edge = level < 0.4 ? '_' : '-'
      if (isPeak || (left > top && right > top)) edge = '^'
      else if (left > top) edge = '/'
      else if (right > top) edge = '\\'
      const snowy = range.snowFrom !== undefined && height(x) >= range.snowFrom
      put(x, top, edge, snowy ? 'snow' : range.layer)

      // Крутой подъём или спуск: дорисовываем склон, чтобы гребень не рвался
      for (let y = right + 1; y < top; y++) put(x, y, '/', snowy ? 'snow' : range.layer)
      for (let y = left + 1; y < top; y++) put(x, y, '\\', snowy ? 'snow' : range.layer)

      for (let y = top + 1; y < land; y++) {
        const snowLine = snowy && y === top + 1
        if (snowLine && rnd() < 0.55) put(x, y, pick(rnd, ['.', "'", '`']), 'snow')
        else if (rnd() < range.texture) put(x, y, pick(rnd, ['.', ':', "'", '.']), range.layer)
        else put(x, y, ' ', range.layer)
      }
    }
  }

  // Берег
  for (let x = 0; x < cols; x++) put(x, land, rnd() < 0.7 ? '_' : '.', 'shore')

  // Ели стоят на берегу; их отражение — в первых строках озера
  for (const tree of spec.trees) {
    const sprite = TREES[tree.size]!
    stamp(sprite, tree.x, land - sprite.length + 1, 'tree')
    const crown = sprite.slice(0, -1).reverse()
    crown.forEach((line, dy) => {
      const y = land + 1 + dy
      if (dy >= Math.min(2, lakeRows - 1)) return
      ;[...line].forEach((char, dx) => {
        if (char === ' ' || rnd() < 0.5) return
        const mirrored = char === '/' ? '\\' : char === '\\' ? '/' : char === '^' ? 'v' : char
        put(tree.x + dx, y, mirrored, 'echo')
      })
    })
  }

  // Озеро: рябь и дорожка света от курсора/солнца в двух вариантах — они сменяют друг друга (мерцание)
  for (let dy = 0; dy < lakeRows; dy++) {
    const y = land + 1 + dy
    for (let x = 0; x < cols; x++) {
      if (owner[y]![x] !== null) continue
      const r = rnd()
      put(x, y, r < 0.12 ? '~' : r < 0.18 ? '-' : ' ', 'water')
    }
  }
  for (const variant of ['glintA', 'glintB'] as const) {
    for (let dy = 0; dy < lakeRows; dy++) {
      const y = land + 1 + dy
      const half = 1 + Math.floor(dy * 0.8)
      for (let dx = -half; dx <= half; dx++) {
        if (rnd() < 0.3) continue
        put(spec.light.x + dx, y, dx === 0 ? '=' : Math.abs(dx) === half ? '-' : '~', variant)
      }
    }
  }

  // Передний план: трава гуще к нижнему краю, камни поверх
  const groundTop = land + 1 + lakeRows
  for (let dy = 0; dy < groundRows; dy++) {
    const y = groundTop + dy
    const density = 0.14 + (0.3 * dy) / Math.max(1, groundRows - 1)
    for (let x = 0; x < cols; x++) {
      if (rnd() < density) put(x, y, pick(rnd, [',', "'", '"', 'v', 'w', ',', "'"]), 'grass')
    }
  }
  for (const rock of spec.rocks) {
    const sprite = ROCKS[rock.size]!
    stamp(sprite, rock.x, rows - sprite.length, 'rock', true)
  }

  const layers = Object.fromEntries(
    SCENE_LAYERS.map((layer) => [
      layer,
      chars.map((line, y) => line.map((char, x) => (owner[y]![x] === layer ? char : ' ')).join('')).join('\n'),
    ]),
  ) as Record<SceneLayer, string>

  return { cols, rows, layers, light: spec.light }
}

/** Широкая сцена: планшеты и десктоп. */
export const wideScene: SceneSpec = {
  cols: 120,
  land: 18,
  lakeRows: 6,
  groundRows: 3,
  seed: 1907,
  starDensity: 0.035,
  light: { x: 88, y: 3 },
  ranges: [
    {
      layer: 'far',
      texture: 0.08,
      snowFrom: 8,
      peaks: [
        { x: 14, h: 9, w: 22 },
        { x: 45, h: 11, w: 26 },
        { x: 76, h: 10, w: 24 },
        { x: 108, h: 8.5, w: 20 },
      ],
    },
    {
      layer: 'near',
      texture: 0.16,
      peaks: [
        { x: 27, h: 6, w: 18 },
        { x: 60, h: 7.5, w: 20 },
        { x: 97, h: 6, w: 18 },
      ],
    },
  ],
  trees: [
    { x: 1, size: 2 },
    { x: 6, size: 1 },
    { x: 9, size: 2 },
    { x: 14, size: 0 },
    { x: 17, size: 1 },
    { x: 21, size: 0 },
    { x: 98, size: 0 },
    { x: 101, size: 1 },
    { x: 104, size: 2 },
    { x: 109, size: 1 },
    { x: 112, size: 2 },
    { x: 116, size: 1 },
  ],
  rocks: [
    { x: 6, size: 2 },
    { x: 31, size: 0 },
    { x: 66, size: 1 },
    { x: 104, size: 0 },
  ],
  clouds: [
    { x: 12, y: 2 },
    { x: 46, y: 4 },
  ],
}

/** Упрощённая сцена для узких экранов: меньше колонок, гор и деревьев. */
export const compactScene: SceneSpec = {
  cols: 48,
  land: 12,
  lakeRows: 4,
  groundRows: 2,
  seed: 2207,
  starDensity: 0.04,
  light: { x: 35, y: 2 },
  ranges: [
    {
      layer: 'far',
      texture: 0.08,
      snowFrom: 5.5,
      peaks: [
        { x: 8, h: 6, w: 12 },
        { x: 25, h: 7.5, w: 13 },
        { x: 43, h: 6, w: 11 },
      ],
    },
    {
      layer: 'near',
      texture: 0.16,
      peaks: [
        { x: 15, h: 4, w: 10 },
        { x: 34, h: 4.5, w: 10 },
      ],
    },
  ],
  trees: [
    { x: 0, size: 2 },
    { x: 5, size: 1 },
    { x: 8, size: 0 },
    { x: 40, size: 1 },
    { x: 43, size: 2 },
  ],
  rocks: [
    { x: 3, size: 0 },
    { x: 27, size: 1 },
  ],
  clouds: [{ x: 4, y: 1 }],
}
