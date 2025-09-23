import GalleryTopSlider from '@/app/(main)/_components/template/photo/GalleryTopSlider'
import GalleryGrid from '@/app/(main)/_components/template/photo/GridGallery'
import { FGetGalleryItems } from '@/api/api'

export default async function PhotoPage() {
  const sliderRes = await FGetGalleryItems({ categoryId: 23, isSlider: true })
  const sliderItems = sliderRes?.data || []

  const gridRes = await FGetGalleryItems({ categoryId: 23, isSlider: false })
  const gridItems = gridRes?.data || []
  const gridMeta = gridRes?.meta || {}
  console.log(sliderItems)
  return (
    <>
      <GalleryTopSlider slides={sliderItems} />
      <GalleryGrid items={gridItems} pageInfo={gridMeta} />
    </>
  )
}
