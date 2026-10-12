import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'optionsComparison',
  title: 'Options Comparison',
  type: 'object',
  description:
    'Options side by side, each with a status badge, a title and a description. Mark the one you went with as chosen to highlight it.',
  fields: [
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      validation: Rule => Rule.required().min(2).max(4),
      of: [
        defineArrayMember({
          name: 'option',
          title: 'Option',
          type: 'object',
          fields: [
            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              description: 'Badge text, e.g. "Explored and ruled out" or "The direction I took".',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'body',
              title: 'Description',
              type: 'text',
              rows: 3
            }),
            defineField({
              name: 'chosen',
              title: 'This is the option I chose',
              type: 'boolean',
              initialValue: false
            })
          ],
          preview: {
            select: {title: 'title', status: 'status', chosen: 'chosen'},
            prepare({title, status, chosen}) {
              return {title, subtitle: chosen ? `${status} (chosen)` : status}
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {options: 'options'},
    prepare({options}) {
      const titles = (options || []).map((o: {title?: string}) => o?.title).filter(Boolean)
      return {title: titles.join(' vs ') || 'Options Comparison', subtitle: 'Options Comparison'}
    }
  }
})
