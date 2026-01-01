import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Block Type',
      type: 'string',
      options: {
        list: [
          {title: 'Section Title', value: 'sectionTitle'},
          {title: 'Body Text', value: 'bodyText'},
          {title: 'Tag', value: 'tag'}
        ]
      },
      initialValue: 'bodyText',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      type: 'type',
      content: 'content'
    },
    prepare({type, content}: {type?: string, content?: any[]}) {
      const typeLabels: Record<string, string> = {
        sectionTitle: 'Section Title',
        bodyText: 'Body Text',
        tag: 'Tag'
      }
      const plainText = content?.[0]?.children?.[0]?.text || ''
      return {
        title: typeLabels[type || 'bodyText'] || 'Text Block',
        subtitle: plainText.slice(0, 50) + (plainText.length > 50 ? '...' : '') || 'Empty text block'
      }
    }
  }
})
