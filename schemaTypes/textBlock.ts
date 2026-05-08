import {defineType, defineField} from 'sanity'

const typographyOptions = [
  {title: 'Body / Small', value: 'type-body-small'},
  {title: 'Body / Small Semibold', value: 'type-body-small-semibold'},
  {title: 'Body / Small Bold', value: 'type-body-small-bold'},
  {title: 'Body / XSmall', value: 'type-body-xsmall'},
  {title: 'Title / XSmall', value: 'type-title-xsmall'},
  {title: 'Title / Small', value: 'type-title-small'},
  {title: 'Title / Medium', value: 'type-title-medium'},
  {title: 'Title / Large', value: 'type-title-large'},
  {title: 'Display / Small', value: 'type-display-small'},
  {title: 'Display / Medium', value: 'type-display-medium'},
  {title: 'Display / Large', value: 'type-display-large'},
  {title: 'Display / XLarge', value: 'type-display-xlarge'},
  {title: 'Tag', value: 'tag'}
]

const typeLabels: Record<string, string> = Object.fromEntries(
  typographyOptions.map(option => [option.value, option.title])
)

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Typography Style',
      type: 'string',
      options: {
        list: typographyOptions
      },
      initialValue: 'type-body-small',
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
      const plainText = content?.[0]?.children?.[0]?.text || ''
      return {
        title: typeLabels[type || 'type-body-small'] || 'Text Block',
        subtitle: plainText.slice(0, 50) + (plainText.length > 50 ? '...' : '') || 'Empty text block'
      }
    }
  }
})
