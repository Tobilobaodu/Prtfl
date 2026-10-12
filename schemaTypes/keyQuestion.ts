import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'keyQuestion',
  title: 'Key Question',
  type: 'object',
  description:
    'One very large statement, such as a "How might we" question, with part of it picked out in the case study accent colour.',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Optional small label above, e.g. "The question I designed for".'
    }),
    defineField({
      name: 'statement',
      title: 'Statement',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'highlight',
      title: 'Highlighted words',
      type: 'string',
      description:
        'Optional. Copy the words to colour exactly as they appear in the statement, e.g. "without leaving the page?".',
      validation: Rule =>
        Rule.custom((highlight, context) => {
          if (!highlight) return true
          const statement = (context.parent as {statement?: string})?.statement || ''
          return statement.includes(highlight)
            ? true
            : 'These words must appear exactly as written in the statement.'
        })
    })
  ],
  preview: {
    select: {title: 'statement', label: 'label'},
    prepare({title, label}) {
      return {title: title || 'Key Question', subtitle: label || 'Key Question'}
    }
  }
})
