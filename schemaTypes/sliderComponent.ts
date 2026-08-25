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
      // Defined as a top-level type in ./slide.ts — see the note there for why
      // it cannot live inline.
      of: [{type: 'slide'}],
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
