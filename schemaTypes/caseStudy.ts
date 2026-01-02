import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{type: 'project'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      description: 'Projects shown in the side panel (max 8). Leave empty for automatic population from featured/homepage/sandbox projects.',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'project'}]
      }],
      validation: Rule => Rule.max(8)
    }),
    defineField({
      name: 'components',
      title: 'Page Components',
      type: 'array',
      of: [
        {type: 'textBlock'},
        {type: 'sectionTitleBlock'},
        {type: 'tagBlock'},
        {type: 'imageComponent'},
        {type: 'videoComponent'},
        {type: 'spacer'},
        {type: 'sectionDivider'}
      ]
    })
  ],
  preview: {
    select: {
      title: 'project.title',
      client: 'project.client',
      heroImage: 'project.heroImage'
    },
    prepare({title, client, heroImage}) {
      return {
        title: title || 'Untitled Case Study',
        subtitle: client || 'No project selected',
        media: heroImage
      }
    }
  }
})
