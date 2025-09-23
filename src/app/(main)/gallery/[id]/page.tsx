import { FGetPortfolioItem } from '@/api/api'
import type { TPortfolio } from '@/types'
import VideoDetailsView from '@/app/(main)/_components/template/video/VideoDetailsPage'

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await FGetPortfolioItem({ id, categoryId: 27 })
  const data: TPortfolio = res?.data
  if (!data) {
    return (
      <div className="min-h-[600px] flex items-center justify-center  animate-bounce  text-primary">
        موردی یافت نشد.
      </div>
    )
  }

  return <VideoDetailsView data={data} />
}
