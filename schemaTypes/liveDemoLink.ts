import {defineType, defineField} from 'sanity'
import {demoLinkFields, DEMOS} from './demos'

/**
 * A single row: optional text on the left, a "View live demo" link on the
 * right. The same link the Before and After Slider can show under its frame,
 * for places with no slider.
 */
export default defineType({
  name: 'liveDemoLink',
  title: 'Live Demo Link',
  type: 'object',
  description: 'A link to a live demo, with an optional line of text beside it.',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      description: 'Optional line on the left, e.g. what the demo shows.'
    }),
    ...demoLinkFields({required: true})
  ],
  preview: {
    select: {demo: 'demo', linkUrl: 'linkUrl', label: 'linkLabel', text: 'text'},
    prepare({demo, linkUrl, label, text}) {
      const name = DEMOS.find(d => d.value === demo)?.title || linkUrl || 'No link yet'
      return {title: label || 'View live demo', subtitle: text ? `${name} · ${text}` : name}
    }
  }
})
