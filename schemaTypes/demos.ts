import {defineField} from 'sanity'

/**
 * The static HTML demos served from web-next/public/<folder>/. Each one shows
 * up in the "Live demo" dropdown on blocks that can link to a demo, and on a
 * project set to open a live demo instead of a case study.
 *
 * To add a demo: put its folder in web-next/public/, add its rewrites in
 * web-next/next.config.mjs, then add a line here and redeploy the Studio.
 */
export const DEMOS = [
  {title: 'KRFI: Residential landing page', value: '/krfi-demo'},
  {title: 'KRFI: Residential products page', value: '/krfi-demo/products'},
  {title: 'Refuel Energy: Home page', value: '/refuel-demo'},
  {title: 'Refuel Energy: About page', value: '/refuel-demo/about'},
  {title: 'Refuel Energy: Services page', value: '/refuel-demo/services'},
  {title: 'Refuel Energy: Contact page', value: '/refuel-demo/contact'},
]

/**
 * The link fields shared by the Live Demo Link block and the Before and After
 * Slider: pick a demo, or type any other URL, plus an optional label.
 */
export const demoLinkFields = ({required = false} = {}) => [
  defineField({
    name: 'demo',
    title: 'Live demo',
    type: 'string',
    description: 'Opens in a new tab.',
    options: {list: DEMOS, layout: 'dropdown'},
    validation: Rule =>
      Rule.custom((demo, context) => {
        const parent = context.parent as {linkUrl?: string} | undefined
        return !required || demo || parent?.linkUrl
          ? true
          : 'Pick a demo, or fill in Other link URL.'
      })
  }),
  defineField({
    name: 'linkUrl',
    title: 'Other link URL',
    type: 'url',
    description: 'For a link that is not in the demo list: a path on this site or a full URL.',
    hidden: ({parent}) => Boolean(parent?.demo),
    validation: Rule => Rule.uri({allowRelative: true, scheme: ['http', 'https']})
  }),
  defineField({
    name: 'linkLabel',
    title: 'Link label',
    type: 'string',
    description: 'Text for the link. Defaults to “View live demo”.',
    hidden: ({parent}) => !parent?.demo && !parent?.linkUrl
  })
]
