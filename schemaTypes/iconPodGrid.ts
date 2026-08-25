import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'iconPodGrid',
  title: 'Icon Pod Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'pods',
      title: 'Pods',
      type: 'array',
      description: 'Two columns on desktop, one below 768px. Any number of pods works.',
      // Defined as a top-level type in ./iconPod.ts — the GraphQL extractor
      // cannot generate a type from an object declared inline in an array.
      of: [{type: 'iconPod'}],
      validation: Rule => Rule.min(1)
    })
  ],
  preview: {
    select: {
      pods: 'pods',
      media: 'pods.0.icon'
    },
    prepare({pods, media}) {
      const count = pods?.length || 0
      return {
        title: `Icon Pod Grid (${count})`,
        subtitle: pods?.[0]?.heading || 'Icon Pod Grid',
        media
      }
    }
  }
})
