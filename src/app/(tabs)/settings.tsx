import { View } from "react-native";
import { Link } from "expo-router";
import GlobalContainer from "../../components/ui/global-container";
import Typography from "../../components/ui/typography";
import useTheme from "../../hook/useTheme";
import TitleCustom from "../../components/title-custom";

export default function Settings() {
  const { theme, sizes } = useTheme();
  return (
    <GlobalContainer>
      <TitleCustom
        title="Settings"
        withNotificationIcon={false}
        library="MaterialIcons"
        name={"settings"}
      />
      <View
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
      </View>
    </GlobalContainer>
  );
}
