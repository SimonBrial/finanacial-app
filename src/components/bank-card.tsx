import { View, StyleSheet } from "react-native";
import Typography from "./ui/typography";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "../hook/useTheme";
import Row from "./ui/row";
import ShowString from "./show-string";
import Badge from "./ui/badge";
import { useState } from "react";
import { BankCardProps } from "../interface/interface";

export default function BankCard({
  bankName,
  gradientColors = ["#444", "#000"],
  balance,
  currency,
  lastEntry,
  percentage,
  trendIcon,
}: BankCardProps) {
  const { sizes, globalStyles } = useTheme();
  const [show, setShow] = useState<boolean>(false);

  // Verificación de seguridad extra
  if (!gradientColors || gradientColors.length < 2) {
    gradientColors = ["#487bf3", "#011B4C"];
  }

  return (
    <View
      style={[
        stylesDefault.containerCard,
        {
          padding: sizes.lg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "99%", // Asegúrate de que ocupe el ancho del contenedor del carrusel
        },
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        style={[
          stylesDefault.background,
          {
            borderWidth: 1,
            borderColor: globalStyles.borderContainer,
          },
        ]}
        locations={[0.1, 1.0]}
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1, y: 0 }}
      />

      <Typography
        bold
        fontSize={sizes.xxl}
        customStyles={{ color: gradientColors[0], textAlign: "right" }}
      >
        {bankName}
      </Typography>

      <View style={{ display: "flex", flexDirection: "column", gap: sizes.xs }}>
        <Row justifyContent="flex-start">
          <Typography fontSize={sizes.md} customStyles={{ color: "white" }}>
            Balance
          </Typography>
          <Typography fontSize={sizes.md} customStyles={{ color: "white" }}>
            ({currency})
          </Typography>
        </Row>

        <Row
          justifyContent="flex-start"
          gap={sizes.sm}
          customStyles={{
            borderWidth: 1,
            borderColor: "transparent",
            borderBottomColor: gradientColors[0],
            paddingBottom: sizes.xs,
          }}
        >
          {show ? (
            <Typography fontSize={sizes.xxl} customStyles={{ color: "white" }}>
              {balance}
            </Typography>
          ) : (
            <Typography fontSize={sizes.xxl} customStyles={{ color: "white" }}>
              {balance.replace(/./g, "*")}
            </Typography>
          )}
          <ShowString fnShow={() => setShow(!show)} show={show} />
        </Row>

        <Row justifyContent="flex-start" gap={sizes.sm} width={"auto"}>
          <Typography fontSize={sizes.sm} customStyles={{ color: "white" }}>
            Last Entry:
          </Typography>

          {show ? (
            <Row justifyContent="flex-start" gap={sizes.sm}>
              <Badge size="sm" text={lastEntry} type="bordered" color="white" />

              <Badge
                size="sm"
                text={percentage}
                type="bordered"
                color="#ffffff"
                iconLeft={trendIcon}
              />
            </Row>
          ) : (
            <Badge
              size="sm"
              text={"**/**/**"}
              type="bordered"
              color="#ffffff"
            />
          )}
        </Row>
      </View>
    </View>
  );
}

const stylesDefault = StyleSheet.create({
  containerCard: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 210,
    borderRadius: 20,
  },
});
