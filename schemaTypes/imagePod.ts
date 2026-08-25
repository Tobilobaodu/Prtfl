import {defineType, defineField} from 'sanity'

/**
 * Lifted out of imagePodGrid's `pods` array — Sanity's GraphQL extractor needs
 * a named top-level type for every object shape.
 *
 * Named `imagePod` rather than `pod` because iconPodGrid lifts a differently
 * shaped object out of a field with the same name; two top-level types called
 * `pod` would collide. Renaming is free only while nothing has been authored
 * with it, which is the case today.
 */
export default defineType({
  name: 'imagePod',
  title: 'Pod',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string'})
      ]
    }),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3})
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare({title, media}) {
      return {title: title || 'Pod', media}
    }
  }
})
