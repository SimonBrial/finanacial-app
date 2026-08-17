import useTheme from "../hooks/useTheme";
import CircularProgress from "./charts/progress-donut";
import { View } from "react-native";
import { Canvas, Rect, RadialGradient, vec } from "@shopify/react-native-skia";
import { GoalCardProps } from "../types/interface";
import { Text } from "./ui/text";
import Badge from "./ui/badge";

export default function GoalCard({
  currentAmount,
  goalAmount,
  description,
  progress,
  status,
  title,
  size,
}: GoalCardProps) {
  const { theme, isDark } = useTheme();

  // Función para formatear números al estilo europeo/latino (puntos para miles, coma para decimal)
  const formatNumber = (num: number) => {
    return num.toLocaleString("de-DE", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  };

  return (
    <View
      className={`
        w-[48%] flex-row items-center justify-center rounded-full p-2 gap-3 
        ${isDark ? "bg-bgContainerDark" : "bg-white"}
        ${isDark ? "border border-zinc-800" : "border border-white"}
        ${size === "sm" ? "self-start" : "self-stretch"}
      `}
    >
      <View
        className={`rounded-full justify-center items-center ${
          size === "sm" ? "w-[60px] h-[60px]" : "w-[80px] h-[80px]"
        }`}
      >
        <Canvas
          style={{
            flex: 1,
            position: "absolute",
            width: 70,
            height: 70,
            opacity: 0.2,
            borderRadius: 1000,
          }}
          id="sdlajksdasdhasdhjhj"
        >
          <Rect x={0} y={0} width={70} height={70}>
            <RadialGradient
              c={vec(35, 35)}
              r={35}
              colors={[
                "transparent",
                theme.t20,
                theme.t40,
                theme.t60,
                theme.t80,
                theme.t100,
                "transparent",
              ]}
            />
          </Rect>
        </Canvas>
        <CircularProgress
          size={size === "sm" ? 50 : 70} // Tamaño dinámico opcional
          strokeWidth={10}
          text={`${progress.toFixed(0)}%`}
          progressPercent={progress}
        />
      </View>
      <View className="flex-col flex-1 gap-1">
        <Text
          className={`font-bold ${size ? "text-xs" : "text-xl"} ${isDark ? "text-white" : "text-slate-900"} `}
        >
          {title}
        </Text>
        {status ? (
          <Badge
            text="Complete"
            type="gradient"
            color={"#00BC7D"}
            iconLeft={"check-circle"}
            size="sm"
          />
        ) : (
          <Text
            className={`${size ? "text-xs" : "text-base"} ${isDark ? "text-gray-400" : "text-slate-600"}  opacity-70 `}
          >
            {formatNumber(currentAmount)}/{goalAmount}
          </Text>
        )}
      </View>
    </View>
  );
}
