import { describe, expect, it } from 'vitest'
import type { Project } from '../types/project.ts'
import { getAvailableCategories, getPublishedProjectBySlug, getPublishedProjects } from './projects.ts'

function makeProject(overrides: Partial<Project> & Pick<Project, 'slug'>): Project {
  return {
    title: overrides.slug,
    summary: 'Описание',
    categories: ['frontend'],
    stack: [],
    featured: false,
    publicationStatus: 'published',
    ...overrides,
  }
}

const fixtures: Project[] = [
  makeProject({ slug: 'regular', categories: ['infrastructure'] }),
  makeProject({ slug: 'hidden', categories: ['docs'], publicationStatus: 'draft' }),
  makeProject({ slug: 'main', categories: ['ai'], featured: true }),
]

describe('выборка проектов', () => {
  it('не включает draft-проекты и ставит приоритетные первыми', () => {
    expect(getPublishedProjects(fixtures).map((p) => p.slug)).toEqual(['main', 'regular'])
  })

  it('не находит draft-проект по slug', () => {
    expect(getPublishedProjectBySlug('hidden', fixtures)).toBeUndefined()
    expect(getPublishedProjectBySlug('regular', fixtures)?.slug).toBe('regular')
  })

  it('не показывает категории без опубликованных проектов', () => {
    expect(getAvailableCategories(getPublishedProjects(fixtures))).toEqual(['infrastructure', 'ai'])
  })
})
