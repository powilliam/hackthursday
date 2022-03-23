import { AxiosInstance } from "axios";

import NewsService from "data/service/news";

export interface NewsRemoteDataSource {
  // TODO: Create a DTO for this request
  getSourceHeadlines(sources: string): Promise<{}>;
  // TODO: Create a DTO for this request
  getAvailableSources(): Promise<{}>;
}

export function newsRemoteDataSourceFactory(
  newsService: AxiosInstance = NewsService
): NewsRemoteDataSource {
  return {
    // TODO: Implement this method
    getSourceHeadlines: (sources) =>
      newsService.get("", { params: { sources } }),
    // TODO: Add available categories
    getAvailableSources: async () => ({}),
  };
}
