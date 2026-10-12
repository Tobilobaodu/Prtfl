import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'calloutBanner',
  title: 'Callout Banner',
  type: 'object',
  description: 'A small label above a large statement, on a dark panel, e.g. a shared target.',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g. "Shared target"'
    }),
    defineField({
      name: 'statement',
      title: 'Statement',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {title: 'statement', label: 'label'},
    prepare({title, label}) {
      return {title: title || 'Callout Banner', subtitle: label ? `Callout Banner · ${label}` : 'Callout Banner'}
    }
  }
})
