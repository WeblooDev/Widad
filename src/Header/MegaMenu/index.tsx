'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown, ChevronUp, X } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface MenuItem {
  label: string
  href?: string
  children?: MenuItem[]
}

const menuData: MenuItem[] = [
  {
    label: 'Teams',
    children: [
      {
        label: 'Football',
        children: [
          {
            label: 'Men',
            children: [
              { label: 'Squad', href: '/mens-team' },
              { label: 'Staff', href: '/teams/football/men/staff' },
              { label: 'Fixtures & Results', href: '/teams/football/men/fixtures' },
              { label: 'Standings', href: '/teams/football/men/standings' },
            ],
          },
          {
            label: 'Women',
            children: [
              { label: 'Squad', href: '/teams/football/women/squad' },
              { label: 'Staff', href: '/teams/football/women/staff' },
              { label: 'Fixtures & Results', href: '/teams/football/women/fixtures' },
              { label: 'Standings', href: '/teams/football/women/standings' },
            ],
          },
          {
            label: 'Juniors',
            children: [
              { label: 'All Levels', href: '/teams/football/juniors/all-levels' },
              { label: 'Scouting', href: '/teams/football/juniors/scouting' },
              { label: 'Joining', href: '/teams/football/juniors/joining' },
            ],
          },
        ],
      },
      {
        label: 'Other Sports',
        children: [
          { label: 'Basketball', href: '/teams/other-sports/basketball' },
          { label: 'Handball', href: '/teams/other-sports/handball' },
          { label: 'Water Polo', href: '/teams/other-sports/water-polo' },
          { label: 'Swimming', href: '/teams/other-sports/swimming' },
        ],
      },
    ],
  },
  {
    label: 'The Club',
    children: [
      { label: 'History & Heritage', href: '/club-history' },
      { label: 'Honours & Trophies', href: '/trophies' },
      { label: 'Organization', href: '/club/organization' },
    ],
  },
  {
    label: 'Multimedia',
    children: [
      { label: 'Wydad TV', href: '/multimedia/wydad-tv' },
      { label: 'Photo Galleries', href: '/multimedia/photos' },
      { label: 'Videos', href: '/multimedia/videos' },
      { label: 'Podcasts & Exclusive Content', href: '/multimedia/podcasts' },
      { label: 'Wydad Play', href: '/multimedia/wydad-play' },
    ],
  },
  {
    label: 'Fans',
    children: [
      { label: 'Fan Content', href: '/fans/content' },
      { label: 'Tifo Gallery', href: '/fans/tifo-gallery' },
      { label: 'Membership', href: '/fans/membership' },
      { label: 'Ultras Playlist', href: '/fans/ultras-playlist' },
    ],
  },
  {
    label: 'Shop',
    children: [
      { label: 'Featured Products', href: '/shop/featured' },
      { label: 'Jerseys & Apparel', href: '/shop/jerseys' },
      { label: 'Accessories', href: '/shop/accessories' },
      { label: 'Online Store Widget', href: '/shop/widget' },
    ],
  },
  {
    label: 'Community & CSR',
    children: [
      { label: 'Social Projects', href: '/community/social-projects' },
      { label: 'Local Engagement', href: '/community/local-engagement' },
      { label: 'Educational & Youth Initiatives', href: '/community/youth-initiatives' },
    ],
  },
  {
    label: 'Wydad App',
    children: [
      { label: 'App Overview', href: '/app/overview' },
      { label: 'Download Links', href: '/app/download' },
      { label: 'Press Relations', href: '/app/press' },
    ],
  },
  {
    label: 'Contact',
    children: [{ label: 'Club Directory', href: '/contact/directory' }],
  },
]

export const MegaMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [activeMainItem, setActiveMainItem] = useState<string>('Teams')
  const [activeSubItem, setActiveSubItem] = useState<string>('Football')
  const [expandedItems, setExpandedItems] = useState<string[]>(['Football', 'Other Sports', 'Men'])

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label],
    )
  }

  // Block scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const activeItem = menuData.find((item) => item.label === activeMainItem)
  const activeSubMenu = activeItem?.children?.find((item) => item.label === activeSubItem)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 top-[72px] bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Menu */}
          <div className="fixed top-[72px] left-0 right-0 bottom-0 z-50 flex">
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-white hover:text-primary-red transition-colors"
          aria-label="Close menu"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-8 h-8" />
        </motion.button>

        {/* Left Sidebar */}
        <motion.div
          className="w-1/4 bg-black text-white overflow-y-auto flex items-center"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <nav className="py-8 w-full">
            {menuData.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors text-[#9D9B9B]"
                    onClick={onClose}
                  >
                    <span className="text-xl font-light">{item.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => setActiveMainItem(item.label)}
                    className={`w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors ${
                      activeMainItem === item.label
                        ? 'bg-[#250909] text-primary-red'
                        : 'text-[#9D9B9B]'
                    }`}
                  >
                    <span className="text-xl font-light">{item.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </nav>
        </motion.div>

        {/* Right Panel - Detailed Menu */}
        {activeItem?.children && (
          <motion.div
            className=" bg-black text-white overflow-y-auto w-1/4 flex items-center"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeInOut' }}
          >
            <div className="py-8 px-8 w-full">
              {activeItem.children.map((section) => (
                <div key={section.label} className="mb-6">
                  {section.children && section.children.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleExpanded(section.label)}
                        className="flex items-center justify-between w-full text-left py-3 text-xl font-normal hover:text-primary-red transition-colors"
                      >
                        <span>{section.label}</span>
                        {expandedItems.includes(section.label) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                      {expandedItems.includes(section.label) && (
                        <div className="mt-2 space-y-2">
                          {section.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href || '#'}
                              className="block py-2 text-xl font-light text-white/70 hover:text-white transition-colors"
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={section.href || '#'}
                      className="flex items-center justify-between w-full text-left py-3 text-xl font-light hover:text-primary-red transition-colors"
                      onClick={onClose}
                    >
                      <span>{section.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Right Side - Image/Content Area */}
        <motion.div
          className="hidden lg:block bg-gradient-to-b from-primary-red to-[#8B0000] relative overflow-hidden flex-1"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 scale-125 -translate-x-20 translate-y-20">
            <Image
              src="/images/mega-menu-image.webp"
              alt="Wydad Jersey"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm " />

          {/* App Download Section Overlay */}
          <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center">
            <div className="text-center text-white space-y-4  p-8 rounded-[20px]">
              <h3 className="text-2xl font-semibold">Get the WYDAD MOBILE APP</h3>
              <div className="flex gap-4 justify-center">
                <Link href="#" className="block">
                  <Image
                    src="/images/app-store.svg"
                    alt="Download on App Store"
                    width={140}
                    height={42}
                    className="h-12 w-auto"
                  />
                </Link>
                <Link href="#" className="block">
                  <Image
                    src="/images/google-play.svg"
                    alt="Get it on Google Play"
                    width={140}
                    height={42}
                    className="h-12 w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
        </>
      )}
    </AnimatePresence>
  )
}
