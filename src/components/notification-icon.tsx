import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "./general/icon";
import useTheme from "../hook/useTheme";

export default function NotificationIcon({ active, ...props }: any) {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const openNotifications = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <Pressable onPress={openNotifications}>
      <Icon
        /*bgStyle={[
          //styles.container,
          {
            padding: sizes.xxs,
            borderRadius: "100%",
            //backgroundColor: `${theme.t20}`,
            width: 44,
            height: 44,
            position: "relative",
          },
        ]}
        color={theme.t100}
        size={sizes.xl}*/
        name={"bell-outline"}
        rounded
        variant="ghost"
      />
      <View
        style={[
          styles.signal,
          {
            borderWidth: 1,
            borderColor: theme.t100,
          },
        ]}
      ></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  signal: {
    position: "absolute",
    top: 13,
    right: 12,
    height: 8,
    width: 8,
    borderRadius: "100%",
    backgroundColor: "red",
  },
});
