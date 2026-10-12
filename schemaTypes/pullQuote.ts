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
      description: 'Shown beneath the quote, e.g. "Independent mortgage broker".'
    }),
    defineField({
      name: 'color',
      title: 'Background colour',
      type: 'color',
      description:
        'Fills the quote panel. Leave empty to use the case study accent colour (or the site orange if that is empty too). The text turns white or black automatically, whichever reads better on the colour.',
      options: {
        disableAlpha: true,
        colorList: ['#EE550E', '#EC3013', '#B73764', '#201E1D']
      }
    })
  ],
  preview: {
    select: {quote: 'quote', attribution: 'attribution', hex: 'color.hex'},
    prepare({quote, attribution, hex}) {
      return {
        title: quote || 'Pull Quote',
        subtitle: [attribution || 'Pull Quote', hex].filter(Boolean).join(' · ')
      }
    }
  }
})
