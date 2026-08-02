import { View } from "react-native";
import dayjs from "dayjs";
import useTheme from "../hooks/useTheme";
import PercentIndicator from "./ui/percent-indicator";
import { DolarPriceItemProps } from "../types/interface";
import { Text } from "./ui/text";

export default function DolarPriceItem({
  textColorClass,
  trend = "same",
  bgColorClass,
  percentage,
  currency,
  change,
  title,
  price,
  date,
}: DolarPriceItemProps) {
  const { isDark } = useTheme();

  // Formatear precio
  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString("es-VE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : price || "0.00";

  // Formatear fecha CON HORA (ej. 31/07/2026 12:00 PM)
  const formattedDate = date
    ? dayjs(date).format("DD/MM/YYYY hh:mm A")
    : dayjs().format("DD/MM/YYYY hh:mm A");

  // Formatear diferencia real (-10.55 / +2.30 / 0.00)
  const numericChange =
    typeof change === "number" ? change : parseFloat(String(change || 0));

  const formattedChange =
    numericChange > 0
      ? `+${numericChange.toFixed(2)}`
      : numericChange < 0
        ? numericChange.toFixed(2)
        : "0.00";

  return (
    <View className="flex-row justify-start items-center w-full pl-3 pr-1">
      <View className={`${bgColorClass} border h-14 w-2 mr-3 rounded-full`} />

      {/* Título y Fecha con Hora (Lado Izquierdo) */}
      <View className="flex-row flex-1 justify-between pr-5">
        <View className="w-[50%] flex-col ">
          <View className="flex-row gap-2 items-end justify-start">
            <Text
              className={`my-0 ${isDark ? "text-white" : "text-slate-900"} font-medium`}
              variant={"h4"}
            >
              {title}
            </Text>
            <Text className="my-0 text-xs text-slate-400" variant={"p"}>
              (VES)
            </Text>
          </View>
          <Text className="my-0 text-xs text-slate-500" variant={"p"}>
            {formattedDate}
          </Text>
        </View>

        {/* Cifra Actual + Diferencia y Porcentaje (Lado Derecho) */}
        <View className="w-[30%] flex-col items-center">
          <Text
            className={`my-0 ${textColorClass} font-semibold`}
            variant={"h4"}
          >
            {formattedPrice}
          </Text>
          <View className="flex-row gap-1.5 items-center justify-end mt-0.5">
            <Text className="my-0 text-xs text-slate-500" variant={"p"}>
              {formattedChange}
            </Text>
            <PercentIndicator
              percentage={percentage || "0.00%"}
              trend={trend}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
