import {
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Typography from "../../../components/ui/typography";
import useTheme from "../../../hooks/useTheme";
import DonutChart from "../../../components/charts/donut-chart";
import SpendingCategoryCard from "../../../components/features/transactions/spending-category-card";
import { useBudgetStore } from "../../../stores/useBudgetStore"; // Importar Zustand

export default function Insight() {
  const { sizes, theme, globalStyles } = useTheme();
  const { insights, selectedIndex, setSelectedIndex } = useBudgetStore();

  // 1. Cálculos de totales reales (basados en la data)
  const totalAmount = insights.reduce((sum, item) => sum + item.amount, 0); // Total gastado
  const totalLimit = insights.reduce((sum, item) => sum + item.limit, 0); // Total asignado (límite)

  const globalPercentage = Math.round((totalAmount / totalLimit) * 100);

  // 2. Preparar los datos para el DonutChart, incluyendo amount y limit
  const chartData = insights.map((c) => ({
    id: c.id,
    label: c.title,
    value: c.amount, // Valor principal a mostrar (gastado)
    color: c.color,
    amount: c.amount, // Pasar estrictamente como número
    limit: c.limit, // Pasar estrictamente como número
  }));

  // --- NUEVA LÓGICA DE PROPORCIONES BASE ---

  // REGLA CLAVE: El tamaño total del arco base de cada categoría debe representar su LÍMITE (Asignado).
  // No el dinero gastado, sino el espacio máximo que se le asignó en el presupuesto total.

  // 3. Calcular proporciones base estrictas (proporcional al límite de cada categoría respecto al total asignado)
  const rawProportions = insights.map((c) => c.limit / totalLimit);

  // --- AJUSTE DE VISIBILIDAD MÍNIMA (para 'Health', etc.) ---

  // Definimos un porcentaje mínimo de visibilidad (ej. 3%).
  // Si una categoría es menor, la forzamos a este mínimo para que no desaparezca.
  const MIN_VISIBILITY_PERCENTAGE = 0.03;

  // 4. Enforzar mínimo y re-escalar matemáticamente el resto para que el total siga siendo 1.
  // Es crucial re-escalar los demás para que el gráfico no se deforme.
  let finalProportions = rawProportions.map((p) =>
    Math.max(p, MIN_VISIBILITY_PERCENTAGE),
  );
  const finalProportionsSumRaw = finalProportions.reduce(
    (sum, p) => sum + p,
    0,
  );

  // Normalizar de vuelta a 1 (re-escalado matemático)
  finalProportions = finalProportions.map((p) => p / finalProportionsSumRaw);

  // 5. Crear el shared value con las proporciones corregidas y re-escaladas
  const decimals = useSharedValue(finalProportions);
  const colors = insights.map((c) => c.color);

  const selectedCategory =
    selectedIndex !== null ? insights[selectedIndex] : null;

  // REGLA UX: Renderizado central (Máximo 2 características)
  const renderCenterContent = () => {
    if (!selectedCategory) {
      return (
        <View style={{ alignItems: "center" }}>
          <Typography bold fontSize={sizes.xl} txtWhite>
            {globalPercentage}%
          </Typography>
          <Typography
            fontSize={sizes.xs}
            customStyles={{ color: globalStyles.subtitle, marginTop: 4 }}
          >
            TOTAL SPENT
          </Typography>
        </View>
      );
    }

    const isOverBudget = selectedCategory.amount > selectedCategory.limit;
    const remainingOrOver = Math.abs(
      selectedCategory.limit - selectedCategory.amount,
    );

    return (
      <View style={{ alignItems: "center" }}>
        {/* Característica 1: Total Gastado */}
        <Typography
          bold
          fontSize={sizes.lg}
          customStyles={{ color: selectedCategory.color }}
        >
          ${selectedCategory.amount.toFixed(2)}
        </Typography>

        {/* Característica 2: Restante o Exceso */}
        <Typography
          fontSize={sizes.sm}
          customStyles={{
            color: isOverBudget ? "#ef4444" : globalStyles.subtitle,
            marginTop: 4,
          }}
        >
          {isOverBudget
            ? `Exceso: -$${remainingOrOver.toFixed(2)}`
            : `Faltan: $${remainingOrOver.toFixed(2)}`}
        </Typography>
      </View>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "black" }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{ height: 280, justifyContent: "center", alignItems: "center" }}
      >
        {/* Touchable para deseleccionar al tocar fuera */}
        <TouchableWithoutFeedback onPress={() => setSelectedIndex(null)}>
          <View style={{ width: 220, height: 220, position: "relative" }}>
            <DonutChart
              colors={colors}
              data={chartData}
              decimals={decimals}
              gap={0.03}
              radius={110}
              strokeWidth={14}
              outerStrokeWidth={20}
              selectedIndex={selectedIndex}
            />
            <View style={StyleSheet.absoluteFillObject}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                {renderCenterContent()}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 32,
          gap: 8,
        }}
      >
        <Typography
          fontSize={sizes.md}
          customStyles={{
            color: globalStyles.subtitle,
            textTransform: "uppercase",
            marginLeft: 8,
          }}
        >
          TOTAL SPENT{" "}
        </Typography>
        <Typography
          bold
          fontSize={sizes.lg}
          customStyles={{ color: theme.t100 }}
        >
          {totalAmount.toFixed(2)} $
        </Typography>
      </View>

      {/* ... [El resto de la UI (SPENDING BY CATEGORY, Generate report) queda igual] ... */}

      <View>
        {insights.map((ins, index) => {
          // Calcular dinámicamente si se acerca al límite (ej. 80%)
          const isApproaching =
            ins.amount / ins.limit >= 0.8 && ins.amount <= ins.limit;

          return (
            <SpendingCategoryCard
              key={ins.id}
              index={index}
              title={ins.title}
              amount={ins.amount}
              limit={ins.limit}
              color={ins.color}
              iconName={ins.icon}
              library={ins.library}
              selected={selectedIndex}
              approachingLimit={isApproaching}
              onPress={(i) => setSelectedIndex(i === selectedIndex ? null : i)}
            />
          );
        })}
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
