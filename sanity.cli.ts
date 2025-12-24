import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'stuudio',
  api: {
    projectId: 'bhfv0qe4',
    dataset: 'production'
  },
  graphql: [
    {
      playground: true,
      tag: 'default',
      id: 'default',
    },
  ]
})
