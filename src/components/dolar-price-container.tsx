import { useState } from "react";
import useTheme from "../hooks/useTheme";
import Stack from "./ui/stack";
import DolarPriceItem from "./dolar-price-item";
import { useExchangeStore } from "../stores/useExchangeStore";
import CollapsibleCardContainer from "./collapsible-card-container";
import { BadgeDollarSign } from "lucide-react-native";
import { View } from "react-native";

export default function DolarPriceContainer() {
  const { sizes, complete, danger, inProgress, theme } = useTheme();
  const { rates } = useExchangeStore();

  const colorVariants = [
    { bg: "bg-emerald-500", text: "text-emerald-500" },
    { bg: "bg-blue-500", text: "text-blue-500" },
    { bg: "bg-red-500", text: "text-red-500" },
    { bg: "bg-amber-500", text: "text-amber-500" },
  ];

  return (
    <CollapsibleCardContainer title="Dolar Price" as={BadgeDollarSign}>
      <View className="flex-col gap-4">
        {rates.map((rate, index) => {
          const variant = colorVariants[index % colorVariants.length];
          return (
            <DolarPriceItem
              textColorClass={variant.text}
              title={rate.exchangeName}
              bgColorClass={variant.bg}
              key={index}
            />
          );
        })}
      </View>
    </CollapsibleCardContainer>
  );
}
