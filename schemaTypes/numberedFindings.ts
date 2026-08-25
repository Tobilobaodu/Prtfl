import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'numberedFindings',
  title: 'Numbered Findings',
  type: 'object',
  description: 'An ordered list of findings with a heading and a paragraph each.',
  fields: [
    defineField({
      name: 'items',
      title: 'Findings',
      type: 'array',
      description: 'Numbers are generated from the order here — reorder freely, 01/02/03 follows.',
      // Defined as a top-level type in ./finding.ts — the GraphQL extractor
      // cannot generate a type from an object declared inline in an array.
      of: [{type: 'finding'}],
      validation: Rule => Rule.min(1)
    })
  ],
  preview: {
    select: {items: 'items'},
    prepare({items}) {
      const count = items?.length || 0
      return {
        title: `Numbered Findings (${count})`,
        subtitle: items?.[0]?.heading || 'Numbered Findings'
      }
    }
  }
})
