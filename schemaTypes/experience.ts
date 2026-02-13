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
            name: 'startDate',
            title: 'Starting Date',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            description: 'Leave empty if this is your current role',
            hidden: ({document}) => document?.current === true,
            validation: (Rule) => Rule.custom((endDate, context) => {
                const { document } = context
                if (document?.current === true && endDate) {
                    return 'End Date should be empty for current roles'
                }
                return true
            }),
        }),
        defineField({
            name: 'current',
            title: 'Current Role?',
            type: 'boolean',
            initialValue: false,
            description: 'Check this if this is your current role (endDate will be ignored)',
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
            startDate: 'startDate',
            endDate: 'endDate',
            current: 'current'
        },
        prepare({title, subtitle, startDate, endDate, current}) {
            // Helper function to safely format dates
            const formatDate = (dateString: string | undefined) => {
                if (!dateString) return '';
                try {
                    const date = new Date(dateString);
                    if (isNaN(date.getTime())) return '';
                    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
                } catch (error) {
                    return '';
                }
            };

            // Format dates for preview
            const start = formatDate(startDate);
            const end = current ? 'Present' : formatDate(endDate);
            const dateRange = current ? `${start} – Present` : endDate ? `${start} – ${end}` : start;
            
            return {
                title: title || 'Untitled Experience',
                subtitle: `${subtitle || 'Role Title'} • ${dateRange}`,
            }
        },
    },
})
