import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { darkColors } from "ui/colors";

export const Scaffold = styled(SafeAreaView)`
  flex: 1;
  background-color: ${darkColors.surface};
`;

export const SingleLoaderWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SourceSeparator = styled.View`
  width: 8px;
`;

export const HeadlineSeparator = styled.View`
  height: 16px;
`;
