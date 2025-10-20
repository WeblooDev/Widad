import { link } from '@/fields/link'
import { Block } from 'payload'

export const WydadTV: Block = {
  slug: 'wydadTV',
  interfaceName: 'WydadTV',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    link({
      appearances: false,
    }),
    {
      name: 'channels',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
