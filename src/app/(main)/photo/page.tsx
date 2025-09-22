import GalleryTopSlider from '@/app/(main)/_components/template/photo/GalleryTopSlider'
import { FGetGalleryItems } from '@/api/api'

export default async function PhotoPage() {
  const res = await FGetGalleryItems({ isSlider: true })
  const slides = res?.data || []

  return <GalleryTopSlider slides={slides} />
}
