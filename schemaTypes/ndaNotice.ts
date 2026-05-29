import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ndaNotice',
  title: 'NDA Notice',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Notice Text',
      type: 'text',
      rows: 3,
      description: 'The NDA disclaimer text shown in the info box.',
      initialValue:
        'To comply with my non-disclosure agreement, I have omitted and obfuscated confidential information in this case study. All information in this case study is my own and does not necessarily reflect the views & facts of the company.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'text' },
    prepare({ title }) {
      return {
        title: 'NDA Notice',
        subtitle: title ? title.slice(0, 60) + '…' : '',
      }
    },
  },
})
