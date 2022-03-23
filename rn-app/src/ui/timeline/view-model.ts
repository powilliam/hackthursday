import { useReducer, Reducer } from "react";

import { BaseViewModel } from "ui/base-view-model";
import { BaseReducerAction } from "ui/base-reducer-action";

import { Source } from "data/entity/source";
import { Article } from "data/entity/article";
import { newsRepositoryFactory, NewsRepository } from "data/repository/news";

interface TimelineUiState {
  readonly isRetrievingSources: boolean;
  readonly isRetrievingArticles: boolean;
  readonly hasFailedToRetrieveSources: boolean;
  readonly hasFailedToRetrieveArticles: boolean;
  readonly sources: Source[];
  readonly articles: Article[];
}

interface TimelineUiEvents {
  onRetrieveSourcesAndArticles(): Promise<void>;
  onRetrieveArticlesFromSource(source: Source): Promise<void>;
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
  | SuccessfullyHasRetrievedArticlesActionPayload;

const initialState: TimelineUiState = {
  isRetrievingArticles: false,
  isRetrievingSources: false,
  hasFailedToRetrieveArticles: false,
  hasFailedToRetrieveSources: false,
  sources: [],
  articles: [],
};

const reducer: Reducer<
  TimelineUiState,
  BaseReducerAction<TimelineReducerActionType, TimelineReducerActionPayload>
> = (state, action) => {
  switch (action.type) {
    case "retrieving-articles":
      return {
        ...state,
        isRetrievingArticles: true,
        hasFailedToRetrieveArticles: false,
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
): BaseViewModel<TimelineUiState, TimelineUiEvents> {
  const [uiState, dispatch] = useReducer(reducer, initialState);

  const onRetrieveSourcesAndArticles = async () => {
    try {
      await Promise.all([
        dispatch({ type: "retrieving-sources" }),
        dispatch({ type: "retrieving-articles" }),
      ]);
      const availableSources = await newsRepository.getAvailableSources();
      dispatch({
        type: "sucessfully-has-retrieved-sources",
        payload: { sources: availableSources },
      });
      if (availableSources.length > 0) {
        const articlesFromFirstRetrievedSource =
          await newsRepository.getSourceHeadlines(availableSources[0]);
        dispatch({
          type: "sucessfully-has-retrieved-articles",
          payload: { articles: articlesFromFirstRetrievedSource },
        });
      }
    } catch (e) {
      await Promise.all([
        dispatch({ type: "failed-to-retrieve-articles" }),
        dispatch({ type: "failed-to-retrieve-sources" }),
      ]);
    }
  };

  const onRetrieveArticlesFromSource = async (source: Source) => {
    try {
      dispatch({ type: "retrieving-articles" });
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
    uiState,
    events: { onRetrieveSourcesAndArticles, onRetrieveArticlesFromSource },
  };
}
