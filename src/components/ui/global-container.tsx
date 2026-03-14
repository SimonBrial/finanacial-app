import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function GlobalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  // ⚡ Bolt: Removed StyleSheet.flatten to avoid deep merging on every render frame
  const globalStyles = [
    styles.containerGlobal,
    { paddingTop: insets.top },
  ];
  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <SafeAreaView>
        <View style={globalStyles as any}>{children}</View>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={"#1a1a1a"}
          translucent={false}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerGlobal: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
    //paddingBottom: 80,
  },
});
