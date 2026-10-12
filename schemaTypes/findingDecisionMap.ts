import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'findingDecisionMap',
  title: 'Finding → Decision Map',
  type: 'object',
  description: 'Rows linking each finding, with where it came from, to the decision it led to.',
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      validation: Rule => Rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'mapRow',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'finding',
              title: 'Finding',
              type: 'string',
              description: 'e.g. "Five clicks to reach a product page"',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'source',
              title: 'Source',
              type: 'string',
              description: 'Optional, shown in brackets, e.g. "analytics" or "interviews, then testing".'
            }),
            defineField({
              name: 'decision',
              title: 'Decision',
              type: 'string',
              description: 'e.g. "01 · Two clicks to a product page"',
              validation: Rule => Rule.required()
            })
          ],
          preview: {
            select: {finding: 'finding', decision: 'decision'},
            prepare({finding, decision}) {
              return {title: finding, subtitle: `→ ${decision || ''}`}
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {rows: 'rows'},
    prepare({rows}) {
      const count = (rows || []).length
      return {title: `${count} finding${count === 1 ? '' : 's'} → decisions`, subtitle: 'Finding → Decision Map'}
    }
  }
})
