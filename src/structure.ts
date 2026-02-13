import { StructureBuilder } from 'sanity/structure'
import { 
  DocumentTextIcon,
  DocumentsIcon,
  DocumentIcon,
  ImageIcon,
  VideoIcon,
  TagIcon,
  CalendarIcon,
  PinIcon
} from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Main Content Types
      S.listItem()
        .title('Projects')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('project')
            )
        ),

      S.listItem()
        .title('Case Studies')
        .icon(DocumentsIcon)
        .child(
          S.documentTypeList('caseStudy')
            .title('Case Studies')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('caseStudy')
            )
        ),

      S.listItem()
        .title('Experience')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('experience')
            .title('Experience')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('experience')
            )
        ),

      S.listItem()
        .title('Photography')
        .icon(ImageIcon)
        .child(
          S.documentTypeList('photography')
            .title('Photography')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('photography')
            )
        ),

      // Schema Types
      S.listItem()
        .title('Schema Types')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Schema Types')
            .items([
              S.listItem()
                .title('Text Blocks')
                .schemaType('textBlock'),
              S.listItem()
                .title('Section Title Blocks')
                .schemaType('sectionTitleBlock'),
              S.listItem()
                .title('Tag Blocks')
                .schemaType('tagBlock'),
              S.listItem()
                .title('Image Components')
                .schemaType('imageComponent'),
              S.listItem()
                .title('Video Components')
                .schemaType('videoComponent'),
              S.listItem()
                .title('Spacers')
                .schemaType('spacer'),
              S.listItem()
                .title('Section Dividers')
                .schemaType('sectionDivider')
            ])
        )
    ])
