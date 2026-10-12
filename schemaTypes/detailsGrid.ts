import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'detailsGrid',
  title: 'Details Grid',
  type: 'object',
  description:
    'Pairs of a small label and some text, e.g. Role / Timeline / Team / Constraint, or how the research was run.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional small label above the grid, e.g. "How I ran it".'
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Compact: short values, several across', value: 'compact'},
          {title: 'Wide: longer text, two across', value: 'wide'}
        ],
        layout: 'radio'
      },
      initialValue: 'compact'
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      validation: Rule => Rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'detailItem',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'body',
              title: 'Text',
              type: 'text',
              rows: 2,
              validation: Rule => Rule.required()
            })
          ],
          preview: {select: {title: 'label', subtitle: 'body'}}
        })
      ]
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 2,
      description: 'Optional caveat under the grid, e.g. about who was in the sample.'
    })
  ],
  preview: {
    select: {title: 'title', items: 'items'},
    prepare({title, items}) {
      const labels = (items || []).map((i: {label?: string}) => i?.label).filter(Boolean)
      return {title: title || labels.join(' / ') || 'Details Grid', subtitle: 'Details Grid'}
    }
  }
})
