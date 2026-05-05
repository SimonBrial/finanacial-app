import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import useTheme from "../hook/useTheme";
import { NotificationIconProps } from "../interface/interface";
import Avatar from "./ui/avatar";

export default function NotificationIcon({ active, hasNotification, ...props }: NotificationIconProps) {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const openNotifications = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <Pressable onPress={openNotifications}>
      <Avatar hasNotification={hasNotification} />
    </Pressable>
  );
}