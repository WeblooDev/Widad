import { Block } from 'payload'

export const StoreBlock: Block = {
  slug: 'storeBlock',
  interfaceName: 'StoreBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
