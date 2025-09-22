// مسیر: src/app/(main)/photo/[id]/page.tsx

import { FGetPortfolioItem } from '@/api/api'
import PhotoDetailsView from '@/app/(main)/_components/template/photo/PhotoDetailsView'

export default async function PhotoDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const id = Number(params.id)

  const res = await FGetPortfolioItem({ id })

  return <PhotoDetailsView data={res?.data} />
}
