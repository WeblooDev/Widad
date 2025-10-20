import { Block } from 'payload'

export const Sponsors: Block = {
  slug: 'sponsors',
  interfaceName: 'Sponsors',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'sponsors',
      type: 'array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
  ],
}
