import { useEffect } from "react";
import { Text, ScrollView, ActivityIndicator } from "react-native";
import { Edge } from "react-native-safe-area-context";

import { Scaffold, SingleLoaderWrapper } from "ui/timeline/styles";
import { useTimelineViewModel } from "ui/timeline/view-model";

const SCAFFOLD_EDGES: Edge[] = ["top", "left", "right"];

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
          <ActivityIndicator size="small" color="purple" />
        </SingleLoaderWrapper>
      ) : (
        <ScrollView>
          <Text>{JSON.stringify(viewModel.uiState)}</Text>
        </ScrollView>
      )}
    </Scaffold>
  );
}
