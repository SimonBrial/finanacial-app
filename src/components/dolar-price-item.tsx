import React from "react";
import Row from "./ui/row";
import { View } from "react-native";
import Typography from "./ui/typography";
import useTheme from "../hooks/useTheme";
import Stack from "./ui/stack";
import PercentIndicator from "./ui/percent-indicator";
import { DolarPriceItemProps } from "../types/interface";
import { Text } from "./ui/text";

export default function DolarPriceItem({
  title,
  bgColorClass,
  textColorClass,
}: DolarPriceItemProps) {
  const { isDark } = useTheme();
  return (
    <View className="flex-row justify-start items-center w-full pl-3">
      <View className={`${bgColorClass} h-14 w-2 mr-3 rounded-full`} />
      <View className="w-3/5 flex-col">
        <View className="flex-row gap-3 items-end justify-start">
          <Text
            className={`my-0 ${isDark ? "text-white" : "text-slate-900"} font-normal`}
            variant={"h4"}
          >
            {title}
          </Text>
          {/* <Typography fontSize={sizes.lg} customStyles={{ color: "white" }}>
            {title}
          </Typography> */}
          <Text className="my-0 text-sm text-slate-900" variant={"p"}>
            (VES)
          </Text>
          {/* <Typography fontSize={sizes.sm} customStyles={{ color: "white" }}>
            (VES)
          </Typography> */}
        </View>
        <Text className="my-0 text-sm text-slate-500" variant={"p"}>
          15/02/2026
        </Text>
        {/* <Typography
          fontSize={sizes.sm}
          customStyles={{ color: globalStyles.subtitle }}
        >
          15/02/2026
        </Typography> */}
      </View>
      <View className="w-[32%] flex-col items-center ">
        <Text className={`my-0  ${textColorClass} font-medium`} variant={"h4"}>
          238.84
        </Text>
        {/* <Typography fontSize={sizes.lg} customStyles={{ color: color }}>
          238.84
        </Typography> */}
        <View className="w-full flex-row gap-0 items-center justify-center">
          <Text className="my-0 text-sm text-slate-500" variant={"p"}>
            -10.55
          </Text>
          {/* <Typography
            fontSize={sizes.sm}
            customStyles={{ color: globalStyles.subtitle, marginRight: -20 }}
          >
            -10.55{" "}
          </Typography> */}
          <PercentIndicator percentage="4.23%" trend="down" />
        </View>
      </View>
    </View>
  );
}
