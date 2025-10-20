import { Block } from 'payload'

export const Quote: Block = {
  slug: 'quote',
  interfaceName: 'Quote',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'overlayImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Image positioned at bottom right',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
    },
  ],
}
