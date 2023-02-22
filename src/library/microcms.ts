//SDK利用準備
import { createClient, MicroCMSQueries } from "microcms-js-sdk";
const client = createClient({
  serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_MICROCMS_API_KEY,
});

//型定義
export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  category: string;
  tag: string;
};
export type BlogResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Blog[];
};
export type Category = {
  name: string,
};
export type Tag = {
  name: string,
};


//APIの呼び出し
export const getBlogs = async (queries?: MicroCMSQueries) => {
  return await client.get<BlogResponse>({ endpoint: "news", queries });
};
export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Blog>({
    endpoint: "news",
    contentId,
    queries,
  });
};

export const getCategories = async (queries?: MicroCMSQueries) => {
  return await client.get<Category>({ endpoint: "categories", queries });
};

const test = () => {
  fetch(
    `https://${import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/news?filters=category[equals]rsdglv3td1`,
    {
      headers: {
        "X-MICROCMS-API-KEY": "2EPa5f56BnzxuiHaGhRJeCzXAeKhmDCmqb67",
      },
    }
  )
    .then((result) => result.json())
    .then((json) => console.log(json));
};