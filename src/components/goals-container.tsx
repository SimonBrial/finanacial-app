import React from "react";
import TitleCustom from "./title-custom";
import useTheme from "../hook/useTheme";
import Stack from "./ui/stack";
import GoalCard from "./goal-card";
import Row from "./ui/row";

export default function GoalsContainer() {
  const { sizes } = useTheme();
  return (
    <Stack
      gap={sizes.lg}
      justifyContent="flex-start"
      customStyles={{
        paddingVertical: sizes.lg,
        position: "relative",
        height: 360,
        width: "100%",
        //borderColor: "red",
        //borderWidth: 1,
      }}
    >
      <TitleCustom title="Goals" withNotificationIcon={false} />
      <Stack gap={sizes.md}>
        <Row gap={sizes.xs} width={"100%"} wrap>
          <GoalCard
            description="Save $1000 for a trip to Bali"
            title="Vacation"
            currentAmount={650}
            goalAmount={1000}
            progress={65}
            status={false}
            size="sm"
          />
          <GoalCard
            description="Save $1000 for a trip to Bali"
            title="New Car"
            currentAmount={1000}
            goalAmount={1000}
            progress={100}
            status={true}
            size="sm"
          />
          <GoalCard
            description="Save $1000 for a trip to Bali"
            title="New Car"
            currentAmount={1000}
            goalAmount={1000}
            progress={100}
            status={true}
            size="sm"
          />
          <GoalCard
            description="Save $1000 for a trip to Bali"
            title="New Car"
            currentAmount={1000}
            goalAmount={1000}
            progress={100}
            status={true}
            size="sm"
          />
          <GoalCard
            description="Save $1000 for a trip to Bali"
            title="New Car"
            currentAmount={1000}
            goalAmount={1000}
            progress={100}
            status={true}
            size="sm"
          />
          <GoalCard
            description="Save $1000 for a trip to Bali"
            title="New Car"
            currentAmount={1000}
            goalAmount={1000}
            progress={100}
            status={true}
            size="sm"
          />
        </Row>
      </Stack>
    </Stack>
  );
}
