import Link from 'next/link'
import Image from 'next/image'

export const GlassButton: React.FC<{
  link: string
  url: string
  icon: () => React.ReactNode
  className?: string
}> = ({ link, url, icon, className }) => {
  return (
    <Link
      href="#"
      className={`backdrop-blur-md bg-white/10 border border-white/10 text-white rounded-[9px] py-3 px-5 text-sm font-normal shadow-lg hover:bg-white/30 transition-all flex items-center justify-center w-fit gap-2 ${className}`}
    >
      {link}
      {icon()}
    </Link>
  )
}
