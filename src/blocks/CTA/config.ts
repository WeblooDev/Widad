import { Block } from 'payload'

export const CTA: Block = {
  slug: 'ctaBlock',
  interfaceName: 'CTABlock',
  fields: [
    {
      name: 'backgroundImage',
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'ctaType',
      type: 'select',
      required: true,
      defaultValue: 'link',
      options: [
        {
          label: 'Link Button',
          value: 'link',
        },
        {
          label: 'Social Icons',
          value: 'social',
        },
      ],
    },
    {
      name: 'link',
      type: 'group',
      admin: {
        condition: (data, siblingData) => siblingData?.ctaType === 'link',
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
      name: 'socialIcons',
      type: 'array',
      admin: {
        condition: (data, siblingData) => siblingData?.ctaType === 'social',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'TikTok', value: 'tiktok' },
          ],
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
}
