'use client'
import { useState } from 'react'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import LogoIcon from '../../icons/logo'
import LangSwitcher from './LangSwitcher'
import ThemeSwitch from './ThemeSwitch'
import PageList from './PageList'

interface Props {
  locale: string
}

export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('')
  const [selectedPath, setSelectedPath] = useState('')

  const handleLinkClick = (path: string) => {
    setSelectedPath(path)
  }

  const getLinkClass = (path: string) => {
    return selectedPath === path ? 'text-data-purple' : ''
  }

  const pages = [
    { name: 'Fronts', path: '/pages/fronts' },
    { name: 'Competitions', path: '/pages/competitions' },
    { name: 'Learn', path: '/pages/learn' },
    { name: 'Projects', path: '/pages/projects' },
    { name: 'Contact', path: '/pages/contact' },
    { name: 'About', path: '/pages/about' },
  ]

  return (
    <div className='mx-auto flex max-w-screen-2xl items-center justify-between p-5'>
      <Link lang={locale} href={`/`} onClick={() => setSelectedPath('')}>
        <div className='flex flex-row items-center'>
          <div className='mb-2 h-14 w-14'>
            <LogoIcon />
          </div>
        </div>
      </Link>
      <div className='mx-auto flex items-center gap-10 text-center font-bold'>
        <Link
          lang={locale}
          href={`/pages/fronts`}
          className={getLinkClass('/pages/fronts')}
          onClick={() => handleLinkClick('/pages/fronts')}
        >
          {t('Header.Fronts')}
        </Link>
        <Link
          lang={locale}
          href={`/pages/competitions`}
          className={getLinkClass('/pages/competitions')}
          onClick={() => handleLinkClick('/pages/competitions')}
        >
          {t('Header.Competitions')}
        </Link>
        <Link
          lang={locale}
          href={`/pages/learn`}
          className={getLinkClass('/pages/learn')}
          onClick={() => handleLinkClick('/pages/learn')}
        >
          {t('Header.Learn')}
        </Link>
        <Link
          lang={locale}
          href={`/pages/projects`}
          className={getLinkClass('/pages/projects')}
          onClick={() => handleLinkClick('/pages/projects')}
        >
          {t('Header.Projects')}
        </Link>
        <Link
          lang={locale}
          href={`/pages/contact`}
          className={getLinkClass('/pages/contact')}
          onClick={() => handleLinkClick('/pages/contact')}
        >
          {t('Header.Contact')}
        </Link>
        <PageList pages={pages} pageListName={t('Header.Events')} />
      </div>
      <div className='flex flex-row items-center gap-3'>
        <ThemeSwitch />
        <LangSwitcher locale={locale} />
      </div>
    </div>
  )
}

export default Header
