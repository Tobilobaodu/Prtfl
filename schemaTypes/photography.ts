import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'photography',
    title: 'Photography',
    type: 'document',
    fields: [
        defineField({
            name: 'image',
            title: 'Photo',
            type: 'image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'Alternative text for accessibility',
                }
            ]
        }),
        defineField({
            name: 'name',
            title: 'Photo Name',
            type: 'string',
            validation: (Rule) => [
                Rule.required(),
                Rule.max(50).warning('Photo name should be concise'),
                Rule.custom((name) => {
                    if (!name) return true
                    const wordCount = name.trim().split(/\s+/).length
                    return wordCount <= 4 ? true : 'Photo name must be 4 words maximum'
                })
            ],
            description: 'Photo name (4 words maximum)',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            validation: (Rule) => Rule.required().max(30),
            description: 'Location where photo was taken',
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            validation: (Rule) => Rule.required(),
            description: 'Order for displaying photos (lower numbers first)',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'location',
            media: 'image',
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title || 'Untitled Photo',
                subtitle: subtitle || 'No location',
                media: media,
            }
        },
    },
})