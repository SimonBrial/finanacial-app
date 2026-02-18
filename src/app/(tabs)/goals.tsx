import GlobalContainer from "../../components/general/global-container";
import Typography from "../../components/general/typography";
import { Link } from "expo-router";
import { View } from "react-native";
import useTheme from "../../hook/useTheme";
import TitleCustom from "../../components/title-custom";
import GoalHero from "../../components/goals/goal-hero";

export default function Goals() {
  const { theme, sizes } = useTheme();
  return (
    <GlobalContainer>
      <TitleCustom
        title="Goals"
        withNotificationIcon
        name={"emoji-events"}
        library="MaterialIcons"
      />
      <GoalHero />

      {/* <View
        style={{
          flex: 1,
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          width: "100%",
          height: 500,
        }}
      >
        <Link
          href="/"
          style={{
            paddingVertical: sizes.sm,
            paddingHorizontal: sizes.xl,
            backgroundColor: theme.t20,
            borderRadius: sizes.xs,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography customStyles={{ color: theme.t100, marginTop: 20 }}>
            Go to Login
          </Typography>
        </Link>
      </View> */}
    </GlobalContainer>
  );
}
