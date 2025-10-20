import type { Block } from 'payload'

export const MomentsOfGlory: Block = {
  slug: 'momentsOfGlory',
  interfaceName: 'MomentsOfGloryBlock',
  labels: {
    singular: 'Moments of Glory Block',
    plural: 'Moments of Glory Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Moments Of Glory',
      admin: {
        description: 'Title for the block',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description text displayed next to the title',
      },
    },
    {
      name: 'tag',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Today',
          value: 'today',
        },
        {
          label: 'Featured',
          value: 'featured',
        },
        {
          label: 'Breaking News',
          value: 'breaking',
        },
        {
          label: 'Trending',
          value: 'trending',
        },
        {
          label: 'Moments of Glory',
          value: 'moments-of-glory',
        },
      ],
      admin: {
        description: 'Select the tag to filter posts (e.g., "Moments of Glory")',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 4,
      max: 6,
      admin: {
        description: 'Number of posts to display (recommended: 6 for best layout)',
      },
    },
  ],
}
