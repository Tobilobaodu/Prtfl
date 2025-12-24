import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'textSize',
      title: 'Text Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'}
        ]
      },
      initialValue: 'medium'
    }),
    defineField({
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'}
        ]
      },
      initialValue: 'left'
    })
  ],
  preview: {
    select: {
      content: 'content'
    },
    prepare({content}) {
      return {
        title: 'Text Block',
        subtitle: content?.[0]?.children?.[0]?.text?.slice(0, 50) + '...' || 'Empty text block'
      }
    }
  }
})
