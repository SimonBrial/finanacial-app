import { Icon } from "./unused/shadcn-primitives/icon";
import NotificationIcon from "./notification-icon";
import useTheme from "../hooks/useTheme";
import ShowString from "./show-string";
import { useBankStore } from "../stores/useBankStore";
import type { LucideIcon } from "lucide-react-native";
import { House } from "lucide-react-native";
import { Text } from "./ui/text";
import { View } from "react-native";

interface TitleCustomProps {
  withNotificationIcon: boolean;
  showIconBalance?: boolean;
  as: LucideIcon;
  title: string;
}

export default function TitleCustom({
  showIconBalance = false,
  withNotificationIcon,
  as = House,
  title,
}: TitleCustomProps) {
  const { isDark } = useTheme();
  const showBalance = useBankStore().showBalance;
  const fnShowBalance = useBankStore().setShowBalance;

  return (
    <View className="flex-row items-center justify-between w-full pb-3">
      <View className={"w-[70%] flex-row items-center justify-start gap-3"}>
        <Icon as={as} size={24} />
        <Text
          variant={"h2"}
          className={`pb-0 font-normal ${isDark ? "text-white" : "text-slate-900"}`}
        >
          {title}
        </Text>
      </View>
      {showIconBalance && (
        <ShowString
          show={showBalance}
          fnShow={() => fnShowBalance(!showBalance)}
        />
      )}
      {withNotificationIcon && <NotificationIcon hasNotification={true} />}
    </View>
  );
}
