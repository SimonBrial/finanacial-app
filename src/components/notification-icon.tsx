/**
 * NotificationIcon
 *
 * Componente que muestra el avatar del usuario y al presionarlo
 * navega a la pantalla de notificaciones (presentada como modal).
 *
 * Anteriormente abría un drawer lateral usando DrawerActions de
 * @react-navigation/native. Ahora usa router.push de expo-router.
 */
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { NotificationIconProps } from "../types/interface";
import Avatar from "./ui/avatar";

export default function NotificationIcon({
  hasNotification,
  active,
  ...props
}: NotificationIconProps) {
  const router = useRouter();

  /** Abre la pantalla de notificaciones como modal */
  const openNotifications = () => {
    router.push("/notification");
  };

  return (
    <Pressable onPress={openNotifications}>
      <Avatar hasNotification={hasNotification} />
    </Pressable>
  );
}
