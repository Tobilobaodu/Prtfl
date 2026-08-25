import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'objectivesList',
  title: 'Objectives List',
  type: 'object',
  description: 'A bordered box of numbered one-line objectives.',
  fields: [
    defineField({
      name: 'items',
      title: 'Objectives',
      type: 'array',
      of: [{type: 'string'}],
      description: 'One line each. Numbers are generated from the order here.',
      validation: Rule => Rule.min(1)
    })
  ],
  preview: {
    select: {items: 'items'},
    prepare({items}) {
      const count = items?.length || 0
      return {
        title: `Objectives List (${count})`,
        subtitle: items?.[0] || 'Objectives List'
      }
    }
  }
})
