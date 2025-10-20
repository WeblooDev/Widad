import { Block } from 'payload'

export const YearHighlight: Block = {
  slug: 'yearHighlight',
  interfaceName: 'YearHighlight',
  fields: [
    {
      name: 'year',
      type: 'text',
      required: true,
      admin: {
        description: 'The year to highlight (e.g., 2020)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main title (e.g., "A historic double: League and CAF")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Description text',
      },
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Large image on the left',
      },
    },
    {
      name: 'trophyImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Trophy image (top right)',
      },
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Team logo image (bottom right)',
      },
    },
  ],
}
