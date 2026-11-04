import type { DiagramId } from '../types/project.ts'

/**
 * Фон блока со схемой: VivoX — контрастная тёмная панель, сети и боты — светлая техническая сетка.
 * Классы описаны в src/styles/globals.css.
 */
export function getVisualSurface(diagram: DiagramId | undefined): string {
  if (diagram === 'vivox-flow') return 'surface-inverse blueprint'
  if (diagram === 'office-network' || diagram === 'bots-flow' || diagram === 'admin-resilience') {
    return 'surface-base blueprint'
  }
  return 'surface-base'
}
