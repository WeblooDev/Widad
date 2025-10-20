import type { Quote as QuoteType, Media as MediaType } from '@/payload-types'
import Image from 'next/image'

export const Quote: React.FC<QuoteType> = ({ image, overlayImage, quote, author }) => {
  const quoteImage = image as MediaType
  const overlayImg = overlayImage as MediaType

  return (
    <div className="py-20">
      <div className="container">
        <div className="grid grid-cols-2 gap-16 items-end">
          {/* Quote Section */}
          <div className="relative">
            {/* Large Red Quote Symbol */}
            <div className="text-primary-red text-[120px] leading-none font-serif mb-16">
              <Image src="/icons/quote.svg" alt="quote" width={80} height={66} />
            </div>

            {/* Quote Text */}
            <blockquote className="text-7xl font-normal text-black">{quote}</blockquote>
          </div>

          {/* Image Section */}
          <div className="relative aspect-[1/1.1] rounded-[20px] overflow-visible">
            {quoteImage?.url && (
              <Image
                src={quoteImage.url}
                alt={author || 'Quote'}
                fill
                className="object-cover rounded-[20px]"
              />
            )}

            {/* Right Side - Overlay Image */}
            {overlayImg?.url && (
              <div className="absolute bottom-0 -left-[30%] w-[125%] h-[125%]">
                <Image src={overlayImg.url} alt="" fill className="object-contain object-bottom" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
