'use client'
import { Link } from '../../../navigation'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import LogoIcon from '../../icons/logo'
import LangSwitcher from './LangSwitcher'
import ThemeSwitch from './ThemeSwitch'

interface Props {
  locale: string
}

export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('')

  return (
    <div className='mx-auto flex max-w-screen-2xl items-center justify-between p-5'>
      <Link lang={locale} href={`/`}>
        <div className='flex flex-row items-center'>
          <div className='mb-2 h-14 w-14'>
            <LogoIcon />
          </div>
        </div>
      </Link>
      <div className='mx-auto flex items-center gap-10 text-center font-bold'>
        <Link lang={locale} href={`/pages/about`}>
          {t('About')}
        </Link>
        <Link lang={locale} href={`/pages/fronts`}>
          {t('Fronts')}
        </Link>
        <Link lang={locale} href={`/pages/competitions`}>
          {t('Competitions')}
        </Link>
        <Link lang={locale} href={`/pages/learn`}>
          {t('Learn')}
        </Link>
      </div>
      <div className='flex flex-row items-center gap-3'>
        <ThemeSwitch />
        <LangSwitcher locale={locale} />
      </div>
    </div>
  )
}
