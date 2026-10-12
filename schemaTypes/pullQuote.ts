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
      description:
        'An opening quote mark is added automatically, so leave quotation marks out of the text.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Who said it, shown in bold beneath the quote, e.g. "James Hardley". Optional.'
    }),
    // Stored as `attribution` because quotes written before the name field
    // existed hold the role there; renaming it would orphan that text.
    defineField({
      name: 'attribution',
      title: 'Role',
      type: 'string',
      description: 'Shown under the name, e.g. "Independent mortgage broker".'
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional photo beside the name, cropped to a circle.'
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
    select: {quote: 'quote', name: 'name', attribution: 'attribution', hex: 'color.hex', media: 'avatar'},
    prepare({quote, name, attribution, hex, media}) {
      return {
        title: quote || 'Pull Quote',
        subtitle: [name || attribution || 'Pull Quote', hex].filter(Boolean).join(' · '),
        media
      }
    }
  }
})
