import { TouchableOpacity, View } from "react-native";
import useTheme from "../../../hooks/useTheme";
import Collapsible from "react-native-collapsible";
import { useState } from "react";
import { Canvas, RadialGradient, Rect, vec } from "@shopify/react-native-skia";
import { Icon } from "@/components/unused/shadcn-primitives/icon";
import { Medal, ChevronDown, ChevronUp } from "lucide-react-native";
import Badge from "@/components/ui/badge";
import { Text } from "@/components/ui/text";

export default function GoalHero() {
  const { inProgress, complete, theme, isDark } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsible = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View
      className={`flex-1 justify-start rounded-[20] shadow p-5 ${isDark ? "border border-zinc-700 bg-bgContainerDark" : "border border-white bg-slate-50"} `}
    >
      <View
        className={`w-full flex-1 flex-row items-center justify-evenly gap-5 relative pb-8 ${isDark ? "border-b border-b-zinc-700" : "border-b border-b-slate-200 "}`}
      >
        <View className="h-[120px] w-[120px] bg-[#006DFF33] items-center justify-center rounded-full border border-[#006DFF]">
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
          <View className="bg-theme p-4 rounded-full">
            <Icon as={Medal} size={50} className="text-white" />
          </View>
        </View>
        <View className="w-1/2 flex-col gap-3 items-center justify-center">
          <Text
            className={`text-xl font-bold w-full text-center ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Total Goals
          </Text>

          <View className="w-full flex-row items-center justify-between">
            <Text
              className={`text-sm ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Total
            </Text>
            <Badge text="10" size="md" />
          </View>
          <View className="w-full flex-row items-center justify-between">
            <Text
              className={`text-sm ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Completed
            </Text>
            <Badge text="10" size="md" color={complete.c100} />
          </View>
          <View className="w-full flex-row items-center justify-between">
            <Text
              className={`text-sm ${isDark ? "text-white" : "text-slate-900"}`}
            >
              In progress
            </Text>
            <Badge text="10" size="md" color={inProgress.p100} />
          </View>
        </View>
      </View>
      <View className="w-full">
        <TouchableOpacity
          onPress={toggleCollapsible}
          className={`w-full flex-row items-center justify-between pt-4 ${!isCollapsed ? "pb-4" : "pb-0"}`}
        >
          <Text
            className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Recently Completed
          </Text>
          <Icon as={isCollapsed ? ChevronDown : ChevronUp} />
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsed} align="center" duration={300}>
          <View className="w-full flex-col gap-2 pt-2">
            <View className="w-full flex-row items-center justify-between">
              <Text className={`${isDark ? "text-white" : "text-slate-900"}`}>
                Toggle Content
              </Text>
              <Badge
                text="Complete"
                size="md"
                color={complete.c100}
                iconLeft={"check-circle"}
              />
            </View>
            <View className="w-full flex-row items-center justify-between">
              <Text className={`${isDark ? "text-white" : "text-slate-900"}`}>
                Toggle Content
              </Text>
              <Badge
                text="Complete"
                size="md"
                color={complete.c100}
                iconLeft={"check-circle"}
              />
            </View>
            <View className="w-full flex-row items-center justify-between">
              <Text className={`${isDark ? "text-white" : "text-slate-900"}`}>
                Toggle Content
              </Text>
              <Badge
                text="Complete"
                size="md"
                color={complete.c100}
                iconLeft={"check-circle"}
              />
            </View>
            <View className="w-full flex-row items-center justify-between">
              <Text className={`${isDark ? "text-white" : "text-slate-900"}`}>
                Toggle Content
              </Text>
              <Badge
                text="Complete"
                size="md"
                color={complete.c100}
                iconLeft={"check-circle"}
              />
            </View>
          </View>
        </Collapsible>
      </View>
    </View>
  );
}
