import { Pressable, View } from "react-native";
import { useState } from "react";
import Icon from "./general/icon";

export default function ShowString() {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <View>
      {show ? (
        <Pressable onPress={handleShow}>
          <Icon name={"eye"} variant="ghost" color={"#FFFFFF"} />
        </Pressable>
      ) : (
        <Pressable onPress={handleShow}>
          <Icon name={"eye-off"} variant="ghost" color={"#FFFFFF"} />
        </Pressable>
      )}
    </View>
  );
}
