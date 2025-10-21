import { Media } from '@/components/Media'
import type { WydadTV as WydadTVBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { getLocalizedField } from '@/utilities/getLocalizedField'
import type { TypedLocale } from 'payload'

export const WydadTV: React.FC<WydadTVBlock & { locale: TypedLocale }> = ({ title, link, channels, locale }) => {
  const localizedTitle = getLocalizedField(title, locale)
  const localizedLabel = getLocalizedField(link?.label, locale)
  return (
    <div className="flex flex-col gap-8 w-full container py-10">
      <div className="flex flex-row justify-between items-end">
        <h2 className="text-6xl font-semibold text-black">{localizedTitle}</h2>

        <Link
          href={link.url ? link.url : ''}
          className="flex justify-center items-center text-black text-sm font-bold uppercase"
        >
          {localizedLabel} <ChevronRightIcon size={20} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {channels &&
          channels.map((channel, index) => {
            return (
              <Link
                href={channel.url ? channel.url : ''}
                key={index}
                className={cn(
                  'flex flex-col gap-8 justify-end items-start flex-1 relative px-8 rounded-[10px] overflow-hidden',
                  {
                    'row-span-2 aspect-square': index === 0,
                  },
                )}
              >
                <h3 className="text-2xl font-bold text-white uppercase z-10">{getLocalizedField(channel.title, locale)}</h3>

                <Media resource={channel.image} fill imgClassName="object-cover w-full z-0" />
              </Link>
            )
          })}
      </div>
    </div>
  )
}
