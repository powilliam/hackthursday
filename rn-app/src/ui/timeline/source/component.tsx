import { TouchableWithoutFeedbackProps } from "react-native";

import {
  OuterContainer,
  TouchableContainer,
  Text,
} from "ui/timeline/source/styles";

import { Source as SourceEntity } from "data/entity/source";

interface SourceProps extends TouchableWithoutFeedbackProps {
  readonly isSelected?: boolean;
  readonly source: SourceEntity;
}

export function Source({
  isSelected,
  source,
  disabled,
  ...props
}: SourceProps) {
  return (
    <OuterContainer isSelected={isSelected} {...props}>
      <TouchableContainer isSelected={isSelected} enabled={!disabled}>
        <Text isSelected={isSelected}>{source.name}</Text>
      </TouchableContainer>
    </OuterContainer>
  );
}
