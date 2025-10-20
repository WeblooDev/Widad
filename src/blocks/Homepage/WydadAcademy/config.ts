import { Block } from 'payload'

export const WydadAcademy: Block = {
  slug: 'wydadAcademy',
  interfaceName: 'WydadAcademy',
  fields: [
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
    {
      name: 'reversed',
      type: 'checkbox',
    },
    {
      name: 'centered',
      type: 'checkbox',
    },
    {
      name: 'columns',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Text',
              value: 'text',
            },
            {
              label: 'Image',
              value: 'image',
            },
          ],
        },
        {
          name: 'backgroundColor',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'text',
          },
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'text',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'text',
          },
        },
        {
          name: 'link',
          type: 'group',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'text',
          },
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
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
      ],
    },
  ],
}
