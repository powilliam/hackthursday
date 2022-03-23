import {
  newsRemoteDataSourceFactory,
  NewsRemoteDataSource,
} from "data/datasource/news";

// TODO: it shouldn't extends a data source
export interface NewsRepository {
  // TODO: Use Source and Headline entity
  getSourceHeadlines(source: {}): Promise<[]>;
  // TODO: Use Source entitiy
  getAvailableSources(): Promise<any[]>;
}

export function newsRepositoryFactory(
  newsRemoteDataSource: NewsRemoteDataSource = newsRemoteDataSourceFactory()
): NewsRepository {
  return {
    getSourceHeadlines: async (source) => [],
    getAvailableSources: async () => [],
  };
}
