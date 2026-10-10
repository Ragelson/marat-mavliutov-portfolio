import type { DiagramId } from '../../types/project.ts'
import { OfficeNetworkDiagram } from './OfficeNetworkDiagram.tsx'
import { VivoAiDiagram } from './VivoAiDiagram.tsx'

/** Связывает идентификатор схемы из данных проекта с компонентом, который её рисует. */
export function ProjectDiagram({ id }: { id: DiagramId }) {
  switch (id) {
    case 'vivoai-flow':
      return <VivoAiDiagram />
    case 'office-network':
      return <OfficeNetworkDiagram />
  }
}
