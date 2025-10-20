'use client'
import type { History as HistoryType, Media as MediaType } from '@/payload-types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export const History: React.FC<HistoryType> = ({ title, timeline }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !timeline || timeline.length === 0) return

      const triggerPoint = window.innerHeight * 0.5 // 40% from top

      // Determine active timeline item based on scroll position
      let newActiveIndex = 0

      timelineRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()

          if (rect.top <= triggerPoint) {
            newActiveIndex = index
          }
        }
      })

      setActiveIndex(newActiveIndex)

      // Calculate the actual pixel height to the active dot
      const activeRef = timelineRefs.current[newActiveIndex]
      const firstRef = timelineRefs.current[0]

      if (activeRef && firstRef) {
        // Get the position of the active circle relative to the first circle
        // Circles are at top-2 (0.5rem = 8px) from their container top
        const firstCircleTop = firstRef.getBoundingClientRect().top + 8
        const activeCircleTop = activeRef.getBoundingClientRect().top + 8
        const distanceToActive = activeCircleTop - firstCircleTop

        setScrollProgress(distanceToActive)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [timeline])

  if (!timeline || timeline.length === 0) return null

  const activeItem = timeline[activeIndex]
  const activeImage = activeItem?.image as MediaType

  return (
    <div ref={containerRef} className="relative py-20">
      <div className="container">
        {title && <h2 className="text-6xl font-semibold text-black mb-16 text-center">{title}</h2>}

        <div className="grid grid-cols-2 gap-16">
          {/* Fixed Image Section */}
          <div className="sticky top-32 h-[500px]">
            <div className="relative w-full h-full rounded-[20px] overflow-hidden">
              {timeline.map((item, index) => {
                const itemImage = item.image as MediaType
                return (
                  <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{
                      opacity: index === activeIndex ? 1 : 0,
                    }}
                  >
                    {itemImage?.url && (
                      <Image
                        src={itemImage.url}
                        alt={item.title || ''}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="relative z-0">
            {/* Vertical Line */}
            <div className="absolute left-[0.25rem] top-[2rem] bottom-0 w-[1px] bg-gray-300">
              {/* Red progress line */}
              <div
                className="absolute top-0 left-0 w-full bg-primary-red transition-all duration-300"
                style={{
                  height: `${scrollProgress - 15}px`,
                }}
              />
            </div>

            {/* Timeline Items */}
            <div className="pl-16 space-y-32">
              {timeline.map((item, index) => {
                const isActive = index === activeIndex
                const isPassed = index < activeIndex

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      timelineRefs.current[index] = el
                    }}
                    className="relative z-10"
                  >
                    {/* Dot on the line */}
                    <div
                      className="absolute -left-[65px] top-2 w-3 h-3 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: isPassed || isActive ? '#FF2020' : '#D1D5DB',
                      }}
                    >
                      <div className="relative">
                        {/* Outer dashed circle */}
                        <div
                          className="absolute -top-1/2 -left-1/2 -translate-y-[35%] -translate-x-[20%] w-10 h-10 rounded-full border border-dashed bg-white transition-all duration-300"
                          style={{
                            borderColor: isPassed || isActive ? '#000000' : 'transparent',
                            backgroundColor: 'transparent',
                          }}
                        />{' '}
                      </div>
                    </div>

                    {/* Horizontal line from dot */}
                    <div
                      className="absolute -left-16 top-[0.75rem] h-[1px] w-16 transition-colors duration-300"
                      style={{
                        backgroundColor: isPassed || isActive ? '#FF2020' : '#D1D5DB',
                      }}
                    />

                    {/* Content */}
                    <div
                      className="transition-colors duration-500"
                      style={{
                        color: isPassed || isActive ? '#000000' : '#9CA3AF',
                      }}
                    >
                      <div
                        className="inline-flex items-center justify-center px-2 py-1 bg-primary-red rounded-full mb-4"
                        style={{
                          backgroundColor: isPassed || isActive ? '#FF2020' : '#D1D5DB',
                        }}
                      >
                        <span className="text-white text-xs font-semibold">{item.year}</span>
                      </div>
                      <h3 className="text-3xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-md leading-md text-black/80">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
