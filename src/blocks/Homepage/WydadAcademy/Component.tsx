import { Media } from '@/components/Media'
import type { WydadAcademy as WydadAcademyBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { getLocalizedField } from '@/utilities/getLocalizedField'
import type { TypedLocale } from 'payload'

export const WydadAcademy: React.FC<WydadAcademyBlock & { locale: TypedLocale }> = ({
  title,
  description,
  reversed,
  centered,
  columns,
  locale,
}) => {
  const localizedTitle = getLocalizedField(title, locale)
  const localizedDescription = getLocalizedField(description, locale)
  return (
    <div className="container flex flex-col lg:flex-row justify-between items-stretch gap-x-12 gap-y-4 lg:gap-y-0 pb-8 lg:pb-24 w-full">
      <div
        className={cn('flex flex-col items-start text-black gap-6', {
          'lg:order-2 lg:w-[60%]': reversed,
          'lg:order-1 lg:w-[40%]': !reversed,
          'justify-center': centered,
          'justify-between': !centered,
        })}
      >
        <h2 className="text-5xl lg:text-6xl font-semibold text-black">{localizedTitle || ''}</h2>
        <p className="text-md lg:w-[80%]">{localizedDescription || ''}</p>
      </div>
      <div
        className={cn('grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-fr', {
          'lg:order-1 lg:w-[65%]': reversed,
          'lg:order-2 lg:w-[60%]': !reversed,
        })}
      >
        {columns?.map((column, index) =>
          column.type === 'text' ? (
            <div
              key={index}
              className={cn(
                'flex flex-col items-start justify-center row-span-2 rounded-[10px] overflow-hidden text-white p-10 gap-10',
              )}
              style={{
                backgroundColor: column.backgroundColor ? column?.backgroundColor : 'lightgrey',
              }}
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-medium" style={{ fontStyle: 'italic' }}>
                  {getLocalizedField(column.title, locale) || ''}
                </h2>
                <p className="text-md">{getLocalizedField(column.description, locale) || ''}</p>
              </div>

              <Link
                href={column.link?.url ? column.link.url : ''}
                className="bg-white rounded-[10px] py-2 px-4 text-black text-xs capitalize font-medium"
              >
                {getLocalizedField(column.link?.label, locale) || ''}
              </Link>
            </div>
          ) : (
            <div
              key={index}
              className={cn('relative rounded-[10px] overflow-hidden', {
                'lg:row-span-3 aspect-video lg:aspect-auto': index === 1,
                'lg:row-span-2': index === 2 && !columns?.find((col) => col.type === 'text'),
              })}
            >
              <Media
                resource={column?.image}
                imgClassName={cn('h-full', {
                  'object-cover': index !== 1,
                })}
                fill={index !== 1}
              />
            </div>
          ),
        )}
      </div>
    </div>
  )
}
