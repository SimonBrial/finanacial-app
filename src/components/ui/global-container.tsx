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
  // ⚡ Bolt: Passed array of styles instead of StyleSheet.flatten to avoid CPU overhead during renders.
  const globalStyles = [{
    paddingTop: insets.top,
    //paddingBottom: insets.bottom,
  }, styles.containerGlobal];
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
