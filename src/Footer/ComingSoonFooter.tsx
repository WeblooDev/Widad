'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { LogoFooter } from '@/components/Logo/LogoFooter'
import { Instagram } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations, useLocale } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

export function ComingSoonFooter() {
  const svgRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState<string>('')
  const t = useTranslations()
  const locale = useLocale?.() || 'en'
  const isArabic = locale === 'ar'

  useEffect(() => {
    // Fetch the SVG content
    fetch('/images/slogan.svg')
      .then((response) => response.text())
      .then((data) => setSvgContent(data))
      .catch((error) => console.error('Error loading SVG:', error))
  }, [])

  useEffect(() => {
    if (!svgRef.current || !svgContent) return

    const svg = svgRef.current.querySelector('svg')
    if (!svg) return

    const paths = svg.querySelectorAll('path, circle, rect, polygon, polyline')

    if (paths.length === 0) return

    // Add gradient definition to SVG
    let defs = svg.querySelector('defs')
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      svg.insertBefore(defs, svg.firstChild)
    }

    // Create gradient
    const gradientId = 'fillGradient'
    let gradient = svg.querySelector(`#${gradientId}`)
    if (!gradient) {
      gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
      gradient.setAttribute('id', gradientId)
      gradient.setAttribute('x1', '0%')
      gradient.setAttribute('y1', '100%')
      gradient.setAttribute('x2', '0%')
      gradient.setAttribute('y2', '0%')

      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
      stop1.setAttribute('offset', '4.87%')
      stop1.setAttribute('stop-color', '#180707')

      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
      stop2.setAttribute('offset', '85.12%')
      stop2.setAttribute('stop-color', '#D81B1B')

      gradient.appendChild(stop1)
      gradient.appendChild(stop2)
      defs.appendChild(gradient)
    }

    // Set up simple fade animation
    paths.forEach((path) => {
      // Set initial state with gradient fill but invisible
      gsap.set(path, {
        fill: `url(#${gradientId})`,
        opacity: 0,
      })
    })

    // Create simple fade-in animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    // Fade in all paths
    tl.to(paths, {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.02,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [svgContent])

  return (
    <footer className="mt-auto bg-black text-white" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container pt-12 gap-8 flex flex-col">
        {/* Logo and Description with Social Icons */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-8 w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo and Description */}
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-2xl">
            <Link className="flex items-center flex-shrink-0" href="/">
              <LogoFooter />
            </Link>
            <div className="flex flex-col gap-4">
              <p
                className={`text-center lg:text-left text-white text-lg ${isArabic ? 'IBMPlexSansArabic-SemiBold !text-right' : ''}`}
              >
                {t('footer.description')}
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <nav className="flex flex-row">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12"
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 32 32"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.872 13.7319L30.496 0.5H27.7425L17.645 11.9867L9.58623 0.5H0.289062L12.4782 17.8716L0.289062 31.7455H3.04262L13.6989 19.6126L22.2114 31.7455H31.5086M4.03644 2.53343H8.26669L27.7404 29.812H23.5091" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12"
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </nav>
        </motion.div>

        {/* Separator */}
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full h-px bg-white/20" />
          <motion.p
            className={`text-white text-xs text-center lg:text-left ${isArabic ? 'IBMPlexSansArabic-SemiBold' : ''}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('footer.copyright')}
          </motion.p>
        </motion.div>

        {/* Copyright and Bottom Image */}
        <div className="flex flex-col gap-6">
          <div
            ref={svgRef}
            className="w-full flex justify-center items-center"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>
      </div>
    </footer>
  )
}
