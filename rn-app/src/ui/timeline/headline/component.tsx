import { View, TouchableWithoutFeedbackProps } from "react-native";

import {
  OuterContainer,
  Card,
  Title,
  Author,
  Image,
} from "ui/timeline/headline/styles";

import { Article } from "data/entity/article";

interface HeadlineProps extends TouchableWithoutFeedbackProps {
  readonly article: Article;
}

export function Headline({ article, ...props }: HeadlineProps) {
  return (
    <OuterContainer {...props}>
      <Card>
        <View style={{ flex: 0.95 }}>
          <Title>{article.title}</Title>
          <Author>{article.author}</Author>
        </View>
        <Image source={{ uri: article.urlToImage }} />
      </Card>
    </OuterContainer>
  );
}
