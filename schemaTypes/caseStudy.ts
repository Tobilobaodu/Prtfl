import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'The project this case study belongs to. The project\'s hero image is used as the default hero unless a Hero Section component is added below.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'components',
      title: 'Page Components',
      type: 'array',
      description:
        'Build the case study page here. Add a Hero Section component as the first item to override the default project hero image with custom headline, subtext and image. Only one Hero Section is allowed.',
      of: [
        { type: 'heroSection' },
        { type: 'textBlock' },
        { type: 'sectionTitleBlock' },
        { type: 'tagBlock' },
        { type: 'imageComponent' },
        { type: 'videoComponent' },
        { type: 'sliderComponent' },
        { type: 'spacer' },
        { type: 'sectionDivider' },
      ],
      validation: (Rule) =>
        Rule.custom((components: Array<{ _type: string }> | undefined) => {
          if (!components) return true
          const heroCount = components.filter((c) => c._type === 'heroSection').length
          if (heroCount > 1) return 'Only one Hero Section is allowed per case study.'
          const heroIsNotFirst = heroCount === 1 && components[0]._type !== 'heroSection'
          if (heroIsNotFirst) return 'The Hero Section must be the first component.'
          return true
        }),
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      description:
        'Up to 8 projects shown in the side panel. Leave empty to auto-populate from featured/homepage/sandbox projects.',
      validation: (Rule) => Rule.max(8),
    }),
  ],
  preview: {
    select: {
      projectTitle: 'project.title',
      projectClient: 'project.client',
      projectImage: 'project.heroImage',
    },
    prepare({ projectTitle, projectClient, projectImage }) {
      return {
        title: projectTitle || 'Untitled Case Study',
        subtitle: projectClient || '',
        media: projectImage,
      }
    },
  },
})
