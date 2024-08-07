import { useTranslations } from 'next-intl'

export default function Competitions() {
  const t = useTranslations('')
  return (
    <div className='px-32 py-24 text-center text-2xl'>
      {t(
        'Header.text_test'
      )}
    </div>
  )
}
