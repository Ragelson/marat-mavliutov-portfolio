import { useDocumentMeta } from '../../hooks/useDocumentMeta.ts'
import { AboutSection } from './AboutSection.tsx'
import { AgentsSection } from './AgentsSection.tsx'
import { ContactsSection } from './ContactsSection.tsx'
import { Hero } from './Hero.tsx'
import { WorkSection } from './WorkSection.tsx'

export function HomePage() {
  useDocumentMeta({ path: '/' })

  return (
    <>
      <Hero />
      <WorkSection />
      <AgentsSection />
      <AboutSection />
      <ContactsSection />
    </>
  )
}
