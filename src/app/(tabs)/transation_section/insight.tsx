import { View } from "react-native";
import Typography from "../../../components/ui/typography";

export default function Insight() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 300,
        borderColor: "red",
        borderWidth: 1,
        backgroundColor: "black",
      }}
    >
      <Typography txtWhite>Insight</Typography>
    </View>
  );
}
