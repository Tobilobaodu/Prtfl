import {defineType, defineField} from 'sanity'

/**
 * Lifted out of iconPodGrid's `pods` array — Sanity's GraphQL extractor needs
 * a named top-level type for every object shape.
 *
 * Named `iconPod` rather than `pod` to avoid colliding with ./imagePod.ts,
 * which is lifted from a field of the same name but holds a different shape.
 */
export default defineType({
  name: 'iconPod',
  title: 'Pod',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {hotspot: false},
      description: 'Rendered at 42x47.'
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 4})
  ],
  preview: {
    select: {title: 'heading', media: 'icon'},
    prepare({title, media}) {
      return {title: title || 'Pod', media}
    }
  }
})
