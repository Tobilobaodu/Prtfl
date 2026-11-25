import {defineType, defineField, defineArrayMember} from 'sanity'
import {demoLinkFields, DEMOS} from './demos'

/**
 * A live HTML demo running inside an iPhone frame, with optional notes beside
 * it. Visitors use the app as normal; each note points at one part of a screen
 * and only shows while that part is on screen, so notes follow scrolling and
 * change with the screen. A screen with no notes shows none.
 *
 * The demo must be built at the iPhone screen size (402 x 874) and be served
 * from this site, so it can be shown in the frame and its parts can be found.
 */
export default defineType({
  name: 'phoneDemo',
  title: 'Phone Demo',
  type: 'object',
  description: 'A working app demo inside an iPhone frame, with notes that follow the screen.',
  fields: [
    ...demoLinkFields({required: true}).map(field =>
      field.name === 'demo'
        ? {...field, description: 'The app shown in the phone. Pick one of the demos on this site.'}
        : field.name === 'linkLabel'
          ? {...field, description: 'Text for the link under the phone that opens the demo on its own. Defaults to “Open demo in a new tab”.'}
          : field
    ),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional line under the phone.'
    }),
    defineField({
      name: 'statusBar',
      title: 'Status bar colour',
      type: 'string',
      description: 'The time, signal and battery icons at the top of the phone. Use light for a dark app.',
      options: {list: [{title: 'Dark', value: 'dark'}, {title: 'Light', value: 'light'}], layout: 'radio', direction: 'horizontal'},
      initialValue: 'dark'
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      description:
        'Each note points at a part of the app and shows only while that part is on screen. Leave empty for a plain phone.',
      of: [
        defineArrayMember({
          name: 'phoneNote',
          title: 'Note',
          type: 'object',
          fields: [
            defineField({
              name: 'target',
              title: 'Points at',
              type: 'string',
              description:
                'The name given to that part in the demo’s HTML (data-annotate="…"), e.g. balance. The demo’s source lists its names.',
              validation: Rule => Rule.required().regex(/^[a-z0-9-]+$/, {name: 'lowercase name'})
            }),
            defineField({name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required()}),
            defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
            defineField({
              name: 'side',
              title: 'Side',
              type: 'string',
              description: 'Which side of the phone the note sits on, on wide screens.',
              options: {list: [{title: 'Left', value: 'left'}, {title: 'Right', value: 'right'}], layout: 'radio', direction: 'horizontal'},
              initialValue: 'right'
            })
          ],
          preview: {
            select: {title: 'title', target: 'target', side: 'side'},
            prepare: ({title, target, side}) => ({title: title || 'Untitled note', subtitle: `${target || '—'} · ${side || 'right'}`})
          }
        })
      ]
    })
  ],
  preview: {
    select: {demo: 'demo', linkUrl: 'linkUrl', notes: 'notes', caption: 'caption'},
    prepare({demo, linkUrl, notes, caption}) {
      const name = DEMOS.find(d => d.value === demo)?.title || linkUrl || 'No demo yet'
      const count = notes?.length || 0
      return {title: caption || 'Phone Demo', subtitle: `${name} · ${count} note${count === 1 ? '' : 's'}`}
    }
  }
})
