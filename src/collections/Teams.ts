import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Teams: CollectionConfig = {
  slug: 'teams',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "Men\'s Team", "Women\'s Team"',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Men',
          value: 'men',
        },
        {
          label: 'Women',
          value: 'women',
        },
        {
          label: 'Youth',
          value: 'youth',
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "mens-team")',
      },
    },
  ],
}
