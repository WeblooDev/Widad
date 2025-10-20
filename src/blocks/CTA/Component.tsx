import type { CTABlock as CTAType, Media as MediaType } from '@/payload-types'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Facebook, Instagram, Youtube, Linkedin, X } from 'lucide-react'

const socialIconMap = {
  facebook: Facebook,
  twitter: (props: { size?: number }) => (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.872 13.7319L30.496 0.5H27.7425L17.645 11.9867L9.58623 0.5H0.289062L12.4782 17.8716L0.289062 31.7455H3.04262L13.6989 19.6126L22.2114 31.7455H31.5086M4.03644 2.53343H8.26669L27.7404 29.812H23.5091" />
    </svg>
  ),
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  tiktok: (props: { size?: number }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
}

export const CTA: React.FC<CTAType> = ({
  backgroundImage,
  overlayImage,
  title,
  description,
  ctaType,
  link,
  socialIcons,
}) => {
  const bgImage = backgroundImage as MediaType
  const overlayImg = overlayImage as MediaType

  return (
    <div className="pt-8 lg:pt-24">
      <div className="container relative lg:rounded-[20px] px-4 py-12 md:p-0 overflow-visible">
        {/* Background Image */}
        {bgImage?.url && (
          <div className="absolute inset-0 z-0 lg:rounded-[20px] overflow-hidden">
            <Image
              src={bgImage.url}
              alt={title || ''}
              fill
              className="object-cover"
              priority={false}
            />
            {/* Red Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, #FF2020 0%, #8B0000 100%)',
                mixBlendMode: 'multiply',
                opacity: 0.8,
              }}
            />
          </div>
        )}

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="text-white text-center lg:text-start">
              <h2 className="text-5xl lg:text-6xl font-semibold mb-6">{title}</h2>
              {description && <p className="text-xl text-white/90 mb-8">{description}</p>}

              {/* CTA Type */}
              {ctaType === 'link' && link?.url && link?.label && (
                <Link
                  href={link.url}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-red font-bold text-md rounded-[10px] hover:bg-red-50 transition-colors"
                >
                  {link.label}
                </Link>
              )}

              {ctaType === 'social' && socialIcons && socialIcons.length > 0 && (
                <div className="flex gap-4 justify-center lg:justify-start">
                  {socialIcons.map((social, index) => {
                    const Icon = socialIconMap[social.platform as keyof typeof socialIconMap]
                    return (
                      <a
                        key={index}
                        href={social.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 bg-white text-primary-red rounded-[7px] hover:bg-primary-red hover:text-white transition-colors"
                      >
                        <Icon size={24} />
                      </a>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Right Side - Overlay Image */}
            <div className="relative h-[500px] hidden md:block">
              {overlayImg?.url && (
                <div className="absolute bottom-0 right-[-10%] w-[125%] h-[125%]">
                  <Image
                    src={overlayImg.url}
                    alt=""
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
