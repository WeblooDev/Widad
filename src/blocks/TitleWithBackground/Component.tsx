import type { TitleWithBackground as TitleWithBackgroundType } from '@/payload-types'

export const TitleWithBackground: React.FC<TitleWithBackgroundType> = ({
  title,
  description,
  backgroundTitle,
  backgroundSize = 'medium',
}) => {
  const sizeMap = {
    small: '150px',
    medium: '200px',
    large: '280px',
    xlarge: '370px',
  }

  const fontSize = sizeMap[backgroundSize as keyof typeof sizeMap] || sizeMap.medium

  return (
    <div className="relative pt-20">
      <div className="container flex flex-col items-center justify-center relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <h2
            className="font-bold whitespace-nowrap"
            style={{
              fontSize,
              WebkitTextStroke: '2px rgba(0, 0, 0, 0.1)',
              WebkitTextFillColor: 'transparent',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            }}
          >
            {backgroundTitle}
          </h2>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center gap-4 w-[70%] max-w-4xl">
          <h2 className="text-6xl font-semibold text-black capitalize">{title}</h2>
          {description && <p className="text-lg text-gray-700">{description}</p>}
        </div>
      </div>
    </div>
  )
}
