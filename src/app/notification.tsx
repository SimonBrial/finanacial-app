import { StyleSheet, View } from "react-native";
import Typography from "../components/ui/typography";
import Icon from "../components/ui/icon";
import Row from "../components/ui/row";
import useTheme from "../hook/useTheme";

export default function Notification({ ...props }) {
  const { theme, sizes, globalStyles } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: 2,
          borderColor: globalStyles.borderContainer,
          borderRadius: sizes.xs,
          zIndex: -999,
        },
      ]}
    >
      <Row alignItem="center" justifyContent="space-between" width={"100%"}>
        <Row
          width={"70%"}
          gap={sizes.xs}
          //customStyles={{ paddingLeft: sizes.xs }}
          alignItem="center"
          justifyContent="start"
        >
          <Typography
            fontSize={sizes.xl}
            bold={false}
            customStyles={{ color: "white" }}
          >
            Notifications
          </Typography>
        </Row>
      </Row>
      <View
        style={{
          backgroundColor: theme.t20,
          padding: sizes.sm,
          borderRadius: sizes.xs,
          borderWidth: 1,
          borderColor: theme.t100,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: sizes.xs,
        }}
      >
        <Icon
          bgStyle={{
            padding: sizes.xs,
            borderRadius: "100%",
            backgroundColor: `${theme.t20}`,
            //width: 44,
            //height: 44,
          }}
          name={"emoji-events"}
          library="MaterialIcons"
          size={sizes.lg}
          color={theme.t100}
        />
        <Typography customStyles={{ color: theme.t100 }}>Test</Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "rgba(000, 000, 000, 0.99)",
    marginTop: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
    opacity: 0.9,
    height: "90%",

    //borderColor: "rgba(255, 255, 255, 0.1)",
  },
});
