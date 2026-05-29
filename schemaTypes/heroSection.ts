import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main hero headline. Desktop: 80px, Tablet/Mobile: 45px. Font: Neue Haas Grotesk Display Pro 65 Medium.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 3,
      description: 'Supporting text below the headline. All breakpoints: 20px. Font: Neue Haas Grotesk Display Pro 55 Roman.',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Displayed below the subtext, e.g. "May 20th, 2023"',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Desktop/Tablet: 465×550px — Mobile: 313×350px',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'heroImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero Section',
        subtitle: 'Hero Section Component',
        media,
      }
    },
  },
})
