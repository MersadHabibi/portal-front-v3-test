'use client'

import { TPortfolio } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import Pagination, { TPageInfo } from '@/modules/Pagination'

type Props = {
  items: TPortfolio[]
  pageInfo?: TPageInfo
}

export default function GridGallery({ items, pageInfo }: Props) {
  if (!items.length)
    return <p className="text-center py-10 text-muted">موردی یافت نشد.</p>

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {items.map((item) => (
          <li
            key={item.id}
            className="group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            <Link
              href={`/photo/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <figure className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={item.media?.[0]?.url || '/images/image-placeholder.jpg'}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </figure>

              <div className="p-4">
                <h3 className=" text-sm md:text-lg font-bold text-primary group-hover:text-primary/80 transition-colors truncate whitespace-nowrap overflow-hidden">
                  {item.title}
                </h3>

                <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
                  <span className="block truncate whitespace-nowrap overflow-hidden">
                    {item.creator?.firstName} {item.creator?.lastName}
                  </span>

                  <time className="text-xs text-gray-400">
                    {new Date().toLocaleDateString('fa-IR')}
                  </time>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Pagination pageInfo={pageInfo} />
      </div>
    </div>
  )
}
