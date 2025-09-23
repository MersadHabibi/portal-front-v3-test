import { FGetPortfolioItem } from '@/api/api'
import PhotoDetailsView from '@/app/(main)/_components/template/photo/PhotoDetailsView'
import type { TPortfolio } from '@/types'

export default async function PhotoDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await FGetPortfolioItem({ id, categoryId: 23 })
  const data: TPortfolio = res?.data

  if (!data) {
    return (
      <div className="min-h-[600px] flex items-center justify-center  animate-bounce  text-primary">
        موردی یافت نشد.
      </div>
    )
  }

  return <PhotoDetailsView data={data} />
}
