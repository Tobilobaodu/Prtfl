import {defineType, defineField, defineArrayMember} from 'sanity'

type Parent = {layout?: string} | undefined

const isStatement = (parent: Parent) => parent?.layout === 'statement'
const isTimeline = (parent: Parent) => parent?.layout === 'timeline'

export default defineType({
  name: 'roleResults',
  title: 'Role and Results',
  type: 'object',
  description:
    'Your role, timeline, team and constraint together with the headline results, for the top of a case study. The numbers use the case study accent colour.',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'A. Results lead, details as a quiet strip underneath', value: 'statsLead'},
          {title: 'B. Details in a column on the left, results 2 by 2', value: 'sidebar'},
          {title: 'C. Details across the top, results in a dark panel', value: 'panel'},
          {title: 'D. One written statement with the numbers picked out', value: 'statement'},
          {title: 'E. Details and results in one ruled list', value: 'ledger'},
          {title: 'F. Timeline, with the results at the end', value: 'timeline'}
        ],
        layout: 'radio'
      },
      initialValue: 'statsLead'
    }),
    defineField({
      name: 'statement',
      title: 'Statement',
      type: 'text',
      rows: 4,
      description: 'Layout D only. What you did and what changed, with the numbers written in.',
      hidden: ({parent}) => !isStatement(parent),
      validation: Rule =>
        Rule.custom((value, context) =>
          isStatement(context.parent as Parent) && !value ? 'Layout D needs a statement' : true
        )
    }),
    defineField({
      name: 'highlights',
      title: 'Highlighted phrases',
      type: 'array',
      of: [{type: 'string'}],
      description:
        'Layout D only. Phrases from the statement to show in the accent colour, e.g. "15% more". Each must appear in the statement exactly as typed.',
      hidden: ({parent}) => !isStatement(parent)
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      description:
        'e.g. Role, Timeline, Team, Constraint. In layout D they are joined into one line under the statement. Not shown in layout F, which uses phases.',
      hidden: ({parent}) => isTimeline(parent),
      validation: Rule => Rule.max(6),
      of: [
        defineArrayMember({
          name: 'detail',
          title: 'Detail',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required()}),
            defineField({name: 'body', title: 'Text', type: 'string', validation: Rule => Rule.required()})
          ],
          preview: {select: {title: 'label', subtitle: 'body'}}
        })
      ]
    }),
    defineField({
      name: 'phases',
      title: 'Phases',
      type: 'array',
      description: 'Layout F only. Each phase is a dot on the timeline. The results are added as the last one.',
      hidden: ({parent}) => !isTimeline(parent),
      validation: Rule => Rule.max(4),
      of: [
        defineArrayMember({
          name: 'phase',
          title: 'Phase',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "Weeks 1–4 · Sprint"',
              validation: Rule => Rule.required()
            }),
            defineField({name: 'body', title: 'Text', type: 'string'}),
            defineField({
              name: 'note',
              title: 'Note',
              type: 'string',
              description: 'Optional smaller grey line, e.g. who you worked with.'
            })
          ],
          preview: {select: {title: 'label', subtitle: 'body'}}
        })
      ]
    }),
    defineField({
      name: 'stats',
      title: 'Results',
      type: 'array',
      description: 'Not shown in layout D, where the numbers are part of the statement.',
      hidden: ({parent}) => isStatement(parent),
      validation: Rule => Rule.max(6),
      of: [
        defineArrayMember({
          name: 'stat',
          title: 'Result',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Number',
              type: 'string',
              description: 'Text, so anything works: "60%", "5 → 2", "8 in 10".',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "fewer calls asking for guides and documents"',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              description: 'Layout E only. A small label on the right, e.g. "Conversion".'
            })
          ],
          preview: {select: {title: 'value', subtitle: 'label'}}
        })
      ]
    }),
    defineField({
      name: 'resultsLabel',
      title: 'Results label',
      type: 'string',
      description: 'Layouts A and F. The small heading over the results, e.g. "Day 30 · Results". Defaults to "Results".',
      hidden: ({parent}) => !['statsLead', 'timeline', undefined].includes(parent?.layout)
    }),
    defineField({
      name: 'footnote',
      title: 'Footnote',
      type: 'string',
      description: 'Optional, e.g. "Measured over the first 30 days after launch." Not shown in layout D.',
      hidden: ({parent}) => isStatement(parent)
    })
  ],
  preview: {
    select: {layout: 'layout', stats: 'stats', statement: 'statement'},
    prepare({layout, stats, statement}) {
      const values = (stats || []).map((s: {value?: string}) => s?.value).filter(Boolean)
      return {
        title: layout === 'statement' ? statement || 'Role and Results' : values.join(' · ') || 'Role and Results',
        subtitle: `Role and Results (${layout || 'statsLead'})`
      }
    }
  }
})
