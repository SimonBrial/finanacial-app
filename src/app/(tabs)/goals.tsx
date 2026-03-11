import GlobalContainer from "../../components/ui/global-container";
import TitleCustom from "../../components/title-custom";
import GoalHero from "../../components/goals/goal-hero";
import { View } from "react-native";
import Icon from "../../components/ui/icon";
import Button from "../../components/ui/button";
import { useState } from "react";
import useTheme from "../../hook/useTheme";
import GoalCardLg from "../../components/goals/goal-card-lg";

type GoalFilter = "All" | "Completed" | "In Progress" | "Deleted" | "Future";

export default function Goals() {
  const [activeFilter, setActiveFilter] = useState<GoalFilter>("All");
  const { theme } = useTheme();
  return (
    <GlobalContainer>
      <TitleCustom
        title="Goals"
        withNotificationIcon
        name={"emoji-events"}
        library="MaterialIcons"
      />
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
          name={"emoji-events"}
          library="MaterialIcons"
        />
        <Icon name={"plus"} library="AntDesign" size={24} rounded />
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
              color={filter === activeFilter ? theme.t100 : "white"}
              onPress={() => setActiveFilter(filter as GoalFilter)}
              containerStyle={{ borderRadius: 1000 }}
            />
          ),
        )}
      </View>
      <View style={{ width: "100%", marginTop: 10, gap: 20 }}>
        <GoalCardLg title="Save for vacation" status="In Progress" />
        <GoalCardLg title="Buy a new car" status="Completed" />
        <GoalCardLg title="Learn a new language" status="New" />
      </View>
    </GlobalContainer>
  );
}
