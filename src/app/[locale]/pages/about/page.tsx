import { useTranslations } from 'next-intl'

export default function About() {
  const t = useTranslations('')
  return (
    <div className='px-32 py-24 text-center text-2xl'>
      {t(
        'text_test'
      )}
    </div>
  )
}
