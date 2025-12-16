import { goals } from "../../seeds/seeds";
import { Goal } from "../../interface/interface";
import GlobalContainer from "../../components/general/global-container";
import Stack from "../../components/general/stack";
import { StyleSheet } from "react-native";
import Container from "../../components/general/container";
import Typography from "../../components/general/typography";
import GoalCard from "../../components/goals/goal-card";

export default function Goals() {
  return (
    <GlobalContainer>
      <Container customStyles={styles.containerTitle}>
        <Typography bold={false} variant="2xl" customStyles={styles.text}>
          😎 Goals!
        </Typography>
      </Container>
      <Stack gap={8}>
        {goals.map((goal: Goal) => (
          <GoalCard
            key={goal.id}
            title={goal.title}
            description={goal.description}
            color={goal.color}
            currentValue={goal.currentValue}
            goalValue={goal.goalValue}
            icon={goal.icon}
            id={goal.id}
            period={goal.period}
            periodUnit={goal.periodUnit}
            completed={goal.completed}
          />
        ))}
      </Stack>
    </GlobalContainer>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: "#FFFFFF",
    paddingVertical: 20,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "left",
    marginLeft: 12,
  },
});
