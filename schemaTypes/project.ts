import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    }),
    defineField({
      name: 'client',
      title: 'Client/Brand',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      description: 'e.g., "Mobile & Desktop", "Web Application"'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      description: 'First paragraph shown on case study page'
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'Used on portfolio/sandbox listing pages'
    }),
    defineField({
      name: 'locked',
      title: 'Locked Project',
      type: 'boolean',
      description: 'Requires password to view full case study'
    }),
    defineField({
      name: 'password',
      title: 'Access Password',
      type: 'string',
      description: 'Password required to access this case study (leave blank for public access)',
      hidden: ({document}) => !document?.locked
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Portfolio',
      type: 'boolean',
      description: 'Show on main portfolio page'
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Display this project on the homepage (max 6 projects)'
    }),
    defineField({
      name: 'showOnSandbox',
      title: 'Show on Sandbox',
      type: 'boolean',
      description: 'Display this project on the sandbox page (max 10 projects)'
    })
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      year: 'year',
      heroImage: 'heroImage',
      locked: 'locked'
    },
    prepare({title, client, year, heroImage, locked}) {
      return {
        title: `${title} ${locked ? '🔒' : ''}`,
        subtitle: `${client} • ${year}`,
        media: heroImage
      }
    }
  }
})
