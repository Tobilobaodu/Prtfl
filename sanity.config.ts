import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'prftl',

  projectId: 'bhfv0qe4',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool(), colorInput()],

  schema: {
    types: schemaTypes,
  },
})
