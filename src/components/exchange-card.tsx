import { View, StyleSheet } from "react-native";
import Typography from "./general/typography";
import { ExchangeCardProps } from "../interface/interface";
import { LinearGradient } from "expo-linear-gradient";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export default function ExchangeCard({
  dolarRate,
  exchangeName,
  todayDate
}: ExchangeCardProps) {
  const styleSelector = () => {
    if (exchangeName.toLowerCase() === "parallel".toLowerCase()) {
      return styles.parallel;
    }
    if (exchangeName.toLowerCase() === "average".toLowerCase()) {
      return styles.average;
    }
    return styles.official;
  };

  const containerStyles = StyleSheet.flatten([
    styles.container,
    { borderLeftColor: styleSelector().color },
  ]);

  return (
    <View style={containerStyles}>
      <LinearGradient
        colors={[`${styleSelector().color}72`, 'transparent']}
        style={styles.background}
        start={{ x: 0, y: 1 }}
        locations={[0.05,0.9]}
      />
      <Typography bold={false} variant="lg" customStyles={styles.text}>
        {capitalizeFirstLetter(exchangeName)}
      </Typography>

      <Typography bold={false} variant="lg" customStyles={styleSelector()}>
        {dolarRate}
      </Typography>
      <Typography bold variant="sm" customStyles={styles.text}>
        {todayDate === typeof String ? todayDate : new Date().toLocaleDateString()}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    borderColor: "#1a1a1a",
    backgroundColor: "#2A2A2A",
    borderLeftWidth: 6,
  },
  text: {
    color: "#fff",
  },
  average: {
    color: "#0f9fff",
  },
  parallel: {
    color: "#ff0f3f",
  },
  official: {
    color: "#0fff3b",
  },
  background: {
    position: 'absolute',
    left: -1,
    right: 0,
    top: -1,
    height: 90,
    width: 120,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    
  },
});
