import GlobalContainer from "../../components/ui/global-container";
import TitleCustom from "../../components/title-custom";
import GoalHero from "../../components/features/goals/goal-hero";
import { View, ScrollView } from "react-native";
import Button from "../../components/ui/button-own";
import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import GoalCardLg from "../../components/features/goals/goal-card-lg";
import { Trophy } from "lucide-react-native";

type GoalFilter = "All" | "Completed" | "In Progress" | "Deleted" | "Future";

export default function Goals() {
  const [activeFilter, setActiveFilter] = useState<GoalFilter>("All");
  const { theme, sizes, isDark, globalStyles } = useTheme();
  return (
    <GlobalContainer
      header={
        <TitleCustom
          title="Goals"
          withNotificationIcon
          as={Trophy}
          showIconBalance
        />
      }
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <GoalHero />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "85%",
            marginTop: 20,
          }}
        >
          <TitleCustom
            title="Your Goals"
            withNotificationIcon={false}
            as={Trophy}
          />
        </View>
        <View
          style={{
            width: "100%",
            //borderWidth: 1,
            //borderColor: "red",
            flexDirection: "row",
            gap: 10,
            //paddingHorizontal: 20,
            marginTop: 10,
          }}
        >
          {["All", "Completed", "In Progress", "Deleted", "Future"].map(
            (filter) => (
              <Button
                key={filter}
                text={filter}
                size="xs"
                type={filter === activeFilter ? "filled" : "bordered"}
                color={filter === activeFilter ? theme.t100 : globalStyles.text}
                onPress={() => setActiveFilter(filter as GoalFilter)}
                containerStyle={{ borderRadius: 1000 }}
              />
            ),
          )}
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 10,
            gap: 20,
            marginBottom: 36,
          }}
        >
          <GoalCardLg title="Save for vacation" status="In Progress" />
          <GoalCardLg title="Buy a new car" status="Completed" />
          <GoalCardLg title="Learn a new language" status="New" />
        </View>
      </ScrollView>
    </GlobalContainer>
  );
}
