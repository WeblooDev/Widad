import { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQ',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Latest From Wydad AC',
      admin: {
        description: 'Main heading for the FAQ section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description text below the title',
      },
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          admin: {
            description: 'The question text',
          },
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          admin: {
            description: 'The answer text',
          },
        },
      ],
    },
  ],
}
