import useTheme from "../../hooks/useTheme";
import Badge from "./badge";
import { PercentIndicatorProps } from "../../types/interface";


export default function PercentIndicator({
  percentage,
  trend,
}: PercentIndicatorProps) {
  const { danger, complete } = useTheme();
  const icon = trend === "up" ? "trending-up" : "trending-down";
  const color = trend === "up" ? complete.s100 : danger.d100;
  return <Badge text={percentage} iconLeft={icon} type="light" color={color} />;
}
