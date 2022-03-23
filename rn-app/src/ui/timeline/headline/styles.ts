import styled from "styled-components/native";

import { darkColors } from "ui/colors";

export const OuterContainer = styled.TouchableWithoutFeedback``;

export const Card = styled.View`
  margin: 0px 16px 0px 16px;
  padding: 16px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${darkColors.outline};
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 16px;
  letter-spacing: 0.4px;
  color: ${darkColors.secondary};
`;

export const Author = styled.Text`
  font-size: 12px;
  color: ${darkColors.onSurface};
  margin-top: 4px;
  font-weight: bold;
`;

export const Image = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 12px;
  background-color: ${darkColors.secondary};
`;
