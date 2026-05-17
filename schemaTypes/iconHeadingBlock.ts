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
      description: 'Icon image displayed above the heading (49×49)'
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
      heading: 'heading'
    },
    prepare({heading}) {
      return {
        title: heading || 'Icon Heading Block',
        subtitle: 'Icon Heading Block'
      }
    }
  }
})
