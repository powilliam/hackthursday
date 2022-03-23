import { AxiosInstance, AxiosResponse } from "axios";

import NewsService from "data/service/news";
import { Source } from "data/entity/source";
import { Article } from "data/entity/article";

export interface GetSourceHeadlinesDTO {
  readonly status: string;
  readonly totalResults: number;
  readonly articles: Article[];
}

export interface GetAvailableSourcesDTO {
  readonly status: string;
  readonly sources: Source[];
}

export interface NewsRemoteDataSource {
  getSourceHeadlines(
    sources: string
  ): Promise<AxiosResponse<GetSourceHeadlinesDTO>>;
  getAvailableSources(): Promise<AxiosResponse<GetAvailableSourcesDTO>>;
}

export function newsRemoteDataSourceFactory(
  newsService: AxiosInstance = NewsService
): NewsRemoteDataSource {
  const ENDPOINTS = {
    HEADLINES: "/v2/top-headlines",
    SOURCES: "/v2/top-headlines/sources",
  };

  return {
    getSourceHeadlines: (sources) =>
      newsService.get<GetSourceHeadlinesDTO>(ENDPOINTS.HEADLINES, {
        params: { sources },
      }),
    getAvailableSources: () =>
      newsService.get<GetAvailableSourcesDTO>(ENDPOINTS.SOURCES),
  };
}
