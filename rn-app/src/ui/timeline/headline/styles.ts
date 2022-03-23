import styled from "styled-components/native";

export const OuterContainer = styled.TouchableWithoutFeedback``;

export const Card = styled.View`
  margin: 0px 16px 0px 16px;
  padding: 16px;
  border-radius: 12px;
  border-width: 1px;
  border-color: #212121;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 16px;
  letter-spacing: 0.4px;
  color: white;
`;

export const Author = styled.Text`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.76);
  margin-top: 4px;
`;

export const Image = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 12px;
  background-color: #262626;
`;
