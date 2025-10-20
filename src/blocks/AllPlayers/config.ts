import { Block } from 'payload'

export const AllPlayers: Block = {
  slug: 'allPlayers',
  interfaceName: 'AllPlayers',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'All Players',
      admin: {
        description: 'Main heading for the players section',
      },
    },
    {
      name: 'team',
      type: 'relationship',
      relationTo: 'teams',
      required: true,
      admin: {
        description: 'Select which team to display players from',
      },
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show position filter buttons',
      },
    },
  ],
}
