import { useEffect } from "react";
import useTheme from "../hooks/useTheme";
import DolarPriceItem from "./dolar-price-item";
import { useExchangeStore } from "../stores/useExchangeStore";
import CollapsibleCardContainer from "./collapsible-card-container";
import { BadgeDollarSign } from "lucide-react-native";
import { View, ActivityIndicator } from "react-native";
import { Text } from "./ui/text";

export default function DolarPriceContainer() {
  const { isDark } = useTheme();
  const { rates, loading, error, fetchRates } = useExchangeStore();

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const colorVariants = [
    { bg: "bg-emerald-500", text: "text-emerald-500" },
    { bg: "bg-red-500", text: "text-red-500" },
    { bg: "bg-blue-500", text: "text-blue-500" },
    { bg: "bg-amber-500", text: "text-amber-500" },
  ];

  return (
    <CollapsibleCardContainer
      title="Dolar Price"
      as={BadgeDollarSign}
      onRefresh={fetchRates}
      isLoading={loading}
    >
      <View className="flex-col gap-4 py-2">
        {loading && rates.length === 0 ? (
          <View className="py-6 items-center justify-center">
            <ActivityIndicator
              size="large"
              color={isDark ? "#ffffff" : "#0284c7"}
            />
            <Text className="mt-2 text-xs text-slate-400">
              Cargando cotizaciones...
            </Text>
          </View>
        ) : error && rates.length === 0 ? (
          <View className="py-4 px-3 items-center">
            <Text className="text-sm text-red-500 text-center">{error}</Text>
          </View>
        ) : (
          rates.map((rate, index) => {
            const variant = colorVariants[index % colorVariants.length];
            return (
              <DolarPriceItem
                key={`${rate.moneda || "USD"}-${rate.fuente || rate.nombre || index}`}
                title={rate.nombre || rate.exchangeName || "Dólar"}
                currency={rate.moneda || "USD"}
                price={rate.promedio}
                date={rate.fechaActualizacion}
                change={rate.change}
                percentage={rate.percentageChange}
                trend={rate.trend}
                bgColorClass={variant.bg}
                textColorClass={variant.text}
              />
            );
          })
        )}
      </View>
    </CollapsibleCardContainer>
  );
}
