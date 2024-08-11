import { useTranslations } from 'next-intl'
import PostList from '../../components/PostList'
import postsLearn from '@/data/postsLearn.json'

export default function Learn() {
  const t = useTranslations('')
  return (
    <div className='px-32 py-24 text-center text-2xl'>
      {t(
        'Header.text_test'
      )}

      <PostList posts={postsLearn} />
    </div>
  )
}
