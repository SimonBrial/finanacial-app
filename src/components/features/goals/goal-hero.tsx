import { TouchableOpacity, View } from "react-native";
import Stack from "../../ui/stack";
import Typography from "../../ui/typography";
import Row from "../../ui/row";
import useTheme from "../../../hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import Badge from "../../ui/badge";
import Icon from "../../ui/icon";
import Collapsible from "react-native-collapsible";
import { useState } from "react";
import { Canvas, RadialGradient, Rect, vec } from "@shopify/react-native-skia";

export default function GoalHero() {
  const { globalStyles, sizes, inProgress, complete, theme } = useTheme();
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
          position: "relative",
        }}
      >
        <View
          style={{
            height: 120,
            width: 120,
            backgroundColor: theme.t20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1000,
            borderWidth: 1,
            borderColor: theme.t100,
          }}
        >
          <Canvas
            style={{
              flex: 1,
              width: 150,
              height: 150,
              position: "absolute",
              opacity: 0.2,
              borderRadius: 1000,
            }}
            id="sdlajksdasdhasdhjhj"
          >
            <Rect x={0} y={0} width={150} height={150}>
              <RadialGradient
                c={vec(75, 75)}
                r={75}
                colors={[
                  "transparent",
                  "transparent",
                  "transparent",
                  "transparent",
                  "transparent",
                  "transparent",
                  theme.t100,
                  theme.t80,
                  theme.t60,
                  theme.t40,
                  theme.t20,
                  "transparent",
                ]}
              />
            </Rect>
          </Canvas>
          <Icon
            rounded
            color="white"
            size={50}
            name={"emoji-events"}
            library="MaterialIcons"
            bgStyle={{
              padding: 16,
              backgroundColor: theme.t100,
            }}
            variant="light"
          />
        </View>
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
            customStyles={{
              paddingBottom: !isCollapsed ? sizes.lg : 0,
              paddingTop: sizes.lg,
            }}
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
