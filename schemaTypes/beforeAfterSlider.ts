import {defineType, defineField} from 'sanity'

/**
 * Two images stacked in one frame with a draggable divider: drag left to
 * reveal more of the after image, right for more of the before. Use two
 * images of the same screen at the same size, or the comparison drifts.
 */
export default defineType({
  name: 'beforeAfterSlider',
  title: 'Before and After Slider',
  type: 'object',
  description:
    'Two images in one frame with a line the reader drags to compare them. Use the same screen, exported at the same size.',
  fields: [
    defineField({
      name: 'beforeImage',
      title: 'Before image',
      type: 'image',
      validation: Rule => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'What the old design shows, for screen readers.'
        })
      ]
    }),
    defineField({
      name: 'afterImage',
      title: 'After image',
      type: 'image',
      description: 'Sets the frame’s shape; the before image is cropped to match.',
      validation: Rule => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'What the new design shows, for screen readers.'
        })
      ]
    }),
    defineField({
      name: 'beforeLabel',
      title: 'Before label',
      type: 'string',
      initialValue: 'Before'
    }),
    defineField({
      name: 'afterLabel',
      title: 'After label',
      type: 'string',
      initialValue: 'After'
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional line under the frame.'
    })
  ],
  preview: {
    select: {media: 'afterImage', caption: 'caption'},
    prepare({media, caption}) {
      return {title: caption || 'Before and After Slider', subtitle: 'Before and After Slider', media}
    }
  }
})
