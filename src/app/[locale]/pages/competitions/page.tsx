import { useTranslations } from 'next-intl'
import { getPosts } from '@/lib/utils'

export default function Competitions() {
  const t = useTranslations('')
  const posts = getPosts()

  return (
    <div className="py-24 text-2xl">
      <section className="flex relative py-0">
        <div className="flex items-center">
          <div>
            <h1>{t("Header.Competitions")}</h1>
            <br />
            <br />
            <div>
              {posts.map((post) => (
                <div key={post.id} className="mb-8">
                  <h2 className="text-3xl font-bold">{post.title}</h2>
                  <p className="text-sm text-gray-600">{post.date}</p>
                  <p className="mt-2">{post.tags.join(', ')}</p>
                  <div
                    className="mt-4"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
