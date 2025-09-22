import { TCategory, TComment, TMeta, TPage, TPortfolio, TPost, TPostItem } from "@/types";

export type TGetPage = {
  message: string;
  data: TPage;
};

export type TGetCategoriesPostList = {
  message: string;
  data: {
    id: number;
    title: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    content: TPostItem[];
  }[];
  meta: TMeta;
};

export type TGetPostList = {
  message: string;
  data: TPostItem[];
  meta: TMeta;
};

export type TGetPost = {
  message: string;
  data: TPost;
};

export type TGetCategories = {
  meta_data: {
    code: number;
  };
  message: string;
  noCategoryPostProductCount: number;
  data: TCategory[];
  meta: TMeta;
};

export type TCreateComment = {
  id: number;
  body: string;
  parentId?: number;
  name?: string;
  email?: string;
  type?: "POST";
};

export type TGetCommentList = {
  message: string;
  data: {
    comment: TComment[];
  };
  meta: TMeta;
};

export type TGetPortfolioList = {
  message: string;
  data: TPortfolio[];
  meta: TMeta;
};


export type TGetSliderPosts = {
  message: string
  data: TPostItem[]
  meta: TMeta
}


export type TGetGalleryItems = {
  message: string
  data: TPortfolio[]
  meta: TMeta
}


export type TGetPortfolioItem = {
  message: string
  data: TPortfolio
}
