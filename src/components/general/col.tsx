import { View } from "react-native";
import { ColProps } from "../../interface/interface";

export default function Col({ children, numRows }: ColProps) {
  return <View style={{ flex: numRows, gap: 4 }}>{children}</View>;
}
// type ColKey = "1col" | "2col" | "3col" | "4col";
// const key: ColKey = `${numRows}col` as ColKey;

/* const styles = StyleSheet.create({
  "1col": {
    flex: 1,
  },
  "2col": {
    flex: 2,
  },
  "3col": {
    flex: 3,
  },
  "4col": {
    flex: 4,
  },
}); */
