import type { Sponsors as SponsorsType, Media as MediaType } from '@/payload-types'
import Image from 'next/image'
import { getLocalizedField } from '@/utilities/getLocalizedField'
import type { TypedLocale } from 'payload'
import { Link } from '@/i18n/routing'

export const Sponsors: React.FC<SponsorsType & { locale: TypedLocale }> = ({
  title,
  sponsors,
  locale,
}) => {
  return (
    <div className="mt-6 lg:mt-0">
      <div className="container flex flex-col gap-12">
        {title && (
          <h2 className="text-4xl font-semibold text-black text-center">
            {getLocalizedField(title, locale) || ''}
          </h2>
        )}

        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
          {sponsors?.map((sponsor, index) => {
            const logo = sponsor.logo as MediaType
            const content = (
              <div className="flex items-center justify-center w-40 lg:w-48 h-24 lg:h-32 border-2 border-gray-200 rounded-[10px] p-6 hover:border-gray-300 transition-colors bg-white">
                {logo?.url && (
                  <Image
                    src={logo.url}
                    alt={sponsor.name || 'Sponsor logo'}
                    width={150}
                    height={80}
                    className="object-contain max-w-full max-h-full"
                  />
                )}
              </div>
            )

            if (sponsor.link) {
              return (
                <Link key={index} href={sponsor.link} target="_blank" rel="noopener noreferrer">
                  {content}
                </Link>
              )
            }

            return <div key={index}>{content}</div>
          })}
        </div>
      </div>
    </div>
  )
}
