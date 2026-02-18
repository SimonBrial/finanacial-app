import { TouchableOpacity, View } from "react-native";
import Stack from "../general/stack";
import Typography from "../general/typography";
import Row from "../general/row";
import useTheme from "../../hook/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import Badge from "../general/badge";
import Icon from "../general/icon";
import Collapsible from "react-native-collapsible";
import { useState } from "react";

export default function GoalHero() {
  const { globalStyles, sizes, inProgress, complete } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsible = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <Stack
      customStyles={{
        padding: sizes.lg,
        width: "100%",
        /* borderColor: "red",
        borderWidth: 1, */
      }}
    >
      <LinearGradient
        colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]} // DINÁMICO
        style={[
          {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            //height: 360,
            //width: "100%",
            borderRadius: sizes.lg,
            borderWidth: 1,
            borderColor: globalStyles.borderContainer,
          },
        ]}
        locations={[0.1, 1.0]}
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1, y: 0 }}
      />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: sizes.lg,
          borderBottomColor: globalStyles.borderContainer,
          borderBottomWidth: 1,
          paddingBottom: sizes.xxl,
        }}
      >
        <Icon rounded size={64} />
        <View
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: sizes.sm,
            alignItems: "center",
            justifyContent: "center",
          }}
          //alignItem="center"
        >
          <Typography
            bold
            customStyles={{
              color: "white",
              width: "100%",
              textAlign: "center",
            }}
            fontSize={sizes.lg}
          >
            Total Goals
          </Typography>

          <Row alignItem="center" justifyContent="space-between">
            <Typography fontSize={sizes.sm} customStyles={{ color: "white" }}>
              Total
            </Typography>
            <Badge text="10" size="md" />
          </Row>
          <Row alignItem="center" justifyContent="space-between">
            <Typography fontSize={sizes.sm} customStyles={{ color: "white" }}>
              Completed
            </Typography>
            <Badge text="10" size="md" color={complete.c100} />
          </Row>
          <Row alignItem="center" justifyContent="space-between">
            <Typography fontSize={sizes.sm} customStyles={{ color: "white" }}>
              In progress
            </Typography>
            <Badge text="10" size="md" color={inProgress.p100} />
          </Row>
        </View>
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={toggleCollapsible}>
          <Row
            alignItem="center"
            justifyContent="space-between"
            customStyles={{ paddingVertical: sizes.lg }}
          >
            <Typography txtWhite>Recently Completed</Typography>
            <Icon
              variant="light"
              withBg={false}
              name={isCollapsed ? "chevron-down" : "chevron-up"}
              library="Feather"
              style={{ color: "white" }}
            />
          </Row>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsed} align="center" duration={300}>
          <Stack customStyles={{ width: "100%" }} gap={sizes.sm}>
            <Row justifyContent="space-between" width={"100%"}>
              <Typography txtWhite>Toggle Content</Typography>
              <Badge
                text="Complete"
                size="md"
                color={complete.c100}
                iconLeft={"check-circle"}
              />
            </Row>
            <Row justifyContent="space-between" width={"100%"}>
              <Typography txtWhite>Toggle Content</Typography>
              <Badge
                text="Complete"
                size="md"
                color={complete.c100}
                iconLeft={"check-circle"}
              />
            </Row>
            <Row justifyContent="space-between" width={"100%"}>
              <Typography txtWhite>Toggle Content</Typography>
              <Badge
                text="Complete"
                size="md"
                color={complete.c100}
                iconLeft={"check-circle"}
              />
            </Row>
            <Row justifyContent="space-between" width={"100%"}>
              <Typography txtWhite>Toggle Content</Typography>
              <Badge
                text="Complete"
                size="md"
                color={complete.c100}
                iconLeft={"check-circle"}
              />
            </Row>
          </Stack>
        </Collapsible>
      </View>
    </Stack>
  );
}
