import { useState } from "react";
import useTheme from "../hooks/useTheme";
import Stack from "./ui/stack";
import DolarPriceItem from "./dolar-price-item";
import { useExchangeStore } from "../stores/useExchangeStore";
import CollapsibleCardContainer from "./collapsible-card-container";

export default function DolarPriceContainer() {
  const { sizes, complete, danger, inProgress, theme } = useTheme();
  const { rates } = useExchangeStore();

  return (
    <CollapsibleCardContainer
      title="Dolar Price"
      library="MaterialCommunityIcons"
      name="currency-usd"
    >
      <Stack gap={sizes.md}>
        {rates.map((rate, index) => {
          const colors = [
            complete.c100,
            theme.t100,
            danger.d100,
            inProgress.p100,
          ];
          return (
            <DolarPriceItem
              key={index}
              title={rate.exchangeName}
              color={colors[index % colors.length]}
            />
          );
        })}
      </Stack>
    </CollapsibleCardContainer>
  );
}
