import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'iconHeadingBlock',
  title: 'Icon Heading Block',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {hotspot: false},
      description: 'Icon image displayed above the heading, 100px wide'
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'Optional yellow tag above the heading, e.g. "01. Problem"'
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'bodyParagraphs',
      title: 'Body Paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      description: 'Each item renders as a separate paragraph'
    })
  ],
  preview: {
    select: {
      heading: 'heading',
      tag: 'tag'
    },
    prepare({heading, tag}) {
      return {
        title: heading || 'Icon Heading Block',
        subtitle: tag ? `Icon Heading Block · ${tag}` : 'Icon Heading Block'
      }
    }
  }
})
