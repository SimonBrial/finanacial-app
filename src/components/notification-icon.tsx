import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import { NotificationIconProps } from "../interface/interface";
import Avatar from "./ui/avatar";

export default function NotificationIcon({
  hasNotification,
  active,
  ...props
}: NotificationIconProps) {
  const navigation = useNavigation();

  const openNotifications = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <Pressable onPress={openNotifications}>
      <Avatar hasNotification={hasNotification} />
    </Pressable>
  );
}
