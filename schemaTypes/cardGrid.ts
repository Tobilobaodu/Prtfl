import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'cardGrid',
  title: 'Card Grid',
  type: 'object',
  description:
    'Short cards side by side, each a heading and a sentence or two, e.g. the groups the design had to satisfy.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional small label above the cards, e.g. "Who the page had to serve".'
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      description: 'Up to four sit in one row; five or six sit three to a row.',
      validation: Rule => Rule.required().min(2).max(6),
      of: [
        defineArrayMember({
          name: 'card',
          title: 'Card',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'e.g. "Brokers"',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'body',
              title: 'Text',
              type: 'text',
              rows: 2
            })
          ],
          preview: {select: {title: 'heading', subtitle: 'body'}}
        })
      ]
    })
  ],
  preview: {
    select: {title: 'title', cards: 'cards'},
    prepare({title, cards}) {
      const headings = (cards || []).map((c: {heading?: string}) => c?.heading).filter(Boolean)
      return {title: title || headings.join(', ') || 'Card Grid', subtitle: 'Card Grid'}
    }
  }
})
