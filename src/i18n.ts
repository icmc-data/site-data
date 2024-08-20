import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['en', 'br']
export default getRequestConfig(async ({ locale }) => {
  // validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../languages/${locale}.json`)).default
  }
})
