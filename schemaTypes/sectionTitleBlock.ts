import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'sectionTitleBlock',
  title: 'Section Title',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({title}) {
      return {
        title: 'Section Title',
        subtitle: title || 'Empty title'
      }
    }
  }
})
