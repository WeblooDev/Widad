import type { Media as MediaType, WydadTrophies as WydadTrophiesBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const WydadTrophies: React.FC<WydadTrophiesBlock> = ({
  title,
  description,
  link,
  trophies,
}) => {
  return (
    <div className="">
      <div className="flex flex-col gap-8 w-full container">
        <div
          className={cn('flex', {
            'flex-row justify-between items-end': !description,
            'flex-col items-start gap-4': description,
          })}
        >
          <h2 className="text-5xl lg:text-6xl font-semibold text-black capitalize">{title}</h2>

          {description && (
            <p className="text-lg lg:text-xl text-black mb-8 lg:w-2/3">{description}</p>
          )}

          {link && link.url && (
            <Link
              href={link.url ? link.url : ''}
              className="flex justify-center items-center text-black text-sm font-bold uppercase"
            >
              {link.label} <ChevronRightIcon size={20} />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {trophies?.map((trophy, index) => (
            <div
              key={index}
              className="flex flex-col gap-6 p-8 rounded-[20px] overflow-hidden justify-between items-center text-center trophy-bg"
            >
              {/* Hexagon with glass effect */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg
                  width="176"
                  height="176"
                  viewBox="0 0 176 176"
                  className="absolute pointer-events-none"
                  style={{
                    filter: 'drop-shadow(0px 8.32px 21.64px #00000080)',
                  }}
                >
                  <path
                    d="M 88 3.5 Q 98.5 3.5 105.6 10.6 L 154.9 42.2 Q 162 49.3 162 59.8 L 162 116.2 Q 162 126.7 154.9 133.8 L 105.6 165.4 Q 98.5 172.5 88 172.5 Q 77.5 172.5 70.4 165.4 L 21.1 133.8 Q 14 126.7 14 116.2 L 14 59.8 Q 14 49.3 21.1 42.2 L 70.4 10.6 Q 77.5 3.5 88 3.5 Z"
                    fill="rgba(231, 0, 11, 0.50)"
                    stroke="#FF83838C"
                    strokeWidth="1.07"
                  />
                </svg>
                <div
                  className="absolute"
                  style={{
                    width: '176px',
                    height: '176px',
                    clipPath:
                      'path("M 88 3.5 Q 98.5 3.5 105.6 10.6 L 154.9 42.2 Q 162 49.3 162 59.8 L 162 116.2 Q 162 126.7 154.9 133.8 L 105.6 165.4 Q 98.5 172.5 88 172.5 Q 77.5 172.5 70.4 165.4 L 21.1 133.8 Q 14 126.7 14 116.2 L 14 59.8 Q 14 49.3 21.1 42.2 L 70.4 10.6 Q 77.5 3.5 88 3.5 Z")',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                  }}
                />
                <div className="absolute z-10 w-40 h-40 flex items-center justify-center p-8">
                  {trophy.logo && typeof trophy.logo !== 'string' && trophy.logo.url && (
                    <Image
                      src={trophy.logo.url}
                      alt={trophy.name}
                      width={100}
                      height={100}
                      className="object-contain max-w-full max-h-full"
                    />
                  )}
                </div>
                <div className="text-lg font-bold text-white bg-primary-red absolute bottom-2 right-6 w-10 h-10 flex items-center justify-center rounded-full z-20 shadow-lg">
                  {trophy.count < 10 ? '0' : ''}
                  {trophy.count}
                </div>
              </div>

              <div className="flex flex-col gap-4 items-center">
                <h3 className="text-4xl font-normal text-white">{trophy.name}</h3>
                {trophy.description && <p className="text-sm text-white">{trophy.description}</p>}
              </div>

              {trophy.link?.url && trophy.link?.label && (
                <Link
                  href={trophy.link.url}
                  className="backdrop-blur-md bg-white/10 border border-white/10 w-full text-white rounded-[9px] py-3 px-5 text-sm font-normal shadow-lg hover:bg-white/30 transition-all"
                >
                  {trophy.link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
