/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo } from "react";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import useTheme from "../../hooks/useTheme";
import Badge from "../ui/badge";
import SegmentedControl from "./segment-control";
import { FilterKey } from "../../types/type";
import { MOCK_DB } from "../../constants/seeds";
import CollapsibleCardContainer from "../collapsible-card-container";
import { ChartColumnBig } from "lucide-react-native";
import { Text } from "../ui/text";
import { formatCompactNumber } from "../../utils/formatNumber";

const filterOptions: FilterKey[] = ["Week", "Month", "Year"];

export default function BarsChartContainer() {
  const { isDark, globalStyles, complete } = useTheme();

  const [activeIndex, setActiveIndex] = useState(0); // 0 = Income, 1 = Expense
  const [activeFilter, setActiveFilter] = useState<FilterKey>("Month");
  const [containerWidth, setContainerWidth] = useState(0);

  const isIncome = activeIndex === 0;
  const typeKey = isIncome ? "Income" : "Expense";

  // Lógica de procesamiento de datos
  const chartInfo = useMemo(() => {
    const currentViewData = MOCK_DB[activeFilter] || MOCK_DB["Month"];
    const metrics = currentViewData[typeKey];

    let percentage = 0;
    if (metrics.previousTotal > 0) {
      percentage =
        ((metrics.currentTotal - metrics.previousTotal) /
          metrics.previousTotal) *
        100;
    }

    const formattedNumber = new Intl.NumberFormat("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(metrics.currentTotal);

    return {
      data: metrics.data,
      total: `$ ${formattedNumber}`,
      label: currentViewData.periodLabel,
      percentage: Math.abs(percentage).toFixed(1),
      isPositive: percentage >= 0,
      percentageIcon: percentage >= 0 ? "trending-up" : "trending-down",
      percentageColor: percentage >= 0 ? complete.c100 : "#FF6B6B",
    };
  }, [activeFilter, activeIndex]);

  // Colores dinámicos del gradiente cálido (Rojo/Naranja a fuego como la imagen)
  const chartFrontColor = isIncome ? "#F7D032" : "#FF6B6B";
  const chartGradientColor = isIncome ? "#52AC0B" : "#C92A2A";

  // Ancho del gráfico visible
  const chartWidth = Math.max(120, containerWidth - 50);

  // Ancho y espaciado dinámico según el periodo seleccionado
  const barWidth =
    activeFilter === "Month" ? 14 : activeFilter === "Year" ? 20 : 28;

  const spacing =
    activeFilter === "Month" ? 12 : activeFilter === "Year" ? 16 : 20;

  return (
    <CollapsibleCardContainer title="Historial" as={ChartColumnBig}>
      {/* Tarjeta oscura redondeada */}
      <View className="w-full bg-slate-50 rounded-3xl p-4 border border-white self-center">
        {/* Encabezado con totales */}
        <View className="w-full flex-row justify-between pb-3 px-2">
          <View className="flex-col items-start">
            <Text variant="p" className="text-xs text-slate-900 my-0">
              Total {isIncome ? "Ingresos" : "Egresos"}
            </Text>
            <Text
              variant="h2"
              className="my-0 text-slate-900 font-bold text-xl"
            >
              {chartInfo.total}
            </Text>
          </View>

          <View className="flex-col items-center gap-1 py-1 px-2.5 rounded-xl">
            <Text
              variant="p"
              className="text-xs font-semibold text-slate-900 my-0"
            >
              {chartInfo.label}
            </Text>
            <Badge
              text={`${chartInfo.isPositive ? "+" : "-"}${chartInfo.percentage}%`}
              size="sm"
              type="bordered"
              iconLeft={chartInfo.percentageIcon}
              library="MaterialIcons"
              color={chartInfo.percentageColor}
            />
          </View>
        </View>

        {/* ÁREA DE LA GRÁFICA: pb-6 y sin overflow-hidden para dar espacio completo a las letras inferiores */}
        <View
          className="w-full bg-transparent items-center self-center pb-0 pt-2 border border-red-500"
          onLayout={(e) => {
            const w = e.nativeEvent.layout.width;
            if (w !== containerWidth) {
              setContainerWidth(w);
            }
          }}
        >
          {containerWidth > 0 && (
            <BarChart
              barWidth={barWidth}
              spacing={spacing}
              initialSpacing={12}
              noOfSections={4}
              barBorderRadius={30}
              data={chartInfo.data}
              width={chartWidth}
              height={200}
              labelsExtraHeight={30}
              yAxisThickness={0}
              xAxisThickness={1}
              xAxisColor="#90A1B9"
              xAxisLabelTextStyle={{
                color: "#0F172B",
                fontSize: 11,
                marginTop: 6,
                fontWeight: "500",
                textAlign: "center",
              }}
              yAxisTextStyle={{
                color: "#0F172B",
                fontSize: 12,
                fontWeight: "500",
              }}
              formatYLabel={formatCompactNumber}
              showYAxisIndices={false}
              showXAxisIndices={false}
              showGradient
              frontColor={chartFrontColor}
              gradientColor={chartGradientColor}
              minHeight={15}
              rulesType="dashed"
              rulesColor="#90A1B9"
              dashWidth={4}
              dashGap={4}
              isAnimated
              key={`${activeIndex}-${activeFilter}`}
              animationDuration={400}
            />
          )}
        </View>

        {/* Línea divisora */}
        <View className="w-full h-[1px] bg-slate-200 mb-1 -mt-4" />

        {/* Control Segmentado tipo Píldora Azul (Day, Week, Month, Year) */}
        <View className="w-full">
          <SegmentedControl
            containerClassName="bg-slate-50 rounded-full"
            indicatorClassName="bg-theme rounded-full shadow-md"
            selectedTextClassName="text-white font-semibold text-sm"
            textClassName="text-slate-500 font-medium text-sm"
            options={filterOptions}
            selectedIndex={filterOptions.indexOf(activeFilter)}
            onChange={(index) => setActiveFilter(filterOptions[index])}
          />
        </View>
      </View>

      {/* Selector secundario Tipo (Income / Expense) */}
      <View className="flex-1 w-full gap-3 items-center mt-3">
        <View className="w-[92%]">
          <SegmentedControl
            containerClassName={isDark ? "bg-slate-800/40" : "bg-slate-200"}
            selectedTextClassName="text-theme font-bold"
            textClassName="text-slate-500"
            indicatorClassName={
              isDark ? "bg-slate-900 border border-slate-700" : "bg-white"
            }
            options={["Income", "Expense"]}
            selectedIndex={activeIndex}
            onChange={(index) => setActiveIndex(index)}
          />
        </View>
      </View>
    </CollapsibleCardContainer>
  );
}
