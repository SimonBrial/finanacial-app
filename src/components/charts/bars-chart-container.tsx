/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "../../hook/useTheme";
import Badge from "../ui/badge";
import Row from "../ui/row";
import Typography from "../ui/typography";
import Icon from "../ui/icon";
import SegmentedControl from "./segment-control";
import Button from "../ui/button";
import { FilterKey } from "../../types/type";
import { MOCK_DB } from "../../seeds/seeds";

export default function BarsChartContainer() {
  const { sizes, theme, globalStyles, complete } = useTheme();

  const [activeIndex, setActiveIndex] = useState(0); // 0 = Income, 1 = Expense
  const [activeFilter, setActiveFilter] = useState<FilterKey>("Month");

  const isIncome = activeIndex === 0;
  const typeKey = isIncome ? "Income" : "Expense";

  // 2. LÓGICA DE PROCESAMIENTO
  const chartInfo = useMemo(() => {
    const currentViewData = MOCK_DB[activeFilter];
    const metrics = currentViewData[typeKey];

    // Calculamos el porcentaje usando los totales que vienen de la "DB"
    let percentage = 0;
    if (metrics.previousTotal > 0) {
      percentage =
        ((metrics.currentTotal - metrics.previousTotal) /
          metrics.previousTotal) *
        100;
    }

    // Formateo seguro para la moneda: $ 25.560,00
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

  // Colores dinámicos para la gráfica
  const chartFrontColor = isIncome ? "#F7D032" : "#FF6B6B";
  const chartGradientColor = isIncome ? "#52AC0B" : "#C92A2A";

  // Ajustamos el ancho para que 3 botones ocupen bien el espacio
  const pillStyle = { borderRadius: 50, width: "31%" };

  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: sizes.lg,
          paddingHorizontal: sizes.sm,
          marginTop: sizes.md,
        },
      ]}
    >
      <LinearGradient
        colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]}
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: sizes.lg,
            borderWidth: 1,
            borderColor: globalStyles.borderContainer,
          },
        ]}
        locations={[0.1, 1.0]}
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1, y: 0 }}
      />

      {/* Encabezado */}
      <View
        style={[
          styles.header,
          {
            gap: sizes.sm,
            paddingHorizontal: sizes.md,
            paddingBottom: sizes.md,
          },
        ]}
      >


        <Row width="45%" justifyContent="flex-start" alignItem="flex-end">
          <Row
            width="100%"
            gap={sizes.xs}
            alignItem="center"
            justifyContent="flex-start"
          >
            <Icon
              bgStyle={{
                padding: sizes.xxs,
                borderRadius: sizes.xs,
                backgroundColor: theme.t20,
              }}
              color={theme.t100}
              size={sizes.xl}
              name="insert-chart-outlined"
              library="MaterialIcons"
            />
            <Typography
              fontSize={sizes.xl}
              bold={false}
              customStyles={{ color: "white" }}
            >
              Historial
            </Typography>
          </Row>
        </Row>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: sizes.sm,
            paddingHorizontal: sizes.sm,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 0,
            }}
          >
            <Typography
              fontSize={sizes.md}
              bold={false}
              customStyles={{ color: globalStyles.subtitle }}
            >
              Total {isIncome ? "Ingresos" : "Egresos"}
            </Typography>
            <Typography
              fontSize={sizes.xxl}
              bold={false}
              customStyles={{ color: "white" }}
            >
              {chartInfo.total}
            </Typography>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: sizes.sm,
              borderColor: globalStyles.borderContainer,
              borderWidth: 1,
              paddingVertical: sizes.sm,
              paddingHorizontal: sizes.sm,
              borderRadius: sizes.sm,
            }}
          >
            <Typography fontSize={sizes.md} txtWhite bold>
              {chartInfo.label}
            </Typography>
            <View>
              <Badge
                text={`${chartInfo.isPositive ? "+" : "-"}${chartInfo.percentage}%`}
                size="md"
                type="bordered"
                iconLeft={chartInfo.percentageIcon}
                library="MaterialIcons"
                color={chartInfo.percentageColor}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Gráfica */}
      <View style={styles.chartContainer}>
        <BarChart
          barWidth={30}
          noOfSections={5}
          barBorderRadius={45}
          data={chartInfo.data}
          width={300}
          height={200}
          yAxisThickness={1}
          xAxisThickness={1}
          xAxisType="solid"
          xAxisLabelTextStyle={{ color: "white" }}
          yAxisTextStyle={{ color: "white" }}
          showYAxisIndices
          showXAxisIndices
          xAxisIndicesColor={globalStyles.subtitle}
          yAxisIndicesColor={globalStyles.subtitle}
          yAxisColor={globalStyles.subtitle}
          xAxisColor={globalStyles.subtitle}
          showGradient
          frontColor={chartFrontColor}
          gradientColor={chartGradientColor}
          minHeight={2}
          scrollAnimation
          rulesType="dashed"
          rulesColor={globalStyles.subtitle}
          isAnimated
          key={`${activeIndex}-${activeFilter}`}
          animationDuration={500}
        />
      </View>

      {/* Filtros Inferiores */}
      <View style={{ flex: 1, width: "100%", gap: sizes.md }}>
        <View style={styles.filtersContainer}>
          {["Week", "Month", "Year"].map((filter) => (
            <Button
              key={filter}
              text={filter}
              type={activeFilter === filter ? "filled" : "bordered"}
              color={activeFilter === filter ? "#006dff" : "#FFFFFF"}
              size="xs"
              isActive={activeFilter === filter}
              onPress={() => setActiveFilter(filter as FilterKey)}
              containerStyle={pillStyle}
            />
          ))}
        </View>

        <View style={{ width: "100%", paddingHorizontal: sizes.sm }}>
          <SegmentedControl
            options={["Income", "Expense"]}
            selectedIndex={activeIndex}
            onChange={(index) => setActiveIndex(index)}
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", position: "relative" },
  header: { display: "flex", flexDirection: "column", width: "100%" },
  chartContainer: {
    width: "100%",
    backgroundColor: "transparent",
    overflow: "hidden",
    borderColor: "transparent",
    borderWidth: 1,
  },
  filtersContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
});
