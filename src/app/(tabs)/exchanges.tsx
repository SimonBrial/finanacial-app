import { ScrollView, View } from "react-native";
import GlobalContainer from "../../components/ui/global-container";
import useTheme from "../../hooks/useTheme";
import TitleCustom from "../../components/title-custom";
import Button from "../../components/ui/button-own";

import { DollarSign } from "lucide-react-native";

export default function Exchange() {
  const { sizes, theme } = useTheme();
  return (
    <GlobalContainer
      header={
        <TitleCustom
          title="Exchanges"
          withNotificationIcon
          as={DollarSign}
        />
      }
    >
      <ScrollView>

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
      </ScrollView>
    </GlobalContainer>
  );
}
