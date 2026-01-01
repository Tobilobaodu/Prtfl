import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'tagBlock',
  title: 'Tag',
  type: 'object',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag Text',
      type: 'string',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      tag: 'tag'
    },
    prepare({tag}) {
      return {
        title: 'Tag',
        subtitle: tag || 'Empty tag'
      }
    }
  }
})
