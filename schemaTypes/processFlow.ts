import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'processFlow',
  title: 'Process Flow',
  type: 'object',
  description: 'Steps joined by arrows, each with who owns it, plus an optional note about work being sent back.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional small label above the steps, e.g. "How every line got to the page".'
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      validation: Rule => Rule.required().min(2).max(5),
      of: [
        defineArrayMember({
          name: 'flowStep',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Step',
              type: 'string',
              description: 'e.g. "Compliance review"',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'owner',
              title: 'Owner',
              type: 'string',
              description: 'Optional, e.g. "Legal" or "Me, with Communications".'
            }),
            defineField({
              name: 'highlight',
              title: 'Highlight this step',
              type: 'boolean',
              description: 'Marks it in the accent colour, e.g. the step where things got hard.',
              initialValue: false
            })
          ],
          preview: {select: {title: 'title', subtitle: 'owner'}}
        })
      ]
    }),
    defineField({
      name: 'loopNote',
      title: 'Sent-back note',
      type: 'string',
      description:
        'Optional note shown with a return arrow under the steps, e.g. "Each review round sent amendments back to the draft."'
    })
  ],
  preview: {
    select: {title: 'title', steps: 'steps'},
    prepare({title, steps}) {
      const names = (steps || []).map((s: {title?: string}) => s?.title).filter(Boolean)
      return {title: title || names.join(' → ') || 'Process Flow', subtitle: 'Process Flow'}
    }
  }
})
