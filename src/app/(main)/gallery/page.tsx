import GalleryTopSlider from '@/app/(main)/_components/template/photo/GalleryTopSlider'
import GalleryGrid from '@/app/(main)/_components/template/photo/GridGallery'
import { FGetGalleryItems } from '@/api/api'

export default async function Gallery() {
  const sliderRes = await FGetGalleryItems({ categoryId: 27, isSlider: true })
  const sliderItems = sliderRes?.data || []

  const gridRes = await FGetGalleryItems({ categoryId: 27, isSlider: false })
  const gridItems = gridRes?.data || []
  const gridMeta = gridRes?.meta || {}

  return (
    <>
      <GalleryTopSlider slides={sliderItems} />
      <GalleryGrid items={gridItems} pageInfo={gridMeta} />
    </>
  )
}
 