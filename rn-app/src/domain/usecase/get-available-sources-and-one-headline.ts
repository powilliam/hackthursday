import { Article } from "data/entity/article";
import { Source } from "data/entity/source";
import { newsRepositoryFactory, NewsRepository } from "data/repository/news";

export interface GetAvailableSourcesAndOneHeadlineDTO {
  readonly currentSelectedSource?: Source;
  readonly sources: Source[];
  readonly articles: Article[];
}

export interface GetAvailableSourcesAndOneHeadline {
  execute(): Promise<GetAvailableSourcesAndOneHeadlineDTO>;
}

export function getAvailableSourcesAndOneHeadlineUseCaseFactory(
  newsRepository: NewsRepository = newsRepositoryFactory()
): GetAvailableSourcesAndOneHeadline {
  return {
    execute: async () => {
      const availableSources = await newsRepository.getAvailableSources();
      const hasAnySource = availableSources.length > 0;
      const defaultReturn = {
        sources: availableSources,
        articles: [],
      };
      if (!hasAnySource) {
        return defaultReturn;
      }
      return {
        ...defaultReturn,
        articles: await newsRepository.getSourceHeadlines(availableSources[0]),
        currentSelectedSource: availableSources[0],
      };
    },
  };
}
