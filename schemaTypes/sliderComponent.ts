import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'sliderComponent',
  title: 'Slider Component',
  type: 'object',
  fields: [
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      description: 'Add up to 3 slides. Each slide contains an image and two stat columns.',
      of: [
        {
          type: 'object',
          name: 'slide',
          title: 'Slide',
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
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(3)
          .error('Slider requires between 1 and 3 slides'),
    }),
  ],
  preview: {
    select: {
      slides: 'slides',
    },
    prepare({slides}) {
      const count = slides?.length || 0
      return {
        title: 'Slider Component',
        subtitle: `${count} slide${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
