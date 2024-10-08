'use client'
import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation'
import { locales } from './i18n'

export const localePrefix = 'always'

export const pathnames = {
  '/': '/',
  '/pages/about': '/pages/about',
  '/pages/fronts': '/pages/fronts',
  '/pages/competitions': '/pages/competitions',
  '/pages/learn': '/pages/learn',
  '/pages/projects': '/pages/projects',
  '/pages/contact': '/pages/contact',
  '/pages/events/dataDay': '/pages/events/dataDay',
  '/pages/events/udl': '/pages/events/udl',
  '/pages/events/udl/speakers': '/pages/events/udl/speakers'
} as const satisfies Pathnames<typeof locales>

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames })
