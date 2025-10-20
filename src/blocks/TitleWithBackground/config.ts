import { Block } from 'payload'

export const TitleWithBackground: Block = {
  slug: 'titleWithBackground',
  interfaceName: 'TitleWithBackground',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'backgroundTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'backgroundSize',
      type: 'select',
      defaultValue: 'medium',
      options: [
        {
          label: 'Small (150px)',
          value: 'small',
        },
        {
          label: 'Medium (200px)',
          value: 'medium',
        },
        {
          label: 'Large (280px)',
          value: 'large',
        },
        {
          label: 'Extra Large (370px)',
          value: 'xlarge',
        },
      ],
    },
  ],
}
