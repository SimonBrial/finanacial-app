import { View } from "react-native";
import Icon from "./icon";
import useTheme from "../../hook/useTheme";

export default function Avatar() {
  const{ theme } = useTheme();
  return (
    <View
      style={{
        borderColor: theme.t100,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 50,
      }}
    >
      <Icon
        name="user-alt"
        library="FontAwesome5"
        rounded
        size={40}
        bgStyle={{ width: 80, height: 80 }}
      />
    </View>
  );
}
