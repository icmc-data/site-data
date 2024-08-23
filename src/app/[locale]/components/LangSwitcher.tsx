'use client'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import React, { useState } from 'react'
import { FiGlobe } from 'react-icons/fi'

interface Props {
  locale: string
}

const LangSwitcher: React.FC<Props> = ({ locale }) => {
  interface Option {
    country: string
    code: string
  }

  const pathname = usePathname()
  const urlSegments = useSelectedLayoutSegments()

  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false)
  const options: Option[] = [
    { country: '🇧🇷', code: 'br' },
    { country: '🇺🇸', code: 'en' },
  ]

  return (
    <div className='flex items-center justify-center'>
      <div className='relative'>
        <button
          className='p-2 focus:outline-none'
          onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
          onBlur={() => setIsOptionsExpanded(false)}
          style={{ backgroundColor: 'transparent' }}
          aria-label='Language Switcher'
        >
          <FiGlobe size={24} color='var(--primary)' />
        </button>
        {isOptionsExpanded && (
          <div className='absolute left-1/2 transform -translate-x-1/2 mt-2 w-24 origin-top rounded-md bg-dropdown shadow-lg z-50'>
            <div
              className='py-1 flex flex-col items-center'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              {options.map(lang => (
                <Link
                  key={lang.code}
                  href={`/${lang.code}/${urlSegments.join('/')}`}
                >
                  <button
                    lang={lang.code}
                    onMouseDown={e => {
                      e.preventDefault()
                    }}
                    className="block w-full px-2 py-1 text-center text-sm rounded-md text-secondary hover:bg-hover"
                  >
                    {lang.country}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LangSwitcher
