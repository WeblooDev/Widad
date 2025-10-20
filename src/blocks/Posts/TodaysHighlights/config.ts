import type { Block } from 'payload'

export const TodaysHighlights: Block = {
  slug: 'todaysHighlights',
  interfaceName: 'TodaysHighlightsBlock',
  labels: {
    singular: "Today's Highlights Block",
    plural: "Today's Highlights Blocks",
  },
  fields: [
    {
      name: 'tag',
      type: 'select',
      required: true,
      defaultValue: 'today',
      admin: {
        description: 'Select the tag to filter posts',
      },
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
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 5,
      admin: {
        description: 'Number of posts to display (recommended: 3)',
      },
    },
  ],
}
