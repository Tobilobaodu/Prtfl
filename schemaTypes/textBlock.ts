import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'blockType',
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
      type: 'string',
      validation: Rule => Rule.required(),
      hidden: ({parent}) => parent?.blockType === 'bodyText'
    }),
    defineField({
      name: 'richContent',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required(),
      hidden: ({parent}) => parent?.blockType !== 'bodyText'
    })
  ],
  preview: {
    select: {
      blockType: 'blockType',
      content: 'content'
    },
    prepare({blockType, content}: {blockType?: string, content?: string}) {
      const typeLabels: Record<string, string> = {
        sectionTitle: 'Section Title',
        bodyText: 'Body Text',
        tag: 'Tag'
      }
      return {
        title: typeLabels[blockType || 'bodyText'] || 'Text Block',
        subtitle: content ? (content.slice(0, 50) + (content.length > 50 ? '...' : '')) : 'Empty text block'
      }
    }
  }
})
