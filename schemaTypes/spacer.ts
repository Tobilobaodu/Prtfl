import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'spacer',
  title: 'Spacer',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'Space Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small (20px)', value: 'small'},
          {title: 'Medium (40px)', value: 'medium'},
          {title: 'Large (80px)', value: 'large'},
          {title: 'Extra Large (120px)', value: 'xlarge'}
        ]
      },
      initialValue: 'medium'
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
