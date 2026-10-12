import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'journeyCards',
  title: 'Journey Cards',
  type: 'object',
  description:
    'Steps of a journey as cards joined by arrows, each with a big number, e.g. where users dropped out. Steps are numbered 01, 02 … automatically.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional small label above the cards, e.g. "Where brokers dropped out".'
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      validation: Rule => Rule.required().min(2).max(6),
      of: [
        defineArrayMember({
          name: 'journeyStep',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'step',
              title: 'Step name',
              type: 'string',
              description: 'e.g. "Homepage". The 01, 02 … is added automatically.',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'value',
              title: 'Number',
              type: 'string',
              description: 'e.g. "5 clicks", "35%", "8 in 10".',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'body',
              title: 'Description',
              type: 'string',
              description: 'e.g. "on average to reach a product page"'
            })
          ],
          preview: {
            select: {step: 'step', value: 'value'},
            prepare({step, value}) {
              return {title: step, subtitle: value}
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {title: 'title', steps: 'steps'},
    prepare({title, steps}) {
      const names = (steps || []).map((s: {step?: string}) => s?.step).filter(Boolean)
      return {title: title || names.join(' → ') || 'Journey Cards', subtitle: 'Journey Cards'}
    }
  }
})
