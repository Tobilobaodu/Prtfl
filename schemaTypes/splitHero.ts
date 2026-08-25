import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'splitHero',
  title: 'Split Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Large display headline. Keep it short — it renders at up to 80px.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Sits to the right of the copy on desktop, beneath it on tablet and mobile.',
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string'})
      ]
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      description: 'Leave empty for no button.'
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Button link',
      type: 'string',
      description: 'Optional. Without it the label renders as static text rather than a link.'
    }),
    defineField({
      name: 'ctaLocked',
      title: 'Show lock icon on the button',
      type: 'boolean',
      initialValue: false
    })
  ],
  preview: {
    select: {
      headline: 'headline',
      media: 'image'
    },
    prepare({headline, media}) {
      return {
        title: headline || 'Split Hero',
        subtitle: 'Split Hero',
        media
      }
    }
  }
})
