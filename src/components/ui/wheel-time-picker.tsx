import React, { useState, useEffect } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Picker } from "react-native-wheel-pick";

interface WheelTimePickerProps {
  /**
   * Callback fired on every change, returning the current formatted time (e.g., "10:05 PM").
   */
  onTimeChange?: (timeString: string) => void;
  /**
   * Optional custom styling for the outer container.
   */
  containerStyle?: StyleProp<ViewStyle>;
}

export default function WheelTimePicker({
  onTimeChange,
  containerStyle,
}: WheelTimePickerProps) {
  // 1. Data Structures (Arrays of strings)
  const hoursData = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutesData = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const periodsData = ["AM", "PM"];

  // 2. States for the three columns
  const [selectedHour, setSelectedHour] = useState<string>("12");
  const [selectedMinute, setSelectedMinute] = useState<string>("00");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("AM");

  // 3. Integrating helper function to emit the time string
  const triggerTimeChange = (hour: string, minute: string, period: string) => {
    if (onTimeChange) {
      onTimeChange(`${hour}:${minute} ${period}`);
    }
  };

  // 4. Mount Hook: Detect current system time and initialize wheels
  useEffect(() => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' becomes '12'

    const hourStr = hours.toString();
    const minuteStr = minutes.toString().padStart(2, "0");

    setSelectedHour(hourStr);
    setSelectedMinute(minuteStr);
    setSelectedPeriod(ampm);

    // Emit initial time immediately on mount
    triggerTimeChange(hourStr, minuteStr, ampm);
  }, []);

  // 5. Independent event handlers to update state and trigger changes without delay/lag
  const handleHourChange = (hour: string) => {
    setSelectedHour(hour);
    triggerTimeChange(hour, selectedMinute, selectedPeriod);
  };

  const handleMinuteChange = (minute: string) => {
    setSelectedMinute(minute);
    triggerTimeChange(selectedHour, minute, selectedPeriod);
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    triggerTimeChange(selectedHour, selectedMinute, period);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Hours Column */}
      <View style={styles.column}>
        <Picker
          style={styles.picker}
          selectedValue={selectedHour}
          pickerData={hoursData}
          onValueChange={handleHourChange}
          textColor="#8E8E93" // Unselected text (Android)
          selectTextColor="#FFFFFF" // Selected text (Android)
          textSize={22} // Text size (Android)
          itemStyle={styles.iosItemStyle} // Styling (iOS)
        />
      </View>

      {/* Minutes Column */}
      <View style={styles.column}>
        <Picker
          style={styles.picker}
          selectedValue={selectedMinute}
          pickerData={minutesData}
          onValueChange={handleMinuteChange}
          textColor="#8E8E93" // Unselected text (Android)
          selectTextColor="#FFFFFF" // Selected text (Android)
          textSize={22} // Text size (Android)
          itemStyle={styles.iosItemStyle} // Styling (iOS)
        />
      </View>

      {/* Period Column (AM/PM) */}
      <View style={styles.column}>
        <Picker
          style={styles.picker}
          selectedValue={selectedPeriod}
          pickerData={periodsData}
          onValueChange={handlePeriodChange}
          textColor="#8E8E93" // Unselected text (Android)
          selectTextColor="#FFFFFF" // Selected text (Android)
          textSize={22} // Text size (Android)
          itemStyle={styles.iosItemStyle} // Styling (iOS)
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1C1C1E", // Dark iOS/Android mirror background
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  column: {
    flex: 1, // Ensures each column occupies the exact same proportional space
    height: 180,
    justifyContent: "center",
  },
  picker: {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
  },
  iosItemStyle: {
    color: "#FFFFFF", // Selected text white color (iOS)
    fontSize: 22, // Size matching Android
  },
});
