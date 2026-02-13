import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'stuudio',
  api: {
    projectId: 'bhfv0qe4',
    dataset: 'production'
  },
  deployment: {
    appId: 'whsyyogu674eizb8e6xybf0f',
  },
  graphql: [
    {
      playground: true,
      tag: 'default',
      id: 'default',
    },
  ]
})
