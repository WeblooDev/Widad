import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const LogoFooter = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      width={130}
      height={164}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[100px] lg:max-w-[130px] w-full h-[120px] lg:h-[164px]', className)}
      src="/images/footer-logo.png"
    />
  )
}
