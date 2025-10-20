import { Block } from 'payload'

export const WydadMatches: Block = {
  slug: 'wydadMatches',
  interfaceName: 'WydadMatches',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
}
