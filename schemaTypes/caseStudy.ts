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
      name: 'accentColor',
      title: 'Accent colour',
      type: 'color',
      description:
        'Used across this case study: stat numbers, highlighted words, the chosen option, highlighted process steps, and any Pull Quote without its own colour. Leave empty for the site orange. Pick something dark enough to read on the light page background.',
      options: {
        disableAlpha: true,
        colorList: ['#EE550E', '#EC3013', '#B73764', '#201E1D'],
      },
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
        { type: 'iconHeadingBlock' },
        { type: 'ndaNotice' },
        { type: 'spacer' },
        { type: 'sectionDivider' },
        { type: 'splitHero' },
        { type: 'imagePodGrid' },
        { type: 'iconPodGrid' },
        { type: 'numberedFindings' },
        { type: 'pullQuote' },
        { type: 'objectivesList' },
        { type: 'decisionBlock' },
        { type: 'statsBand' },
        { type: 'detailsGrid' },
        { type: 'journeyCards' },
        { type: 'calloutBanner' },
        { type: 'keyQuestion' },
        { type: 'optionsComparison' },
        { type: 'findingDecisionMap' },
        { type: 'processFlow' },
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
        'Up to 4 projects for the "More projects" list at the end of the case study. Your picks come first; featured, homepage and sandbox projects fill any remaining rows.',
      validation: (Rule) => Rule.max(4),
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
