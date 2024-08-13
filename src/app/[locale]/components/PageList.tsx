'use client'
import React, { useState } from 'react'
import { capitalize } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Link } from '@/src/navigation'
import { FiList } from 'react-icons/fi'

interface Page {
  name: string
  path: string
}

interface Props {
  pages: Page[]
  pageListName?: string // Adiciona a prop opcional
}

const PageList: React.FC<Props> = ({ pages, pageListName }) => {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='flex items-center justify-center'>
      <div className='relative'>
        <button
          className={`p-2 focus:outline-none ${!pageListName ? 'font-inter text-lg' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
          onBlur={() => setIsExpanded(false)}
          style={{ backgroundColor: 'transparent' }}
          aria-label='Page List'
        >
          {pageListName ? (
            <span className='font-bold text-primary text-sm uppercase'>
              {capitalize(pageListName)}
            </span>
          ) : (
            <FiList size={24} color='var(--primary)' />
          )}
        </button>
        {isExpanded && (
          <div className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-dropdown shadow-lg z-50'>
            <div
              className='py-1 flex flex-col items-center'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='page-list-menu'
            >
              {pages.map(page => {
                const isSelected = pathname === page.path
                return (
                  <Link
                    key={page.path}
                    href={page.path}
                  >
                    <button
                      onMouseDown={e => {
                        e.preventDefault()
                      }}
                      className={`block w-full px-4 py-2 text-center text-sm rounded-full font-inter ${
                        isSelected
                          ? 'bg-selected text-primary hover:bg-selected shadow-lg'
                          : 'text-secondary'
                      } ${isSelected ? 'backdrop-filter backdrop-blur-md' : ''}`}
                      style={isSelected ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}}
                    >
                      {capitalize(page.name)}
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

export default PageList
