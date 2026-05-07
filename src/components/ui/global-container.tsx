import { StatusBar, StyleSheet, View } from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
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
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={globalStyles}>{children}</View>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={"#1a1a1a"}
          translucent={false}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerGlobal: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    //paddingBottom: 80,
  },
});
