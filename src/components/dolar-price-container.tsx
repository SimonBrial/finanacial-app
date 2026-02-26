import { LinearGradient } from "expo-linear-gradient";
import useTheme from "../hook/useTheme";
import TitleCustom from "./title-custom";
import Stack from "./ui/stack";
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
        borderRadius: sizes.lg,
        paddingHorizontal: sizes.lg,
        paddingVertical: sizes.xl,
        position: "relative",
        height: 360,
        width: "100%",
        marginTop: sizes.xl,
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
            borderRadius: sizes.lg,
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
