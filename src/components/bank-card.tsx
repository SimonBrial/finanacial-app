import { View, StyleSheet } from "react-native";
import Typography from "./general/typography";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "../hook/useTheme";
import Row from "./general/row";
import ShowString from "./show-string";
import Badge from "./general/badge";

interface BankCardProps {
  bankName: string;
  gradientColors: [string, string];
  balance: string;
  currency: string;
  lastEntry: string;
  percentage: string;
  trendIcon: string;
}

export default function BankCard({
  bankName,
  gradientColors = ["#444", "#000"],
  balance,
  currency,
  lastEntry,
  percentage,
  trendIcon,
}: BankCardProps) {
  const { theme, sizes, globalStyles } = useTheme();

  // Verificación de seguridad extra
  if (!gradientColors || gradientColors.length < 2) {
    gradientColors = ["#487CF3", "#011B4C"]; 
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
          width: "100%", // Asegúrate de que ocupe el ancho del contenedor del carrusel
        },
      ]}
    >
      <LinearGradient
        colors={gradientColors} // DINÁMICO
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
        customStyles={{ color: theme.t100, textAlign: "right" }}
      >
        {bankName} {/* DINÁMICO */}
      </Typography>

      <View style={{ display: "flex", flexDirection: "column", gap: sizes.xs }}>
        <Row justifyContent="flex-start">
          <Typography fontSize={sizes.md} customStyles={{ color: "white" }}>
            Balance
          </Typography>
          <Typography fontSize={sizes.md} customStyles={{ color: "white" }}>
            ({currency}) {/* DINÁMICO */}
          </Typography>
        </Row>

        <Row
          justifyContent="flex-start"
          gap={sizes.sm}
          customStyles={{
            borderWidth: 1,
            borderColor: "transparent",
            borderBottomColor: theme.t100,
            paddingBottom: sizes.xs,
          }}
        >
          <Typography fontSize={sizes.xxl} customStyles={{ color: "white" }}>
            {balance} {/* DINÁMICO */}
          </Typography>
          <ShowString />
        </Row>

        <Row justifyContent="flex-start" gap={sizes.sm} width={"auto"}>
          <Typography fontSize={sizes.sm} customStyles={{ color: "white" }}>
            Last Entry:
          </Typography>
          <Badge
            size="sm"
            text={lastEntry} // DINÁMICO
            type="bordered"
            color="white"
          />

          <Badge
            size="sm"
            text={percentage} // DINÁMICO
            type="bordered"
            color="#ffffff"
            iconLeft={trendIcon} // DINÁMICO
          />
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
    //backgroundColor: "red",
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
