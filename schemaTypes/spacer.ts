import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'spacer',
  title: 'Spacer',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'Space Size (px)',
      type: 'number',
      validation: Rule => Rule.min(5).max(100),
      initialValue: 20
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Spacer',
        subtitle: 'Adds vertical space'
      }
    }
  }
})
