import React from "react";
import TitleCustom from "./title-custom";
import useTheme from "../hooks/useTheme";
import Stack from "./ui/stack";
import GoalCard from "./goal-card";
import Row from "./ui/row";
import { useGoalStore } from "../stores/useGoalStore";

export default function GoalsContainer() {
  const { sizes } = useTheme();
  const { goals } = useGoalStore();
  return (
    <Stack
      gap={sizes.lg}
      justifyContent="flex-start"
      customStyles={{
        paddingVertical: sizes.lg,
        marginBottom: sizes.sm,
        width: "100%",
        //height: 360,
        //borderColor: "red",
        //borderWidth: 1,
      }}
    >
      <TitleCustom title="Goals" withNotificationIcon={false} />
      <Stack gap={sizes.md}>
        <Row
          gap={sizes.xs}
          width={"100%"}
          wrap={true}
          justifyContent="flex-start"
        >
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              description={goal.description}
              title={goal.title}
              currentAmount={goal.currentValue}
              goalAmount={goal.goalValue}
              progress={(goal.currentValue / goal.goalValue) * 100}
              status={goal.completed}
              size="sm"
            />
          ))}
        </Row>
      </Stack>
    </Stack>
  );
}
