import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Scaffold = styled(SafeAreaView)`
  flex: 1;
  background-color: #111111;
`;

export const SingleLoaderWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SourceSeparator = styled.View`
  width: 4px;
`;

export const HeadlineSeparator = styled.View`
  height: 16px;
`;
