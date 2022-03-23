import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

interface ContainerProps {
  readonly isSelected?: boolean;
}

export const OuterContainer = styled.TouchableWithoutFeedback<ContainerProps>`
  min-height: 34px;
  border-radius: 500px;
  background-color: ${(props) => (props.isSelected ? "#815600" : "#212121")};
`;

export const TouchableContainer = styled(RectButton)<ContainerProps>`
  padding: 8px 12px;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 500px;
  background-color: ${(props) => (props.isSelected ? "#815600" : "#212121")};
`;

export const Text = styled.Text`
  font-size: 12px;
  letter-spacing: 1.15px;
  color: white;
  font-weight: bold;
`;
