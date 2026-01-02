import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'videoComponent',
  title: 'Video Component',
  type: 'object',
  fields: [
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      description: 'Upload a video file (MP4, WebM, etc.)',
      options: {
        accept: 'video/*'
      }
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'External video URL (YouTube, Vimeo, etc.)'
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      description: 'Thumbnail image shown before video plays',
      options: {hotspot: true}
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
      description: 'Automatically start playing when in view'
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      initialValue: false,
      description: 'Loop video when it ends'
    }),
    defineField({
      name: 'muted',
      title: 'Start Muted',
      type: 'boolean',
      initialValue: true,
      description: 'Start video with sound muted (recommended for autoplay)'
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption text below the video'
    })
  ],
  validation: Rule => Rule.custom((fields) => {
    const { videoFile, videoUrl } = fields || {}
    if (!videoFile && !videoUrl) {
      return 'Either a video file or video URL must be provided'
    }
    if (videoFile && videoUrl) {
      return 'Please provide either a video file OR a video URL, not both'
    }
    return true
  }),
  preview: {
    select: {
      videoFile: 'videoFile',
      videoUrl: 'videoUrl',
      caption: 'caption',
      posterImage: 'posterImage'
    },
    prepare({videoFile, videoUrl, caption, posterImage}) {
      const hasVideo = videoFile || videoUrl
      return {
        title: 'Video Component',
        subtitle: caption || (videoUrl ? 'External Video' : 'Uploaded Video'),
        media: posterImage || (hasVideo ? undefined : null)
      }
    }
  }
})
