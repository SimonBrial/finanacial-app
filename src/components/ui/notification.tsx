import { View, StyleSheet } from "react-native";
import useTheme from "../../hooks/useTheme";
import Icon from "./icon";
import Typography from "./typography";

type NotificationType = "warning" | "info" | "success" | "danger";

export default function Notification({
  type = "warning",
}: {
  type: NotificationType;
}) {
  const { inProgress, sizes, danger, complete } = useTheme();
  if (type === "warning") {
    return (
      <View
        style={[
          styles.warningBanner,
          { borderColor: inProgress.p100, backgroundColor: inProgress.p20 },
        ]}
      >
        <Icon
          name="warning"
          library="AntDesign"
          variant="light"
          color={inProgress.p100}
          size={sizes.md}
        />
        <Typography
          fontSize={sizes.sm}
          customStyles={{ color: inProgress.p100, marginLeft: 6 }}
        >
          Approaching monthly limit
        </Typography>
      </View>
    );
  }
  if (type === "danger") {
    return (
      <View
        style={[
          styles.warningBanner,
          { borderColor: danger.d100, backgroundColor: danger.d20 },
        ]}
      >
        <Icon
          name="warning"
          library="AntDesign"
          variant="light"
          color={danger.d100}
          size={sizes.md}
        />
        <Typography
          fontSize={sizes.sm}
          customStyles={{ color: danger.d100, marginLeft: 6 }}
        >
          Overspending
        </Typography>
      </View>
    );
  }
  if (type === "success") {
    return (
      <View
        style={[
          styles.warningBanner,
          { borderColor: complete.c100, backgroundColor: complete.c20 },
        ]}
      >
        <Icon
          name="check-circle"
          library="FontAwesome5"
          variant="light"
          color={complete.c100}
          size={sizes.md}
        />
        <Typography
          fontSize={sizes.sm}
          customStyles={{ color: complete.c100, marginLeft: 6 }}
        >
          Budget covered
        </Typography>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  warningBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "transparent",
    width: "100%",
  },
});
