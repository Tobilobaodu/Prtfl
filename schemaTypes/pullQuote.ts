import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pullQuote',
  title: 'Pull Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      description: 'Quotation marks are not added automatically — include them if you want them.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'Rendered in small caps beneath the quote, e.g. "Independent mortgage broker".'
    })
  ],
  preview: {
    select: {quote: 'quote', attribution: 'attribution'},
    prepare({quote, attribution}) {
      return {
        title: quote || 'Pull Quote',
        subtitle: attribution || 'Pull Quote'
      }
    }
  }
})
