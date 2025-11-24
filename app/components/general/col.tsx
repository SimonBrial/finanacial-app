import { View } from "react-native";

interface ColProps {
  children: React.ReactNode;
  numRows: number;
}

export default function Col({ children, numRows }: ColProps) {
  return <View style={{ flex: numRows }}>{children}</View>;
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
