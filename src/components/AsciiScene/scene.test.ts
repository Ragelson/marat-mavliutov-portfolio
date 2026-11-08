import { describe, expect, it } from 'vitest'
import { buildScene, compactScene, SCENE_LAYERS, wideScene } from './scene.ts'

describe('ASCII-пейзаж', () => {
  for (const [name, spec] of [
    ['широкий', wideScene],
    ['мобильный', compactScene],
  ] as const) {
    it(`${name}: все слои одной ширины и только из ASCII-символов`, () => {
      const scene = buildScene(spec)
      for (const layer of SCENE_LAYERS) {
        const lines = scene.layers[layer].split('\n')
        expect(lines).toHaveLength(scene.rows)
        for (const line of lines) {
          expect(line).toHaveLength(scene.cols)
          // Символ из запасного шрифта другой ширины сдвинул бы строку
          expect(line).toMatch(/^[\x20-\x7e]*$/)
        }
      }
    })
  }

  it('строится одинаково при каждом вызове', () => {
    expect(buildScene(wideScene)).toEqual(buildScene(wideScene))
  })
})
