import type { Block } from 'payload'

export const PostsCarousel: Block = {
  slug: 'postsCarousel',
  interfaceName: 'PostsCarouselBlock',
  labels: {
    singular: 'Posts Carousel Block',
    plural: 'Posts Carousel Blocks',
  },
  fields: [
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        description: 'Select the category to filter posts (e.g., "News")',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 10,
      admin: {
        description: 'Maximum number of posts to display in the carousel',
      },
    },
  ],
}
