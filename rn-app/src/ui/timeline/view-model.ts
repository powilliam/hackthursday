import { useReducer, Reducer } from "react";

import { BaseViewModel } from "ui/base-view-model";
import { BaseReducerAction } from "ui/base-reducer-action";

import { Source } from "data/entity/source";
import { Article } from "data/entity/article";
import { newsRepositoryFactory, NewsRepository } from "data/repository/news";

interface TimelineUiStateWithComputedProperties {
  readonly isRetrievingSources: boolean;
  readonly isRetrievingArticles: boolean;
  readonly hasFailedToRetrieveSources: boolean;
  readonly hasFailedToRetrieveArticles: boolean;
  readonly canAvoidMultipleLoaders: boolean;
  readonly currentSelectedSource?: Source;
  readonly sources: Source[];
  readonly articles: Article[];
}
type TimelineUiStateWithoutComputedProperties = Omit<
  TimelineUiStateWithComputedProperties,
  "canAvoidMultipleLoaders"
>;

interface TimelineUiEvents {
  onRetrieveSourcesAndArticles(): Promise<void>;
  onRetrieveArticlesFromSource(source: Source): Promise<void>;
}

interface RetrievingArticlesActionPayload {
  readonly source: Source;
}
interface SuccessfullyHasRetrievedSourcesActionPayload {
  readonly sources: Source[];
}
interface SuccessfullyHasRetrievedArticlesActionPayload {
  readonly articles: Article[];
}
type TimelineReducerActionType =
  | "retrieving-sources"
  | "retrieving-articles"
  | "sucessfully-has-retrieved-sources"
  | "sucessfully-has-retrieved-articles"
  | "failed-to-retrieve-sources"
  | "failed-to-retrieve-articles";
type TimelineReducerActionPayload =
  | SuccessfullyHasRetrievedSourcesActionPayload
  | SuccessfullyHasRetrievedArticlesActionPayload
  | RetrievingArticlesActionPayload;

const initialState: TimelineUiStateWithoutComputedProperties = {
  isRetrievingArticles: false,
  isRetrievingSources: false,
  hasFailedToRetrieveArticles: false,
  hasFailedToRetrieveSources: false,
  sources: [],
  articles: [],
};

const reducer: Reducer<
  TimelineUiStateWithoutComputedProperties,
  BaseReducerAction<TimelineReducerActionType, TimelineReducerActionPayload>
> = (state, action) => {
  switch (action.type) {
    case "retrieving-articles":
      return {
        ...state,
        isRetrievingArticles: true,
        hasFailedToRetrieveArticles: false,
        currentSelectedSource: (
          action.payload as RetrievingArticlesActionPayload
        )?.source,
      };
    case "retrieving-sources":
      return {
        ...state,
        isRetrievingSources: true,
        hasFailedToRetrieveSources: false,
      };
    case "sucessfully-has-retrieved-articles":
      return {
        ...state,
        isRetrievingArticles: false,
        hasFailedToRetrieveArticles: false,
        articles: (
          action.payload as SuccessfullyHasRetrievedArticlesActionPayload
        )?.articles,
      };
    case "sucessfully-has-retrieved-sources":
      return {
        ...state,
        isRetrievingSources: false,
        hasFailedToRetrieveSources: false,
        sources: (
          action.payload as SuccessfullyHasRetrievedSourcesActionPayload
        )?.sources,
      };
    case "failed-to-retrieve-articles":
      return {
        ...state,
        hasFailedToRetrieveArticles: true,
        isRetrievingArticles: false,
      };
    case "failed-to-retrieve-sources":
      return {
        ...state,
        hasFailedToRetrieveSources: true,
        isRetrievingSources: false,
      };
    default:
      return state;
  }
};

export function useTimelineViewModel(
  newsRepository: NewsRepository = newsRepositoryFactory()
): BaseViewModel<TimelineUiStateWithComputedProperties, TimelineUiEvents> {
  const [uiState, dispatch] = useReducer(reducer, initialState);

  const onRetrieveSourcesAndArticles = async () => {
    try {
      dispatch({ type: "retrieving-sources" });
      const availableSources = await newsRepository.getAvailableSources();
      dispatch({
        type: "sucessfully-has-retrieved-sources",
        payload: { sources: availableSources },
      });
      if (availableSources.length > 0) {
        await onRetrieveArticlesFromSource(availableSources[0]);
      }
    } catch (e) {
      dispatch({ type: "failed-to-retrieve-sources" });
    }
  };

  const onRetrieveArticlesFromSource = async (source: Source) => {
    try {
      dispatch({ type: "retrieving-articles", payload: { source } });
      const articles = await newsRepository.getSourceHeadlines(source);
      dispatch({
        type: "sucessfully-has-retrieved-articles",
        payload: { articles },
      });
    } catch (e) {
      dispatch({ type: "failed-to-retrieve-articles" });
    }
  };

  return {
    uiState: {
      ...uiState,
      canAvoidMultipleLoaders:
        uiState.isRetrievingArticles && uiState.isRetrievingSources,
    },
    events: { onRetrieveSourcesAndArticles, onRetrieveArticlesFromSource },
  };
}
