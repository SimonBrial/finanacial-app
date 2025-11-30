import { StyleSheet, View } from "react-native";
import Typography from "./general/typography";
import { Goal } from "../interface/interface";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import Stack from "./general/stack";
import Container from "./general/container";
import Badge from "./general/badge";
import { goalPercentage } from "../utils/goalPercentage";
import { formatNumber } from "../utils/formatNumber";

export default function GoalCard({
  currentValue,
  description,
  goalValue,
  title,
  color = "#fff",
  icon,
  id,
}: Goal) {
  const containerStyles = StyleSheet.flatten([
    styles.container,
    { borderLeftColor: color },
  ]);

  const titleStyles = StyleSheet.flatten([
    styles.titleContainer,
    { borderColor: color },
  ]);

  const iconStyles = StyleSheet.flatten([
    styles.icon,
    { backgroundColor: `${color}4c` },
  ]);

  const textStyles = StyleSheet.flatten([styles.text, { color: color }]);

  const goalCompletedPercentage = Math.round((currentValue / goalValue) * 100);

  const badgePosition = (current: number, final: number): number => {
    if (final <= 0) return 0;

    const safeCurrent = Math.min(current, final);
    const percentage = (safeCurrent / final) * 100;

    const minLimit = 5;
    const maxLimit = 95;

    const offset = 10;
    const clampedPosition = Math.min(Math.max(percentage, minLimit), maxLimit);
    return clampedPosition - offset;
  };

  return (
    <Stack customStyles={containerStyles}>
      <Container customStyles={titleStyles} gap={8}>
        <MaterialIcons name={icon} size={20} color={color} style={iconStyles} />
        <Typography variant="lg" bold customStyles={textStyles}>
          {title}
        </Typography>
      </Container>
      <Container customStyles={styles.description}>
        <Typography variant="base" bold={false} customStyles={styles.text}>
          {description}
        </Typography>
      </Container>
      <Container
        customStyles={{
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <Container
          customStyles={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 25,
          }}
        >
          <Typography variant="base" bold={false} customStyles={styles.text}>
            {formatNumber(currentValue)}
          </Typography>
          <Typography variant="base" bold={false} customStyles={styles.text}>
            {formatNumber(goalValue)}
          </Typography>
        </Container>
        <Container
          customStyles={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 0,
            marginBottom: 10,
            height: 45,
          }}
        >
          <View
            style={{
              height: 4,
              width: `${goalCompletedPercentage - 2}%`,
              backgroundColor: color,
              borderRadius: 4,
              position: "absolute",
              zIndex: 1,
              left: 3,
              top: 2,
            }}
          ></View>
          <View
            style={{
              height: 8,
              width: "100%",
              backgroundColor: `${color}70`,
              borderRadius: 4,
            }}
          ></View>
          <Container
            customStyles={{
              position: "relative",
              width: "95%",
              height: 30,
              marginLeft: -10,
            }}
          >
            <View
              style={{
                left: `${badgePosition(currentValue, goalValue)}%`,
                paddingHorizontal: -2,
                marginHorizontal: 0,
                position: "absolute",
                bottom: -3,
              }}
            >
              <Badge
                text={`${goalCompletedPercentage}%`}
                type="bordered"
                color={goalPercentage(currentValue, goalValue)}
              />
            </View>
          </Container>
        </Container>
      </Container>
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    // marginBottom: 16,
    width: "95%",
    //height: 150,
    borderColor: "#1a1a1a",
    backgroundColor: "#2A2A2A",
    borderLeftWidth: 6,
  },
  icon: {
    width: 40,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 20,
  },
  titleContainer: {
    marginBottom: 8,
    color: "#ffffff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    gap: 8,
    width: "100%",
    textAlign: "center",
    paddingBottom: 8,

    borderBottomWidth: 1,
  },
  description: {
    flex: 1,
  },
  progress: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    flexWrap: "nowrap" /* 
    borderColor: "red",
    borderWidth: 1, */,
    width: "100%",
  },
  text: {
    color: "#ffffff",
    flexWrap: "wrap",
  },
});
