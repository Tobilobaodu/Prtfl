import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'company',
            title: 'Company Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date Display Text',
            description: 'e.g. "APR \'22 – Present"',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            description: 'Used for sorting experiences chronologically',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'current',
            title: 'Current Role?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
        }),
    ],
    preview: {
        select: {
            title: 'company',
            subtitle: 'role',
        },
    },
})
