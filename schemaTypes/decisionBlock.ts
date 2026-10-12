import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'decisionBlock',
  title: 'Decision',
  type: 'object',
  description:
    'A numbered design decision: a large number, a "Decision 01" label and a title, then labelled columns such as The problem / What I did / Evidence. Add images or notes for the decision as separate blocks after it.',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'number',
      description: 'Shown large beside the title, as 01, 02 …',
      validation: Rule => Rule.required().integer().min(1).max(99)
    }),
    defineField({
      name: 'eyebrow',
      title: 'Label',
      type: 'string',
      description: 'Small label above the title. Leave empty for "Decision 01", using the number above.'
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      description: 'Usually three: The problem / What I did / Evidence. Any labels work.',
      validation: Rule => Rule.max(4),
      of: [
        defineArrayMember({
          name: 'decisionColumn',
          title: 'Column',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'body',
              title: 'Text',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            })
          ],
          preview: {select: {title: 'label', subtitle: 'body'}}
        })
      ]
    })
  ],
  preview: {
    select: {number: 'number', title: 'title'},
    prepare({number, title}) {
      const n = number ? String(number).padStart(2, '0') : '—'
      return {title: title || 'Decision', subtitle: `Decision ${n}`}
    }
  }
})
