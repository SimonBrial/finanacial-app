import useTheme from "../../hooks/useTheme";
import Badge from "./badge";
import { PercentIndicatorProps } from "../../types/interface";

export default function PercentIndicator({
  percentage,
  trend,
}: PercentIndicatorProps) {
  const { danger, complete } = useTheme();

  // En contexto de divisas:
  // Si el dólar sube ("up") -> ROJO (desventaja de costo para el usuario)
  // Si el dólar baja ("down") -> VERDE (beneficioso para el usuario)
  // Si se mantiene igual ("same"/"flat") -> GRIS neutro
  const icon =
    trend === "up"
      ? "trending-up"
      : trend === "down"
      ? "trending-down"
      : "minus";

  const color =
    trend === "up"
      ? danger.d100
      : trend === "down"
      ? complete.s100
      : "#94a3b8";

  return <Badge text={percentage} iconLeft={icon} type="light" color={color} size="sm"/>;
}
