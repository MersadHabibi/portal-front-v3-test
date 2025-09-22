import Hero from './_components/Hero'
import { FGetPage, FGetPostList, FGetSliderPosts } from '@/api/api'
import History from './_components/History'
import News from './_components/News'
import { TMeta, TPage, TPostItem } from '@/types'
import { TGetPostList } from '@/api/api.type'

export default async function IndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
}) {
  const page = Number((await searchParams).page || '1')

  let homePage: TPage | null = null

  try {
    const res = await FGetPage({ url: 'home' })

    if (!res.ok) {
      homePage = null
      throw new Error()
    }

    homePage = (await res.json()).data as TPage
  } catch {
    homePage = null
  }

  let news: TGetPostList | null = null

  try {
    const res = await FGetPostList({ page, limit: 15 })

    if (!res.ok) {
      news = null
      throw new Error()
    }

    news = (await res.json()) as TGetPostList
  } catch {
    news = null
  }

  let sliderPosts: TPostItem[] = []

  try {
    const res = await FGetSliderPosts()
    if (res?.data) {
      sliderPosts = res.data
    }
  } catch {
    sliderPosts = []
  }

  return (
    <div className="w-full flex flex-col justify-start items-center pb-0">
      <Hero pageData={homePage} sliderPosts={sliderPosts} />
      <News data={news?.data || []} meta={news?.meta || ({} as TMeta)} />
      <History pageData={homePage} />
    </div>
  )
}
