import React from "react";
import { Pressable, View } from "react-native";
//import { ShowStringProps } from "../types/interface";
import useTheme from "../hooks/useTheme";
import { useBankStore } from "../stores/useBankStore";
import { Toggle, ToggleIcon } from "./unused/shadcn-primitives/toggle";
import * as Haptics from "expo-haptics";
import { Eye, EyeOff } from "lucide-react-native";
import Icon from "./ui/icon";

interface ShowStringProps {
  show: boolean;
  fnShow: (show: boolean) => void;
}

export default function ShowString({ show, fnShow }: ShowStringProps) {
  const { theme, sizes } = useTheme();
  const showBalance = useBankStore().showBalance;
  const fnShowBalance = useBankStore().setShowBalance;
  const [pressed, setPressed] = React.useState(false);

  function onPressedChange(pressed: boolean) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    fnShow(show);
  }
  return (
    <View>
      {show ? (
        <Toggle
          aria-label="Toggle italic"
          pressed={show}
          onPressedChange={onPressedChange}
        >
          <ToggleIcon as={Eye} className="size-8" />
        </Toggle>
      ) : (
        <Toggle
          aria-label="Toggle italic"
          pressed={show}
          onPressedChange={onPressedChange}
        >
          <ToggleIcon as={EyeOff} className="size-8" />
        </Toggle>
      )}
    </View>
  );
}
{
  /* <Pressable onPress={fnShow}>
  <Icon name={"eye"} variant="ghost" color={"#FFFFFF"} />
</Pressable> */
}
{
  /* <Pressable onPress={fnShow}>
  <Icon name={"eye-off"} variant="ghost" color={"#FFFFFF"} />
</Pressable> */
}
