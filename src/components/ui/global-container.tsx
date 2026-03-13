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
  // ⚡ Bolt: Passed array of styles instead of StyleSheet.flatten to avoid CPU overhead during renders.
  const globalStyles = [{
    paddingTop: insets.top,
    //paddingBottom: insets.bottom,
  }, styles.containerGlobal];
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
