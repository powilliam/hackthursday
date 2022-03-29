import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

import { darkColors } from "ui/colors";

interface ContainerProps {
  readonly isSelected?: boolean;
}

export const OuterContainer = styled.TouchableWithoutFeedback<ContainerProps>`
  min-height: 34px;
  border-radius: 500px;
  background-color: ${(props) =>
    props.isSelected ? darkColors.primary : darkColors.secondaryContainer};
`;

export const TouchableContainer = styled(RectButton)<ContainerProps>`
  padding: 8px 12px;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 500px;
  background-color: ${(props) =>
    props.isSelected ? darkColors.primary : darkColors.secondaryContainer};
`;

export const Text = styled.Text<ContainerProps>`
  font-size: 12px;
  letter-spacing: 1.15px;
  color: ${(props) =>
    props.isSelected ? darkColors.onPrimary : darkColors.onSecondaryContainer};
  font-weight: bold;
`;
