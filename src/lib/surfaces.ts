import type { DiagramId } from '../types/project.ts'

/**
 * Фон блока со схемой: VivoAI — контрастная тёмная панель, сеть — светлая техническая сетка.
 * Классы описаны в src/styles/globals.css.
 */
export function getVisualSurface(diagram: DiagramId | undefined): string {
  if (diagram === 'vivoai-flow') return 'surface-inverse blueprint'
  if (diagram === 'office-network') return 'surface-base blueprint'
  return 'surface-base'
}
