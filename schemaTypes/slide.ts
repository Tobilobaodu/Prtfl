import {defineType, defineField} from 'sanity'

/**
 * Lifted out of sliderComponent's `slides` array.
 *
 * Sanity's GraphQL extractor needs a named top-level type for every object
 * shape; an object declared inline inside an array has a Studio name but no
 * type to generate from, which is what broke `sanity graphql deploy`.
 *
 * The name must stay `slide`. Sanity stores an inline array-object's `_type`
 * as its name, so existing content already carries `_type: 'slide'` — keeping
 * it makes this change byte-identical in the dataset and needs no migration.
 */
export default defineType({
  name: 'slide',
  title: 'Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Slide Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'statLeft',
      title: 'Left Stat',
      type: 'string',
      description: 'e.g. "Litigation Rate under 1%"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'statRight',
      title: 'Right Stat',
      type: 'string',
      description: 'e.g. "Backed by giants"',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      statLeft: 'statLeft',
      statRight: 'statRight',
      media: 'image',
    },
    prepare({statLeft, statRight, media}) {
      return {
        title: statLeft || 'Slide',
        subtitle: statRight || '',
        media,
      }
    },
  },
})
