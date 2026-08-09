import TitleCustom from "./title-custom";
import useTheme from "../hooks/useTheme";
import GoalCard from "./goal-card";
import Row from "./ui/row";
import { useGoalStore } from "../stores/useGoalStore";
import { Trophy } from "lucide-react-native";
import { View } from "react-native";

export default function GoalsContainer() {
  const { goals } = useGoalStore();
  return (
    <View className="w-full py-5 mb-3 justify-start gap-5">
      <TitleCustom title="Goals" withNotificationIcon={false} as={Trophy} />
      <View className="w-full justify-start gap-4">
        <View className="flex-row gap-2 w-full flex-wrap justify-start">
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
        </View>
      </View>
    </View>
  );
}
