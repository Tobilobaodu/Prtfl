import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'imageComponent',
  title: 'Image Component',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Single Image', value: 'single'},
          {title: '2-Column Grid', value: 'grid-2'},
          {title: '3-Column Grid', value: 'grid-3'},
          {title: '4-Column Grid', value: 'grid-4'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [
          defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string'
          }),
          defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string'
          })
        ]
      }],
      validation: Rule => Rule.custom((images, context: any) => {
        const layout = context.parent?.layout
        if (layout === 'single' && images?.length !== 1) {
          return 'Single layout requires exactly 1 image'
        }
        if (layout === 'grid-2' && images?.length !== 2) {
          return '2-column grid requires exactly 2 images'
        }
        if (layout === 'grid-3' && images?.length !== 3) {
          return '3-column grid requires exactly 3 images'
        }
        if (layout === 'grid-4' && images?.length !== 4) {
          return '4-column grid requires exactly 4 images'
        }
        return true
      })
    }),
    defineField({
      name: 'enableGaps',
      title: 'Enable Gaps Between Images',
      type: 'boolean',
      initialValue: true,
      description: 'Show gaps between grid images'
    }),
    defineField({
      name: 'fullHeightImage',
      title: 'Full Height Image (3-Grid Only)',
      type: 'number',
      description: 'Which image should be full height in 3-grid layout (1, 2, or 3)',
      validation: Rule => Rule.custom((value, context) => {
        const layout = context.parent?.layout
        if (layout === 'grid-3' && (!value || value < 1 || value > 3)) {
          return 'Must be 1, 2, or 3 for 3-grid layout'
        }
        return true
      }),
      initialValue: 1
    })
  ],
  preview: {
    select: {
      layout: 'layout',
      images: 'images'
    },
    prepare({layout, images}) {
      const imageCount = images?.length || 0
      return {
        title: 'Image Component',
        subtitle: `${layout} - ${imageCount} image${imageCount !== 1 ? 's' : ''}`
      }
    }
  }
})
