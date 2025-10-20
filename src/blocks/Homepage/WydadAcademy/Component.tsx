import { Media } from '@/components/Media'
import type { WydadAcademy as WydadAcademyBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

export const WydadAcademy: React.FC<WydadAcademyBlock> = ({
  title,
  description,
  reversed,
  centered,
  columns,
}) => {
  return (
    <div className="container flex flex-row justify-between items-stretch gap-x-12 pb-24 w-full">
      <div
        className={cn('flex flex-col items-start text-black gap-6', {
          'order-2': reversed,
          'order-1': !reversed,
          'justify-center': centered,
          'justify-between': !centered,
        })}
        style={{ width: reversed ? '60%' : '40%' }}
      >
        <h2 className="text-6xl font-semibold text-black">{title}</h2>
        <p className="text-md w-[80%]">{description}</p>
      </div>
      <div
        className={cn('grid grid-cols-2 gap-4 auto-rows-fr', {
          'order-1': reversed,
          'order-2': !reversed,
        })}
        style={{ width: reversed ? '65%' : '60%' }}
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
                  {column.title}
                </h2>
                <p className="text-md">{column.description}</p>
              </div>

              <Link
                href={column.link?.url ? column.link.url : ''}
                className="bg-white rounded-[10px] py-2 px-4 text-black text-xs capitalize font-medium"
              >
                {column.link?.label}
              </Link>
            </div>
          ) : (
            <div
              key={index}
              className={cn('relative rounded-[10px] overflow-hidden', {
                'row-span-3': index === 1,
                'row-span-2': index === 2 && !columns?.find((col) => col.type === 'text'),
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
