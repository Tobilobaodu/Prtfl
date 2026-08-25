import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'imagePodGrid',
  title: 'Image Pod Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'pods',
      title: 'Pods',
      type: 'array',
      description: 'Three across on desktop, two on tablet, one on mobile. Any number of pods works.',
      // Defined as a top-level type in ./imagePod.ts — the GraphQL extractor
      // cannot generate a type from an object declared inline in an array.
      of: [{type: 'imagePod'}],
      validation: Rule => Rule.min(1)
    })
  ],
  preview: {
    select: {
      pods: 'pods',
      media: 'pods.0.image'
    },
    prepare({pods, media}) {
      const count = pods?.length || 0
      return {
        title: `Image Pod Grid (${count})`,
        subtitle: pods?.[0]?.title || 'Image Pod Grid',
        media
      }
    }
  }
})
