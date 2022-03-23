import {
  newsRemoteDataSourceFactory,
  NewsRemoteDataSource,
} from "data/datasource/news";
import { Source } from "data/entity/source";
import { Article } from "data/entity/article";

export interface NewsRepository {
  getSourceHeadlines(source: Source): Promise<Article[]>;
  getAvailableSources(): Promise<Source[]>;
}

export function newsRepositoryFactory(
  newsRemoteDataSource: NewsRemoteDataSource = newsRemoteDataSourceFactory()
): NewsRepository {
  return {
    getSourceHeadlines: async (source) => {
      const { data } = await newsRemoteDataSource.getSourceHeadlines(source.id);
      return data?.articles || [];
    },
    getAvailableSources: async () => {
      const { data } = await newsRemoteDataSource.getAvailableSources();
      return data?.sources || [];
    },
  };
}
