import GlobalContainer from "../../components/ui/global-container";
import TitleCustom from "../../components/title-custom";
import GoalHero from "../../components/features/goals/goal-hero";
import { View, ScrollView } from "react-native";
import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import GoalCardLg from "../../components/features/goals/goal-card-lg";
import { Trophy } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

type GoalFilter = "All" | "Completed" | "In Progress"; //| "Deleted" | "Future";

export default function Goals() {
  const [activeFilter, setActiveFilter] = useState<GoalFilter>("All");
  const { theme, isDark } = useTheme();
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
          {/* <Icon as={ListFilter} size={24} /> */}
        </View>
        <View className="w-full flex-row justify-around mt-3">
          {["All", "Completed", "In Progress"].map((filter) => (
            <Button
              key={filter}
              //text={filter}
              //size="xs"
              //color={filter === activeFilter ? theme.t100 : "white"}
              //containerStyle={{ borderRadius: 1000, width: "30%" }}
              variant={filter === activeFilter ? "default" : "outline"}
              onPress={() => setActiveFilter(filter as GoalFilter)}
              className={`rounded-full w-[30%] 
                ${
                  isDark
                    ? filter === activeFilter
                      ? "bg-theme"
                      : "border border-white bg-transparent"
                    : filter === activeFilter
                      ? " bg-theme"
                      : "bg-transparent border border-slate-500"
                } 
                `}
            >
              <Text
                className={`${isDark ? "text-white" : filter === activeFilter ? "text-white" : "text-slate-500"}`}
              >
                {filter}
              </Text>
            </Button>
          ))}
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
