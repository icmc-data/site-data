'use client'
import { capitalize } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import React, { useState } from 'react'
import { FiGlobe } from 'react-icons/fi'

const LangSwitcher: React.FC = () => {
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
          <div className='absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-dropdown shadow-lg'>
            <div
              className='py-1 flex flex-col items-center'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              {options.map(lang => {
                const isSelected = pathname === `/${lang.code}`
                return (
                  <Link
                    key={lang.code}
                    href={`/${lang.code}/${urlSegments.join('/')}`}
                  >
                    <button
                      lang={lang.code}
                      onMouseDown={e => {
                        e.preventDefault()
                      }}
                      className={`block w-full px-4 py-2 text-center text-sm rounded-full ${
                        isSelected
                          ? 'bg-selected text-primary hover:bg-selected shadow-lg'
                          : 'text-secondary'
                      } ${isSelected ? 'backdrop-filter backdrop-blur-md' : ''}`}
                      style={isSelected ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}}
                    >
                      {lang.country}
                    </button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LangSwitcher
