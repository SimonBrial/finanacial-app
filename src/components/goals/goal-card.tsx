import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Stack from "../../components/general/stack";
import { Goal } from "../../interface/interface";
import { formatNumber } from "../../utils/formatNumber";
import { goalPercentage } from "../../utils/goalPercentage";
import Badge from "../general/badge";
import Container from "../general/container";
import Typography from "../general/typography";

export default function GoalCard({
  currentValue,
  description,
  periodUnit,
  goalValue,
  completed,
  period,
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
    { borderColor: color, width: 300 },
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
      <Container customStyles={styles.periodDescription} gap={8}>
        <Typography variant="base" bold={false} customStyles={styles.text}>
          Period:
        </Typography>
        <Typography
          variant="base"
          bold={false}
          customStyles={StyleSheet.flatten([styles.text, { color: color }])}
        >
          {period} {periodUnit}{" "}
        </Typography>
        {completed ? (
          <View style={{ width: 100 }}>
            <Badge
              iconLeft={
                <MaterialIcons name={"check-circle"} size={20} color={color} />
              }
              text={"DONE"}
              type="filled"
            />
          </View>
        ) : null}
      </Container>
      <Container
        customStyles={{
          width: "95%",
          height: 90,
          flexWrap: "wrap",
        }}
      >
        <Container
          customStyles={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
            top: 0,
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
              top: 30,
            }}
          ></View>
          <View
            style={{
              height: 8,
              width: "100%",
              backgroundColor: `${color}70`,
              borderRadius: 4,
              position: "absolute",
              top: 28,
              left: 0,
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
                marginLeft: 10,
                top: 40,
              }}
            >
              <Badge
                text={`${goalCompletedPercentage}%.`}
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
    justifyContent: "flex-start",
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
  periodDescription: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "nowrap",
    paddingVertical: 8,
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
