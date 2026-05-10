import React from "react";
import Row from "./ui/row";
import { View } from "react-native";
import Typography from "./ui/typography";
import useTheme from "../hook/useTheme";
import Stack from "./ui/stack";
import PercentIndicator from "./ui/percent-indicator";
import { DolarPriceItemProps } from "../interface/interface";

export default function DolarPriceItem({ title, color }: DolarPriceItemProps) {
  const { sizes, globalStyles, theme } = useTheme();
  return (
    <Row
      justifyContent="flex-start"
      width={"100%"}
      customStyles={{ paddingLeft: 10 }}
    >
      <View
        style={{
          height: 50,
          width: 6,
          backgroundColor: color || theme.t100,
          marginRight: sizes.sm,
          borderRadius: 1000,
        }}
      />
      <Stack width={"60%"}>
        <Row gap={sizes.sm} alignItem="flex-end" justifyContent="flex-start">
          <Typography fontSize={sizes.lg} customStyles={{ color: "white" }}>
            {title}
          </Typography>
          <Typography fontSize={sizes.sm} customStyles={{ color: "white" }}>
            (VES)
          </Typography>
        </Row>
        <Typography
          fontSize={sizes.sm}
          customStyles={{ color: globalStyles.subtitle }}
        >
          15/02/2026
        </Typography>
      </Stack>
      <Stack
        width={"32%"}
        alignItem="center"
      //customStyles={{ marginRight: -100 }}
      >
        <Typography fontSize={sizes.lg} customStyles={{ color: color }}>
          238.84
        </Typography>
        <Row
          width={"100%"}
          gap={sizes.md}
          alignItem="flex-end"
        //justifyContent="space-around"
        >
          <Typography
            fontSize={sizes.sm}
            customStyles={{ color: globalStyles.subtitle, marginRight: -20 }}
          >
            -10.55{" "}
          </Typography>
          <PercentIndicator percentage="4.23%" trend="down" />
        </Row>
      </Stack>
    </Row>
  );
}
