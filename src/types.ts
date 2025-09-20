export type TPage = {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  keyValues: {
    id: number;
    key: string;
    value: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    type: string;
    filesValue: {
      url: string;
      key: string;
    };
  }[];
};

export type TPost = {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  htmlCode: string;
  category: {
    id: number;
    name: string;
  }[];
  files: {
    id: number;
    productId: number;
    url: string;
    fileName: string;
    type: "IMAGE";
    fileSecurity: "PRODUCTPUBLIC";
  }[];
};

export type TPostItem = {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  htmlCode: string;
  _count: {
    comment:number;
  };
  files: {
    id: number;
    productId: number;
    url: string;
    fileName: string;
    type: "IMAGE";
    fileSecurity: "PRODUCTPUBLIC";
  }[];
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type TGeneralSetting = {
  id: number;
  title: string;
  description: string;
  indexing: boolean;
  headerCode: string;
  footerCode: string;
  commentStatus: boolean;
  logo: {
    url: string;
    key: string;
  };
  logoDark: {
    url: string;
    key: string;
  };
  favIcon: {
    url: string;
    key: string;
  };
  favIconDark: {
    url: string;
    key: string;
  };
};

export type TCategory = {
  id: string;
  name: string;
  url: string;
  description: string;
  head: null;
  postCounts: null;
};

export type TComment = {
  id: number;
  body: string;
  email?: string;
  name?: string;
  parentId?: number;
  contentId: number;
  productId: number;
  type: "POST";
  createdAt: string;
  updatedAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
  replies: TComment[];
};

export type TPortfolio = {
  id: number;
  description: string;
  status: string;
  title: string;
  media: {
    id: number;
    url: string;
    fileName: string;
    productId: null;
    type: string;
    fileSecurity: string;
  }[];
  creator: {
    id: number;
    firstName: string;
    lastName: string;
  };
};
