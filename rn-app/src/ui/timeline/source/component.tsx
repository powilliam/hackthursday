import { TouchableWithoutFeedbackProps } from "react-native";

import {
  OuterContainer,
  TouchableContainer,
  Text,
} from "ui/timeline/source/styles";

import { Source as SourceEntity } from "data/entity/source";

interface SourceProps extends TouchableWithoutFeedbackProps {
  readonly source: SourceEntity;
}

export function Source({ source, disabled, ...props }: SourceProps) {
  return (
    <OuterContainer {...props}>
      <TouchableContainer enabled={!disabled}>
        <Text>{source.name}</Text>
      </TouchableContainer>
    </OuterContainer>
  );
}
