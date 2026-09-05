import { View, StyleSheet } from "react-native";
import useTheme from "../../../hooks/useTheme";
import Typography from "../../ui/typography";
import { LinearGradient } from "expo-linear-gradient";
import Badge from "../../ui/badge";
//import Button from "../../ui/button-own";
import { Button } from "../../ui/button";
import {
  RadialGradient,
  Canvas,
  Blur,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import { Icon } from "../../unused/shadcn-primitives/icon";
import CircularProgress from "../../charts/progress-donut";
import { GoalLgProps } from "../../../types/interface";
import { Text } from "../../ui/text";
import { FileSearchCorner, Medal } from "lucide-react-native";

export default function GoalCardLg({ title, status }: GoalLgProps) {
  const { sizes, globalStyles, complete, theme, inProgress, isDark } =
    useTheme();
  if (status === "Completed") {
    return (
      <View
        className={`w-full rounded-[20] p-8 flex-col justify-between items-center ${isDark ? "bg-bgContainerDark" : "bg-slate-50"}`}
      >
        <View className="flex-row justify-between items-center gap-5 w-full">
          <View className="w-1/2">
            <View
              className="flex-row gap-2 mb-3"
              //style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}
            >
              <Badge text="Category" color="gray" type="filled" size="sm" />
              <Badge
                text="Category"
                color={complete.c100}
                iconLeft={"check-circle"}
                type="ghost"
                size="sm"
              />
            </View>
            <Text
              className={`text-2xl font-bold my-0 ${isDark ? "text-zinc-900" : "text-black"}`}
            >
              {title}
            </Text>
            <Button
              //text="Details"
              size="lg"
              //fullWidth
              variant="outline"
              //color={complete.c100}
              // containerStyle={{ marginTop: 24 }}
              //iconLeft={"text-box-search-outline"}
            >
              <Icon as={FileSearchCorner} />
              <Text variant="p">Details</Text>
            </Button>
          </View>
          <View className="w-[100px] h-[100px] bg-[#17C96433] items-center justify-center rounded-full border border-[#17C964]">
            <Canvas
              style={{
                flex: 1,
                width: 100,
                height: 100,
                position: "absolute",
                opacity: 0.2,
                borderRadius: 1000,
                zIndex: 10,
              }}
              id="sdlajksdasdhahj"
            >
              <Rect x={0} y={0} width={100} height={100}>
                <RadialGradient
                  c={vec(50, 50)}
                  r={50}
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
            <View className="p-3 bg-[#17C964] rounded-full">
              <Icon
                as={Medal}
                //rounded
                color="white"
                size={50}
                //name={"emoji-events"}
                //library="MaterialIcons"

                /* bgStyle={{
                padding: 16,
                backgroundColor: complete.c100,
                }} */
                //variant="light"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  if (status === "New") {
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
              <Badge text="Category" color="gray" type="filled" size="sm" />
              <Badge
                text="New"
                color={"#6D0DD3"}
                iconLeft={"diamond"}
                type="ghost"
                size="sm"
              />
            </View>
            <Typography
              fontSize={sizes.xxl}
              bold
              customStyles={{ color: globalStyles.text }}
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
            //text="Add"
            size="lg"
            variant="default"
            //color={theme.t100}
            //containerStyle={{ marginTop: 24, flex: 1 }}
            //iconLeft={"add"}
            //library="Ionicons"
          >
            <Text>Add</Text>
          </Button>
          <Button
            //text="Details"
            size="lg"
            variant="outline"
            //color={theme.t100}
            //ontainerStyle={{ marginTop: 24, flex: 1 }}
            //iconLeft={"text-box-search-outline"}
          >
            <Text>Details</Text>
          </Button>
        </View>
      </LinearGradient>
    );
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
            <Badge text="Category" color="gray" type="filled" size="sm" />
            <Badge
              text="In Progress"
              color={inProgress.p100}
              iconLeft={"timer-sand"}
              type="ghost"
              size="sm"
            />
          </View>
          <Typography
            fontSize={sizes.xxl}
            bold
            customStyles={{ color: globalStyles.text }}
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
          //text="Add"
          size="lg"
          variant="default"
          //color={theme.t100}
          //containerStyle={{ marginTop: 24, flex: 1 }}
          //iconLeft={"add"}
          //library="Ionicons"
        >
          <Text>Add</Text>
        </Button>
        <Button
          // text="Details"
          size="lg"
          variant="default"
          // color={theme.t100}
          // containerStyle={{ marginTop: 24, flex: 1 }}
          // iconLeft={"text-box-search-outline"}
        >
          <Text>Details</Text>
        </Button>
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
