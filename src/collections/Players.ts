import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Players: CollectionConfig = {
  slug: 'players',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'jerseyNumber', 'position', 'team'],
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
    },
    {
      name: 'team',
      type: 'relationship',
      relationTo: 'teams',
      required: true,
      hasMany: false,
    },
    {
      name: 'jerseyNumber',
      type: 'number',
      required: true,
      admin: {
        description: 'Player jersey number',
      },
    },
    {
      name: 'position',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Goalkeeper',
          value: 'goalkeeper',
        },
        {
          label: 'Defender',
          value: 'defender',
        },
        {
          label: 'Midfielder',
          value: 'midfielder',
        },
        {
          label: 'Forward',
          value: 'forward',
        },
        {
          label: 'Staff',
          value: 'staff',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'On Loan',
          value: 'onLoan',
        },
        {
          label: 'Injured',
          value: 'injured',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Player portrait image for card',
      },
    },
    {
      name: 'modalImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Different image for modal (optional, uses card image if not provided)',
      },
    },
    {
      name: 'nationality',
      type: 'text',
      admin: {
        description: 'Player nationality (e.g., "Morocco", "Brazil")',
      },
    },
    {
      name: 'nationalityFlag',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Country flag image',
      },
    },
    {
      name: 'dateOfBirth',
      type: 'date',
    },
    {
      name: 'height',
      type: 'number',
      admin: {
        description: 'Height in cm',
      },
    },
    {
      name: 'weight',
      type: 'number',
      admin: {
        description: 'Weight in kg',
      },
    },
    // Statistics
    {
      name: 'statistics',
      type: 'group',
      fields: [
        {
          name: 'appearances',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'goals',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'assists',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'yellowCards',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'redCards',
          type: 'number',
          defaultValue: 0,
        },
        // Goalkeeper-specific stats
        {
          name: 'cleanSheets',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'For goalkeepers',
          },
        },
        {
          name: 'savesMade',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'For goalkeepers',
          },
        },
        {
          name: 'goalsConceded',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'For goalkeepers',
          },
        },
        {
          name: 'savePercentage',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'For goalkeepers (0-100)',
          },
        },
        {
          name: 'distributionAccuracy',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'For goalkeepers (0-100)',
          },
        },
      ],
    },
    // Additional details for modal
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'Player biography',
      },
    },
    {
      name: 'previousClubs',
      type: 'array',
      fields: [
        {
          name: 'clubName',
          type: 'text',
        },
        {
          name: 'years',
          type: 'text',
          admin: {
            description: 'e.g., "2018-2020"',
          },
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'facebook',
          type: 'text',
        },
      ],
    },
  ],
}
