import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import useTheme from "../hook/useTheme";
import TitleCustom from "./title-custom";
import Stack from "./ui/stack";
import DolarPriceItem from "./dolar-price-item";
import { useExchangeStore } from "../store/useExchangeStore";
import Collapsible from "react-native-collapsible";
import { TouchableOpacity } from "react-native";
import Icon from "./ui/icon";
import Row from "./ui/row";
import Typography from "./ui/typography";

export default function DolarPriceContainer() {
  const { sizes, globalStyles, complete, danger, inProgress, theme } = useTheme();
  const { rates } = useExchangeStore();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsible = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <LinearGradient
      colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]} // DINÁMICO
      style={[
        {
          borderRadius: sizes.lg,
          borderWidth: 1,
          borderColor: globalStyles.borderContainer,
          marginTop: sizes.xl,
        },
      ]}
      locations={[0.1, 1.0]}
      start={{ x: 0, y: 0.0 }}
      end={{ x: 1, y: 0 }}
    >

      <Stack
        gap={sizes.lg}
        justifyContent="flex-start"
        customStyles={{
          paddingHorizontal: sizes.lg,
          paddingBottom: !isCollapsed ? sizes.lg : 0,
          paddingTop: sizes.lg,
        }}
      >
        <TouchableOpacity onPress={toggleCollapsible}>

          {/* <TitleCustom title="Dolar Price" withNotificationIcon={false} /> */}

          <Row
            gap={sizes.xs}
            alignItem="center"
            justifyContent="start"
          >
            <Icon
              bgStyle={{
                padding: sizes.xxs,
                borderRadius: sizes.xs,
                backgroundColor: `${theme.t20}`,
                //width: 44,
                //height: 44,
              }}
              color={theme.t100}
              size={sizes.xl}
              library="MaterialCommunityIcons"
              name="currency-usd"
            />
            <Typography
              fontSize={sizes.xl}
              bold={false}
              customStyles={{ color: "white", width: "85%" }}
            >
              Dolar Price
            </Typography>
          </Row>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsed} align="center" duration={300}>
          <Stack gap={sizes.md}>
            {rates.map((rate, index) => {
              const colors = [complete.c100, theme.t100, danger.d100, inProgress.p100];
              return (
                <DolarPriceItem
                  key={index}
                  title={rate.exchangeName}
                  color={colors[index % colors.length]}
                />
              );
            })}
          </Stack>
        </Collapsible>
      </Stack>
    </LinearGradient>
  );
}
