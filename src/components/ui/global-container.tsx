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
  // ⚡ Bolt: Removed StyleSheet.flatten to avoid CPU overhead from deep merging during render. React Native handles style arrays natively.
  const globalStyles = [
    styles.containerGlobal,
    { paddingTop: insets.top },
    // { paddingBottom: insets.bottom },
  ];
  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <SafeAreaView>
        <View style={globalStyles}>{children}</View>
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
