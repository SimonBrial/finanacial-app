import React, { useState, useMemo, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import dayjs from "dayjs";
import Typography from "./typography";
import Icon from "./icon";
import Button from "./button";
import useTheme from "../../hooks/useTheme";

interface CalendarModalProps {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  onDateSelected: (date: string) => void;
  initialDate?: string; // Expects "YYYY-MM-DD"
}

export default function CalendarModal({
  sheetRef,
  onDateSelected,
  initialDate,
}: CalendarModalProps) {
  const { sizes, theme } = useTheme();

  // Standardize the initial date or default to today
  const defaultDate = useMemo(() => {
    return initialDate && dayjs(initialDate).isValid()
      ? dayjs(initialDate)
      : dayjs();
  }, [initialDate]);

  const [currentMonth, setCurrentMonth] = useState(
    defaultDate.startOf("month"),
  );
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const snapPoints = useMemo(() => ["65%"], []);

  // Compute days in the current month grid
  const gridDays = useMemo(() => {
    const startDayOfWeek = currentMonth.day(); // 0 (Sun) to 6 (Sat)
    const daysInMonth = currentMonth.daysInMonth();

    const days = [];
    // Padding for days of previous month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    // Days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(currentMonth.date(i));
    }
    return days;
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev.add(1, "month"));
  };

  const handleDatePress = (day: dayjs.Dayjs) => {
    setSelectedDate(day);
  };

  const handleConfirm = () => {
    onDateSelected(selectedDate.format("YYYY-MM-DD"));
    sheetRef.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.6}
      />
    ),
    [],
  );

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "#100F14" }}
      handleIndicatorStyle={{ backgroundColor: "rgba(255,255,255,0.5)" }}
    >
      <BottomSheetView style={styles.container}>
        {/* Month & Year Header Selector */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handlePrevMonth}
            style={styles.arrowButton}
          >
            <Icon
              name="chevron-back"
              library="Ionicons"
              size={24}
              color="#fff"
              variant="light"
            />
          </TouchableOpacity>
          <Typography bold txtWhite fontSize={18}>
            {currentMonth.format("MMMM YYYY")}
          </Typography>
          <TouchableOpacity
            onPress={handleNextMonth}
            style={styles.arrowButton}
          >
            <Icon
              name="chevron-forward"
              library="Ionicons"
              size={24}
              color="#fff"
              variant="light"
            />
          </TouchableOpacity>
        </View>

        {/* Weekday Titles */}
        <View style={styles.weekdaysContainer}>
          {weekdays.map((day) => (
            <Typography key={day} customStyles={styles.weekdayText}>
              {day}
            </Typography>
          ))}
        </View>

        {/* Days Grid */}
        <View style={styles.grid}>
          {gridDays.map((day, index) => {
            if (day === null) {
              return <View key={`empty-${index}`} style={styles.dayCell} />;
            }

            const isSelected = selectedDate.isSame(day, "day");
            const isToday = dayjs().isSame(day, "day");

            return (
              <Pressable
                key={day.toString()}
                style={styles.dayCell}
                onPress={() => handleDatePress(day)}
              >
                <View
                  style={[
                    styles.dayCircle,
                    isSelected && {
                      backgroundColor: theme.t100,
                      borderRadius: 8,
                    },
                  ]}
                >
                  <Typography
                    bold={isSelected}
                    customStyles={[
                      styles.dayText,
                      isSelected && styles.selectedDayText,
                      isToday && !isSelected && { color: theme.t100 },
                    ]}
                  >
                    {day.date()}
                  </Typography>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Confirm Button */}
        <View style={styles.actionsContainer}>
          <Button
            text="Confirm"
            type="filled"
            fullWidth
            color={theme.t100}
            onPress={handleConfirm}
            containerStyle={{ height: 46 }}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  arrowButton: {
    padding: 8,
  },
  weekdaysContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weekdayText: {
    width: `${100 / 7}%`,
    textAlign: "center",
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  dayCell: {
    width: `${100 / 7}%`,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDayCircle: {
    backgroundColor: "#FF4500", // Vibrant orange selector matching design image
  },
  dayText: {
    color: "#fff",
    fontSize: 15,
  },
  selectedDayText: {
    color: "#FFFFFF",
  },
  todayText: {
    //color: "#FF4500",
    fontWeight: "bold",
  },
  actionsContainer: {
    width: "100%",
    marginTop: 20,
  },
});
