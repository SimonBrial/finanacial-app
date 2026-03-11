import { View } from "react-native";
import GlobalContainer from "../../components/ui/global-container";
import useTheme from "../../hook/useTheme";
import TitleCustom from "../../components/title-custom";
import Button from "../../components/ui/button";

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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          width: "100%",
          //height: 500,
        }}
      >
        <Button
          fullWidth
          text="Go to login"
          customColorText={{ color: theme.t100 }}
          containerStyle={{
            paddingVertical: sizes.sm,
            paddingHorizontal: sizes.xl,
            backgroundColor: theme.t20,
            borderRadius: sizes.xs,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>
    </GlobalContainer>
  );
}
