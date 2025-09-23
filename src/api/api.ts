import {
  TCreateComment,
  TGetSliderPosts,
  TGetGalleryItems,
  TGetPortfolioItem,
} from './api.type'

export function handleQueries(
  queries: Record<string, number | string | undefined>
) {
  return (
    Object.entries(queries)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ?.filter(([_, value]) => value)
      .map(([key, value]) => {
        if (value)
          return `${encodeURIComponent(key)}=${encodeURIComponent(
            String(value)
          )}`
      })
      .join('&')
  )
}

export async function FGetPage({
  type = 'PAGE',
  url,
}: {
  type?: string
  url: string
}) {
  return await fetch(
    process.env.baseUrl + `/api/v1/client/web/getPage/${type}/${url}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  )
}

export async function FGetPostList({
  page,
  limit,
  search,
}: {
  page?: number
  limit?: number
  search?: string
}) {
  return await fetch(
    process.env.baseUrl +
      `/api/v1/client/web/getPostList?${handleQueries({
        page,
        limit,
        search,
      })}`,
    {
      cache: 'no-store',
      method: 'GET',
    }
  )
}
export async function FGetCategoriesPostList({
  page,
  limit,
  id,
}: {
  page?: number
  limit?: number
  id: number
}) {
  return await fetch(
    process.env.baseUrl +
      `/api/v1/client/web/getCategoriesPostList/${id}?${handleQueries({
        page,
        limit,
      })}`,
    {
      cache: 'no-store',
      method: 'GET',
    }
  )
}

export async function FGetPost({
  type = 'POST',
  url,
}: {
  type?: string
  url: string
}) {
  return await fetch(
    process.env.baseUrl + `/api/v1/client/web/getPost/${type}/${url}`,
    { cache: 'no-store' }
  )
}

export async function FGetGeneralSetting() {
  return await fetch(
    process.env.baseUrl + '/api/v1/client/web/getGeneralSetting',
    {
      method: 'GET',
    }
  )
}

export async function FGetCategoryList() {
  return await fetch(
    process.env.baseUrl + `/api/v1/client/web/getPostCategoriesList`,
    {
      method: 'GET',
    }
  )
}

export async function FGetCommentList({
  type,
  id,
  page,
  limit = 5,
}: {
  type?: string
  id: number
  page: number
  limit?: number
}) {
  return await fetch(
    process.env.baseUrl +
      `/api/v1/client/web/getCommentList/${type}/${id}?${handleQueries({
        page,
        limit,
      })}`,
    {
      method: 'GET',
    }
  )
}

export async function FCreateComment({ props }: { props: TCreateComment }) {
  return await fetch(
    process.env.baseUrl + `/api/v1/client/comment/createComment`,
    {
      method: 'POST',
      body: JSON.stringify(props),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export async function FGetPortfolioList({
  page,
  limit = 5,
}: {
  page: number
  limit?: number
}) {
  return await fetch(
    process.env.baseUrl +
      `/api/v1/client/web/getPortfolioList?${handleQueries({
        page,
        limit,
      })}`,
    {
      method: 'GET',
    }
  )
}

export async function FGetSliderPosts(): Promise<TGetSliderPosts> {
  const res = await fetch(
    process.env.baseUrl + `/api/v1/client/web/getPostList?isSlider=true`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch slider posts')
  }

  return await res.json()
}

export async function FGetGalleryItems({
  page,
  limit = 5,
  categoryId,
  isSlider,
}: {
  page?: number
  limit?: number
  categoryId?: number
  isSlider?: boolean
}): Promise<TGetGalleryItems> {
  const query = handleQueries({
    page,
    limit,
    categoryId,
    isSlider: isSlider ? 'true' : undefined,
  })

  console.log(query, 'query')

  const res = await fetch(
    process.env.baseUrl + `/api/v1/client/web/getPortfolioList?${query}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch gallery items')
  }

  return await res.json()
}

export async function FGetPortfolioItem({
  id,
  categoryId,
}: {
  id: string
  categoryId?: number
}): Promise<TGetPortfolioItem> {
  const query = categoryId ? `?categoryId=${categoryId}` : ''
  const res = await fetch(
    `${process.env.baseUrl}/api/v1/client/web/getPortfolio/${id}${query}`,
    {
      method: 'GET',
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch portfolio item')
  }

  return await res.json()
}
