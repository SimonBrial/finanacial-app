import { Link } from "expo-router";
import { View } from "react-native";
import GlobalContainer from "../../components/ui/global-container";
import Typography from "../../components/ui/typography";
import useTheme from "../../hook/useTheme";
import TitleCustom from "../../components/title-custom";

export default function Exchange() {
  const { sizes, theme } = useTheme();
  return (
    <GlobalContainer>
      <TitleCustom
        title="Exchanges"
        withNotificationIcon
        name={"attach-money"}
        library="MaterialIcons"
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
