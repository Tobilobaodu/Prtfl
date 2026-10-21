import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'hierarchyDiagram',
  title: 'Hierarchy Diagram',
  type: 'object',
  description:
    'A site map: a top level page, the sections under it and their pages, with an optional before and after click count.',
  fieldsets: [
    {
      name: 'clicks',
      title: 'Click comparison',
      description: 'Optional. Shown as a row of squares for before and after, one per click.',
      options: {collapsible: true, collapsed: false}
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional small label, e.g. "New hierarchy".'
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      description: 'Optional note beside the title, e.g. "Click 1: a section. Click 2: a product or task."'
    }),
    defineField({
      name: 'root',
      title: 'Top level',
      type: 'string',
      description: 'The page everything sits under, e.g. "Homepage".',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      validation: Rule => Rule.required().min(1).max(6),
      of: [
        defineArrayMember({
          name: 'hierarchySection',
          title: 'Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section',
              type: 'string',
              description: 'e.g. "Product transfers"',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'items',
              title: 'Pages under it',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Optional, e.g. "Residential" and "Buy-to-let".'
            })
          ],
          preview: {
            select: {title: 'title', items: 'items'},
            prepare({title, items}) {
              return {title, subtitle: (items || []).join(', ')}
            }
          }
        })
      ]
    }),
    defineField({
      name: 'clicksBefore',
      title: 'Clicks before',
      type: 'number',
      fieldset: 'clicks',
      validation: Rule => Rule.integer().min(1).max(12)
    }),
    defineField({
      name: 'clicksBeforeLabel',
      title: 'Before label',
      type: 'string',
      fieldset: 'clicks',
      description: 'e.g. "5 clicks on average". Leave empty for "5 clicks".'
    }),
    defineField({
      name: 'clicksAfter',
      title: 'Clicks after',
      type: 'number',
      fieldset: 'clicks',
      validation: Rule => Rule.integer().min(1).max(12)
    }),
    defineField({
      name: 'clicksAfterLabel',
      title: 'After label',
      type: 'string',
      fieldset: 'clicks',
      description: 'Leave empty for "2 clicks".'
    })
  ],
  preview: {
    select: {title: 'title', root: 'root', sections: 'sections'},
    prepare({title, root, sections}) {
      const names = (sections || []).map((s: {title?: string}) => s?.title).filter(Boolean)
      return {
        title: title || root || 'Hierarchy Diagram',
        subtitle: names.length ? `Hierarchy Diagram: ${names.join(', ')}` : 'Hierarchy Diagram'
      }
    }
  }
})
