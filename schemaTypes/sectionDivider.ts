import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'sectionDivider',
  title: 'Section Divider',
  type: 'object',
  fields: [
    defineField({
      name: 'tag',
      title: 'Section Tag',
      type: 'string',
      description: 'e.g., "01 Discovery", "02 Strategy"'
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string'
    }),
    defineField({
      name: 'dividerStyle',
      title: 'Divider Style',
      type: 'string',
      options: {
        list: [
          {title: 'Line', value: 'line'},
          {title: 'Double Line', value: 'double-line'},
          {title: 'Dotted', value: 'dotted'},
          {title: 'None', value: 'none'}
        ]
      },
      initialValue: 'line'
    })
  ],
  preview: {
    select: {
      tag: 'tag',
      title: 'title'
    },
    prepare({tag, title}) {
      return {
        title: tag || 'Section',
        subtitle: title || 'New section'
      }
    }
  }
})
