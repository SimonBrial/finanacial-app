import { View, StyleSheet } from "react-native";
import Typography from "./typography";
import { BadgeProps } from "../../interface/interface";
import Container from "./container";

export default function Badge({
  text,
  color = "#0f9fff",
  type = "bordered",
  iconLeft,
  iconRight,
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
    <Container customStyles={allStyles}>
      {iconLeft && <View>{iconLeft}</View>}
      <Typography bold variant="xs" customStyles={{ color: color }}>
        {text}
      </Typography>
      {iconRight && <View>{iconLeft}</View>}
    </Container>
  );
}

const styles = StyleSheet.create({
  defaultStyles: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 18,
  },
});
