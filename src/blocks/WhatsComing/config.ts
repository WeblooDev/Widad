import type { Block } from 'payload'

export const WhatsComingBlock: Block = {
  slug: 'whatsComing',
  interfaceName: 'WhatsComingBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: "WHAT'S COMING",
      required: true,
      localized: true,
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      defaultValue: 'OFFICIAL WYDAD WEBSITE',
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          required: true,
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Image (Right Side)',
          relationTo: 'media',
        },
        {
          name: 'backgroundType',
          type: 'radio',
          label: 'Background Type',
          options: [
            {
              label: 'Color',
              value: 'color',
            },
            {
              label: 'Image',
              value: 'image',
            },
          ],
          defaultValue: 'color',
          required: true,
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Color',
          admin: {
            condition: (data, siblingData) => siblingData?.backgroundType === 'color',
            description: 'Hex color code (e.g., #DC2626)',
          },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          label: 'Background Image',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData?.backgroundType === 'image',
          },
        },
        {
          name: 'trophies',
          type: 'array',
          label: 'Trophies (for last card)',
          admin: {
            description: 'Add trophies to display on the last card instead of an image',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Trophy Name',
              localized: true,
              required: true,
            },
            {
              name: 'count',
              type: 'number',
              label: 'Count',
              required: true,
            },
            {
              name: 'logo',
              type: 'upload',
              label: 'Trophy Logo',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
