import type { CSSProperties } from 'react'
import { buildScene, compactScene, SCENE_LAYERS, wideScene, type Scene } from './scene.ts'
import styles from './AsciiScene.module.css'

// Сцены детерминированы и не зависят от темы — строятся один раз при загрузке модуля
const wide = buildScene(wideScene)
const compact = buildScene(compactScene)

function SceneLayers({ scene, variant }: { scene: Scene; variant: 'wide' | 'compact' }) {
  const style = {
    '--cols': scene.cols,
    '--rows': scene.rows,
    '--light-x': scene.light.x,
    '--light-y': scene.light.y,
  } as CSSProperties

  return (
    <div className={styles.scene} data-variant={variant} style={style}>
      {SCENE_LAYERS.map((layer) => (
        <pre key={layer} className={styles.layer} data-layer={layer}>
          {scene.layers[layer]}
        </pre>
      ))}
      {/* Ночью вместо луны — мигающий блочный курсор */}
      <span className={styles.cursor} />
    </div>
  )
}

/**
 * Пейзаж первого экрана: Урал, ели, озеро. Чисто декоративный, поэтому скрыт от скринридеров.
 * На узких экранах показывается упрощённая сцена — переключение медиазапросом, без JS.
 */
export function AsciiScene() {
  return (
    <div className={styles.frame} aria-hidden="true">
      <SceneLayers scene={wide} variant="wide" />
      <SceneLayers scene={compact} variant="compact" />
    </div>
  )
}
