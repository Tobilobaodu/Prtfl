import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'spacer',
  title: 'Spacer',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'Space Size (px)',
      type: 'string',
      options: {
        list: [
          {title: '5px', value: '5'},
          {title: '10px', value: '10'},
          {title: '15px', value: '15'},
          {title: '20px', value: '20'},
          {title: '25px', value: '25'},
          {title: '30px', value: '30'},
          {title: '35px', value: '35'},
          {title: '40px', value: '40'},
          {title: '45px', value: '45'},
          {title: '50px', value: '50'}
        ]
      },
      initialValue: '20'
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Spacer',
        subtitle: 'Adds vertical space'
      }
    }
  }
})
