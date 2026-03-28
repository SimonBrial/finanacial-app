import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Typography from "../../../components/ui/typography";
import Icon from "../../../components/ui/icon";
import useTheme from "../../../hook/useTheme";
import DonutChart from "../../../components/charts/donut-chart";
import SpendingCategoryCard from "../../../components/transactions/spending-category-card";

export default function Insight() {
  const { sizes, theme, globalStyles } = useTheme();

  // Simulated data equivalent to the UI mockup
  const insights = [
    {
      id: "food16d",
      title: "Food",
      amount: 238.84,
      limit: 300,
      color: "#13dd67",
      icon: "fast-food-outline",
      library: "Ionicons",
      approachingLimit: true,
    },
    {
      id: "groceries16d",
      title: "Groceries",
      amount: 238.84,
      limit: 300,
      color: "#13ace9",
      icon: "cart",
      library: "Ionicons",
      approachingLimit: true,
    },
    {
      id: "car16d",
      title: "Car",
      amount: 238.84,
      limit: 300,
      color: "#8a2be2",
      icon: "car",
      library: "Ionicons",
      approachingLimit: true,
    },
  ];

  const chartData = insights.map((c, i) => ({
    id: c.id,
    label: c.title,
    value: c.amount,
    color: c.color,
  }));
  const totalAmount = "1 245";

  // Compute slice proportions dynamically considering a fixed total or computed
  const decimalsArray = insights.map((c) => c.amount / (c.amount * 4)); // just a dummy math to make it look like donut parts
  const decimals = useSharedValue(decimalsArray);
  const colors = insights.map((c) => c.color);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [reportPressed, setReportPressed] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "black" }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{ height: 280, justifyContent: "center", alignItems: "center" }}
      >
        <View style={{ width: 220, height: 220, position: "relative" }}>
          <DonutChart
            colors={colors}
            data={chartData}
            decimals={decimals}
            gap={0.03}
            radius={110}
            strokeWidth={14}
            outerStrokeWidth={20}
            selectedIndex={selectedIndex}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography bold fontSize={sizes.lg} txtWhite>
              {selectedIndex !== null
                ? (decimalsArray[selectedIndex] * 100).toFixed(0)
                : 25}
              %
            </Typography>
          </View>
        </View>
      </View>

      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <Typography
          fontSize={sizes.sm}
          customStyles={{
            color: globalStyles.subtitle,
            textTransform: "uppercase",
          }}
        >
          TOTAL SPENT{" "}
          <Typography
            bold
            fontSize={sizes.md}
            customStyles={{ color: theme.t100 }}
          >
            {totalAmount} $
          </Typography>
        </Typography>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Typography
          fontSize={sizes.sm}
          customStyles={{ color: globalStyles.subtitle }}
        >
          SPENDING BY CATEGORY
        </Typography>

        <Pressable
          onPressIn={() => setReportPressed(true)}
          onPressOut={() => setReportPressed(false)}
          onPress={() => console.log("Report Generated")}
          style={[
            styles.reportBtn,
            { backgroundColor: reportPressed ? theme.t20 : "transparent" },
          ]}
        >
          <Typography
            fontSize={sizes.sm}
            customStyles={{ color: theme.t100, marginRight: 6 }}
          >
            Generate report
          </Typography>
          <View
            style={{
              backgroundColor: `${theme.t20}80`,
              padding: 4,
              borderRadius: 6,
            }}
          >
            <Icon
              name="document-text"
              library="Ionicons"
              color={theme.t100}
              size={sizes.md}
            />
          </View>
        </Pressable>
      </View>

      <View>
        {insights.map((ins, index) => (
          <SpendingCategoryCard
            key={ins.id}
            index={index}
            title={ins.title}
            amount={ins.amount}
            limit={ins.limit}
            color={ins.color}
            iconName={ins.icon}
            library={ins.library}
            selected={selectedIndex}
            approachingLimit={ins.approachingLimit}
            onPress={(i) => setSelectedIndex(i === selectedIndex ? null : i)}
          />
        ))}
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  reportBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
