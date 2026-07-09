import { Image, View, StyleSheet } from "react-native";
//import Icon from "./icon";
import useTheme from "../../hooks/useTheme";
import { AvatarProps } from "../../types/interface";

export default function Avatar({
  hasNotification,
  size,
  source,
  borderWidth,
  borderColor,
}: AvatarProps) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        //borderColor: theme.t100,
        ...styles.container,
      }}
    >
      <Image
        source={source ? source : require("../../assets/img/avatar.jpg")}
        style={{
          width: (size ?? 40) as any,
          height: (size ?? 40) as any,
          borderRadius: 1000,
        }}
      />
      {hasNotification && (
        <View
          style={[
            styles.signal,
            {
              borderWidth: borderWidth ?? 1,
              borderColor: borderColor ?? borderColor,
            },
          ]}
        ></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 50,
  },
  signal: {
    position: "absolute",
    zIndex: 999,
    top: 0,
    right: -1,
    height: 14,
    width: 14,
    borderRadius: "100%",
    backgroundColor: "red",
  },
});
