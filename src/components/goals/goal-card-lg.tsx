import { View, StyleSheet } from "react-native";
import useTheme from "../../hook/useTheme";
import Typography from "../ui/typography";
import { LinearGradient } from "expo-linear-gradient";
import Badge from "../ui/badge";
import Button from "../ui/button";
import {
  Blur,
  Canvas,
  RadialGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import Icon from "../ui/icon";
import CircularProgress from "../charts/progress-donut";

type GoalStatus = "Completed" | "In Progress" | "New";

interface GoalLgProps {
  title: string;
  status: GoalStatus;
}

export default function GoalCardLg({ title, status }: GoalLgProps) {
  const { sizes, globalStyles, complete, theme, inProgress } = useTheme();
  if (status === "Completed") {
    return (
      <LinearGradient
        colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]}
        style={[
          stylesDefault.backgroundContainer,
          {
            borderWidth: 1,
            borderColor: complete.c100,
          },
        ]}
        locations={[0.1, 1.0]}
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={{ flexDirection: "row", gap: 20, width: "100%" }}>
          <View style={{ width: "50%" }}>
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
              <Badge text="Category" color="gray" type="filled" />
              <Badge
                text="Category"
                color={complete.c100}
                iconLeft={"check-circle"}
                type="ghost"
              />
            </View>
            <Typography
              fontSize={sizes.xxl}
              bold
              customStyles={{ color: "white" }}
            >
              {title}
            </Typography>
          </View>
          <View
            style={{
              height: 120,
              width: 120,
              backgroundColor: complete.c20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1000,
              borderWidth: 1,
              borderColor: complete.c100,
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
                zIndex: 10,
              }}
              id="sdlajksdasdhahj"
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
                    complete.c100,
                    complete.c80,
                    complete.c60,
                    complete.c40,
                    complete.c20,
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
                backgroundColor: complete.c100,
              }}
              variant="light"
            />
          </View>
        </View>
        <Button
          text="Details"
          size="lg"
          fullWidth
          type="bordered"
          color={complete.c100}
          containerStyle={{ marginTop: 24 }}
          iconLeft={"text-box-search-outline"}
        />
      </LinearGradient>
    );
  }
  if (status === "New") { 
      return (<LinearGradient
      colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]}
      style={[
        stylesDefault.backgroundContainer,
        {
          borderWidth: 1,
          borderColor: globalStyles.borderContainer,
        },
      ]}
      locations={[0.1, 1.0]}
      start={{ x: 0, y: 0.0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={{ flexDirection: "row", gap: 20, width: "100%" }}>
        <View style={{ width: "50%" }}>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
            <Badge text="Category" color="gray" type="filled" />
            <Badge
              text="New"
              color={"#6D0DD3"}
              iconLeft={"diamond"}
              type="ghost"
            />
          </View>
          <Typography
            fontSize={sizes.xxl}
            bold
            customStyles={{ color: "white" }}
          >
            {title}
          </Typography>
        </View>
        <View
          style={{
            //backgroundColor: "red",
            width: 120,
            height: 120,
            borderRadius: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            size={120}
            strokeWidth={10}
            text={`20%`}
            progressPercent={20}
          />
          <Canvas
            style={{
              flex: 1,
              width: 150,
              height: 150,
              position: "absolute",
              opacity: 0.1,
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
                  theme.t40,
                  theme.t60,
                  theme.t80,
                  theme.t60,
                  theme.t40,
                  theme.t20,
                  "transparent",
                ]}
              />
            </Rect>
            <Blur blur={20} />
          </Canvas>
          {/* <CircularProgress
            size={120} // Tamaño dinámico opcional
            strokeWidth={10}
            text={`20%`}
            progressPercent={20}
          /> */}
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        <Button
          text="Add"
          size="lg"
          type="filled"
          color={theme.t100}
          containerStyle={{ marginTop: 24, flex: 1 }}
          iconLeft={"add"}
          library="Ionicons"
        />
        <Button
          text="Details"
          size="lg"
          type="bordered"
          color={theme.t100}
          containerStyle={{ marginTop: 24, flex: 1 }}
          iconLeft={"text-box-search-outline"}
        />
      </View>
    </LinearGradient>)
  }
  return (
    <LinearGradient
      colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]}
      style={[
        stylesDefault.backgroundContainer,
        {
          borderWidth: 1,
          borderColor: globalStyles.borderContainer,
        },
      ]}
      locations={[0.1, 1.0]}
      start={{ x: 0, y: 0.0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={{ flexDirection: "row", gap: 20, width: "100%" }}>
        <View style={{ width: "50%" }}>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
            <Badge text="Category" color="gray" type="filled" />
            <Badge
              text="In Progress"
              color={inProgress.p100}
              iconLeft={"timer-sand"}
              type="ghost"
            />
          </View>
          <Typography
            fontSize={sizes.xxl}
            bold
            customStyles={{ color: "white" }}
          >
            {title}
          </Typography>
        </View>
        <View
          style={{
            //backgroundColor: "red",
            width: 120,
            height: 120,
            borderRadius: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            size={120}
            strokeWidth={10}
            text={`20%`}
            progressPercent={20}
          />
          <Canvas
            style={{
              flex: 1,
              width: 150,
              height: 150,
              position: "absolute",
              opacity: 0.1,
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
                  theme.t40,
                  theme.t60,
                  theme.t80,
                  theme.t60,
                  theme.t40,
                  theme.t20,
                  "transparent",
                ]}
              />
            </Rect>
            <Blur blur={20} />
          </Canvas>
          {/* <CircularProgress
            size={120} // Tamaño dinámico opcional
            strokeWidth={10}
            text={`20%`}
            progressPercent={20}
          /> */}
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        <Button
          text="Add"
          size="lg"
          type="filled"
          color={theme.t100}
          containerStyle={{ marginTop: 24, flex: 1 }}
          iconLeft={"add"}
          library="Ionicons"
        />
        <Button
          text="Details"
          size="lg"
          type="bordered"
          color={theme.t100}
          containerStyle={{ marginTop: 24, flex: 1 }}
          iconLeft={"text-box-search-outline"}
        />
      </View>
    </LinearGradient>
  );
}

const stylesDefault = StyleSheet.create({
  containerCard: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
  backgroundContainer: {
    //position: "absolute",
    width: "100%",
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
