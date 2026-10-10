import { describe, expect, it } from 'vitest'
import type { Project } from '../types/project.ts'
import {
  getFeaturedProjects,
  getNextPublishedProject,
  getOtherProjects,
  getPublishedProjectBySlug,
  getPublishedProjects,
} from './projects.ts'

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
  makeProject({ slug: 'main', featured: true }),
  makeProject({ slug: 'regular' }),
  makeProject({ slug: 'mentioned', publicationStatus: 'listed' }),
  makeProject({ slug: 'hidden', publicationStatus: 'draft', featured: true }),
]

describe('выборка проектов', () => {
  it('страницы кейсов есть только у published', () => {
    expect(getPublishedProjects(fixtures).map((p) => p.slug)).toEqual(['main', 'regular'])
    expect(getPublishedProjectBySlug('hidden', fixtures)).toBeUndefined()
    expect(getPublishedProjectBySlug('mentioned', fixtures)).toBeUndefined()
    expect(getPublishedProjectBySlug('regular', fixtures)?.slug).toBe('regular')
  })

  it('draft не попадает ни в избранное, ни в другие работы', () => {
    expect(getFeaturedProjects(fixtures).map((p) => p.slug)).toEqual(['main'])
    expect(getOtherProjects(fixtures).map((p) => p.slug)).toEqual(['regular', 'mentioned'])
  })

  it('следующий кейс идёт по кругу', () => {
    expect(getNextPublishedProject('main', fixtures)?.slug).toBe('regular')
    expect(getNextPublishedProject('regular', fixtures)?.slug).toBe('main')
  })
})
