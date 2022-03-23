import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TimelineScreen from "ui/timeline/screen";

export default () => (
  <SafeAreaProvider>
    <TimelineScreen />
    <StatusBar translucent style="dark" />
  </SafeAreaProvider>
);
