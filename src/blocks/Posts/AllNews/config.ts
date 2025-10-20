import type { Block } from 'payload'

export const AllNews: Block = {
  slug: 'allNews',
  interfaceName: 'AllNewsBlock',
  labels: {
    singular: 'All News Block',
    plural: 'All News Blocks',
  },
  fields: [
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select categories to display as filters (e.g., Club, Matches, Transfers, etc.)',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 50,
      min: 1,
      max: 100,
      admin: {
        description: 'Maximum number of posts to fetch (will be paginated on the frontend)',
      },
    },
    {
      name: 'postsPerPage',
      type: 'number',
      defaultValue: 6,
      min: 3,
      max: 12,
      admin: {
        description: 'Number of posts to display per page',
      },
    },
  ],
}
