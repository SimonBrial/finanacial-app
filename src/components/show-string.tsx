import { Pressable, View } from "react-native";
import Icon from "./ui/icon";
import { ShowStringProps } from "../interface/interface";

export default function ShowString({ show, fnShow }: ShowStringProps) {
  return (
    <View>
      {show ? (
        <Pressable onPress={fnShow}>
          <Icon name={"eye"} variant="ghost" color={"#FFFFFF"} />
        </Pressable>
      ) : (
        <Pressable onPress={fnShow}>
          <Icon name={"eye-off"} variant="ghost" color={"#FFFFFF"} />
        </Pressable>
      )}
    </View>
  );
}
