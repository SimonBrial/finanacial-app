import { View, StyleSheet } from "react-native";
import Typography from "./typography";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { BadgeProps } from "../../interface/interface";

export default function Badge({
  text,
  color = "#0f9fff",
  type = "bordered",
}: BadgeProps) {
  const allStyles = StyleSheet.flatten([
    styles.defaultStyles,
    {
      color: color,
      borderWidth: 1,
      borderColor: color,
      backgroundColor: `${color}25`,
    },
  ]);
  return (
    <View style={styles.defaultStyles}>
      <Typography bold variant="xs" customStyles={allStyles}>
        {capitalizeFirstLetter(text)}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  defaultStyles: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 18,
  },
});
