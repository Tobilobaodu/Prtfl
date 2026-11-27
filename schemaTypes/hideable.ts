import {defineField} from 'sanity'

/**
 * Adds a "Hide on site" switch to a page-component type, so a component can be
 * taken off the live case study without deleting it. The case study query
 * (web-next/sanity/queries.js, CASE_STUDY_BODY) drops hidden components, so
 * they never reach the browser.
 *
 * The Studio list marks a hidden component by prefixing its subtitle with
 * "Hidden", keeping the type's own preview otherwise.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hideable<T extends {fields?: any[]; preview?: any}>(type: T): T {
  const preview = type.preview || {}
  const prepare = preview.prepare
  return {
    ...type,
    fields: [
      defineField({
        name: 'hidden',
        title: 'Hide on site',
        type: 'boolean',
        description: 'Keep this component in the Studio but leave it off the live page.',
        initialValue: false,
      }),
      ...(type.fields || []),
    ],
    preview: {
      ...preview,
      select: {...(preview.select || {}), __hidden: 'hidden'},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prepare(value: any) {
        const {__hidden, ...rest} = value
        const base = prepare ? prepare(rest) : rest
        if (!__hidden) return base
        return {
          ...base,
          subtitle: base?.subtitle ? `Hidden · ${base.subtitle}` : 'Hidden',
        }
      },
    },
  }
}
