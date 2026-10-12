import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'statsBand',
  title: 'Stats Band',
  type: 'object',
  description: 'Headline numbers, each with a short label. The numbers use the case study accent colour.',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Row: numbers side by side between two rules', value: 'row'},
          {title: 'Cards: large numbers on grey cards, for the main results', value: 'cards'},
          {title: 'List: smaller numbers in a ruled list, for secondary results', value: 'list'}
        ],
        layout: 'radio'
      },
      initialValue: 'row'
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      validation: Rule => Rule.required().min(1).max(6),
      of: [
        defineArrayMember({
          name: 'stat',
          title: 'Stat',
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
              name: 'tag',
              title: 'Tag',
              type: 'string',
              description: 'Optional small label above the number, e.g. "Goal 01".'
            })
          ],
          preview: {
            select: {value: 'value', label: 'label', tag: 'tag'},
            prepare({value, label, tag}) {
              return {title: [value, label].filter(Boolean).join(' '), subtitle: tag}
            }
          }
        })
      ]
    }),
    defineField({
      name: 'footnote',
      title: 'Footnote',
      type: 'string',
      description: 'Optional small note under the numbers, e.g. "Measured over the first 30 days after launch."'
    })
  ],
  preview: {
    select: {stats: 'stats', layout: 'layout'},
    prepare({stats, layout}) {
      const values = (stats || []).map((s: {value?: string}) => s?.value).filter(Boolean)
      return {title: values.join(' · ') || 'Stats Band', subtitle: `Stats Band (${layout || 'row'})`}
    }
  }
})
