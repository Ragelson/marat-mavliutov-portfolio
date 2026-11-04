import type { DiagramId } from '../../types/project.ts'
import { AdminResilienceDiagram } from './AdminResilienceDiagram.tsx'
import { BotsDiagram } from './BotsDiagram.tsx'
import { OfficeNetworkDiagram } from './OfficeNetworkDiagram.tsx'
import { VincArchitectureDiagram } from './VincArchitectureDiagram.tsx'
import { VivoXDiagram } from './VivoXDiagram.tsx'

/** Связывает идентификатор схемы из данных проекта с компонентом, который её рисует. */
export function ProjectDiagram({ id }: { id: DiagramId }) {
  switch (id) {
    case 'vivox-flow':
      return <VivoXDiagram />
    case 'office-network':
      return <OfficeNetworkDiagram />
    case 'bots-flow':
      return <BotsDiagram />
    case 'admin-resilience':
      return <AdminResilienceDiagram />
    case 'vinc-architecture':
      return <VincArchitectureDiagram />
  }
}
