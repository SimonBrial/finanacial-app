import { LinearGradient } from "expo-linear-gradient";
import useTheme from "../hook/useTheme";
import TitleCustom from "./title-custom";
import Stack from "./general/stack";
import DolarPriceItem from "./dolar-price-item";

export default function DolarPriceContainer() {
  const { sizes, globalStyles, complete, danger, inProgress, theme } = useTheme();
  return (
    <Stack
      gap={sizes.lg}
      justifyContent="flex-start"
      customStyles={{
        borderWidth: 1,
        borderColor: globalStyles.borderContainer,
        borderRadius: sizes.xs,
        padding: sizes.lg,
        position: "relative",
        height: 360,
        width: "100%",
      }}
    >
      <LinearGradient
        colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]} // DINÁMICO
        style={[
          {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 360,
            //width: "100%",
            borderRadius: sizes.xs,
            borderWidth: 1,
            borderColor: globalStyles.borderContainer,
          },
        ]}
        locations={[0.1, 1.0]}
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1, y: 0 }}
      />
      <TitleCustom title="Dolar Price" withNotificationIcon={false} />
      <Stack gap={sizes.md}>
        <DolarPriceItem title="Official" color={complete.c100} />
        <DolarPriceItem title="Blue" color={theme.t100} />
        <DolarPriceItem title="Parallel" color={danger.d100} />
        <DolarPriceItem title="Euro" color={inProgress.p100} />
      </Stack>
    </Stack>
  );
}
