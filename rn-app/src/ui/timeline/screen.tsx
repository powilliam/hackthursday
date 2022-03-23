import { useEffect } from "react";
import { ScrollView, ActivityIndicator, FlatList } from "react-native";
import { Edge } from "react-native-safe-area-context";
import * as Linking from "expo-linking";

import {
  Scaffold,
  SingleLoaderWrapper,
  SourceSeparator,
  HeadlineSeparator,
} from "ui/timeline/styles";
import { useTimelineViewModel } from "ui/timeline/view-model";
import { Source as SourceChip } from "ui/timeline/source/component";
import { Headline } from "ui/timeline/headline/component";

import { Source } from "data/entity/source";
import { Article } from "data/entity/article";

const SCAFFOLD_EDGES: Edge[] = ["top", "left", "right"];

const onExtractSourceKey = (source: Source) => `${source.id}-${source.name}`;
const onExtractArticleKey = (article: Article) => article.url;

export default function TimelineScreen() {
  const viewModel = useTimelineViewModel();

  const canAvoidMultipleLoaders =
    viewModel.uiState.isRetrievingArticles &&
    viewModel.uiState.isRetrievingSources;

  useEffect(() => {
    viewModel.events?.onRetrieveSourcesAndArticles();
  }, []);

  return (
    <Scaffold edges={SCAFFOLD_EDGES}>
      {canAvoidMultipleLoaders ? (
        <SingleLoaderWrapper>
          <ActivityIndicator size="small" color="lightpurple" />
        </SingleLoaderWrapper>
      ) : (
        <ScrollView nestedScrollEnabled>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={viewModel.uiState.sources}
            keyExtractor={onExtractSourceKey}
            contentContainerStyle={{ padding: 16 }}
            ItemSeparatorComponent={() => <SourceSeparator />}
            renderItem={({ item }) => (
              <SourceChip
                source={item}
                onPress={() =>
                  viewModel.events?.onRetrieveArticlesFromSource(item)
                }
              />
            )}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={viewModel.uiState.articles}
            keyExtractor={onExtractArticleKey}
            ItemSeparatorComponent={() => <HeadlineSeparator />}
            renderItem={({ item }) => (
              <Headline
                article={item}
                onPress={async () =>
                  (await Linking.canOpenURL(item.url)) &&
                  Linking.openURL(item.url)
                }
              />
            )}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </ScrollView>
      )}
    </Scaffold>
  );
}
