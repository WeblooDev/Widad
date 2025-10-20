import { Block } from 'payload'

export const History: Block = {
  slug: 'history',
  interfaceName: 'History',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'timeline',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'year',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
