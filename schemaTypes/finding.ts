import {defineType, defineField} from 'sanity'

/**
 * Lifted out of numberedFindings' `items` array — Sanity's GraphQL extractor
 * needs a named top-level type for every object shape.
 */
export default defineType({
  name: 'finding',
  title: 'Finding',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 3})
  ],
  preview: {
    select: {title: 'heading', subtitle: 'body'}
  }
})
