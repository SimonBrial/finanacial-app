import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  UIManager,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Picker } from "react-native-wheel-pick";
import Constants, { ExecutionEnvironment } from "expo-constants";
import Typography from "./typography";
import Button from "./button-own";
import useTheme from "../../hooks/useTheme";

// Detect if we should use the JS fallback picker to avoid WheelCurvedPicker crashes in Expo Go
const useFallbackPicker = (() => {
  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    return true;
  }
  if (Platform.OS === "android") {
    return UIManager.getViewManagerConfig("WheelCurvedPicker") == null;
  }
  return false;
})();

interface TimePickerModalProps {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  onTimeSelected: (time: string) => void;
  initialTime?: string; // Expects "hh:mm A"
}

// Custom JS Wheel Picker Fallback for Expo Go / unlinked environments
interface JSWheelPickerProps {
  pickerData: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  textColor?: string;
  selectTextColor?: string;
}

const ITEM_HEIGHT = 44;

function JSWheelPicker({
  pickerData,
  selectedValue,
  onValueChange,
  textColor = "#8E8E93",
  selectTextColor = "#FFFFFF",
}: JSWheelPickerProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const selectedIndex = pickerData.indexOf(selectedValue);

  // Pad the array with empty elements at the top and bottom to center the items
  const paddedData = useMemo(() => ["", ...pickerData, ""], [pickerData]);

  // Adjust scroll position when selectedValue changes externally
  useEffect(() => {
    if (selectedIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: selectedIndex * ITEM_HEIGHT,
        animated: true,
      });
    }
  }, [selectedIndex]);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const safeIndex = Math.max(0, Math.min(index, pickerData.length - 1));
    const value = pickerData[safeIndex];
    if (value && value !== selectedValue) {
      onValueChange(value);
    }
  };

  return (
    <View style={jsStyles.container}>
      {/* Selected item highlight indicator overlay */}
      <View style={jsStyles.highlight} pointerEvents="none" />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingVertical: 0 }}
      >
        {paddedData.map((item, index) => {
          const isPlaceholder = item === "";
          const isSelected = index - 1 === selectedIndex;
          return (
            <View key={index} style={jsStyles.item}>
              {!isPlaceholder && (
                <Typography
                  bold={isSelected}
                  customStyles={{
                    color: isSelected ? selectTextColor : textColor,
                    fontSize: isSelected ? 22 : 18,
                  }}
                >
                  {item}
                </Typography>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default function TimePickerModal({
  sheetRef,
  onTimeSelected,
  initialTime = "12:00 AM",
}: TimePickerModalProps) {
  const { theme } = useTheme();

  const [selectedHour, setSelectedHour] = useState<string>("12");
  const [selectedMinute, setSelectedMinute] = useState<string>("00");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("AM");

  const snapPoints = useMemo(() => ["45%"], []);

  // 1. Data Ranges (strings)
  const hours = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1)),
    [],
  );
  const minutes = useMemo(
    () => Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")),
    [],
  );
  const periods = useMemo(() => ["AM", "PM"], []);

  // 2. Mount & Update Hook: Detect initialTime or system time and initialize wheels
  useEffect(() => {
    let hourStr = "12";
    let minuteStr = "00";
    let periodStr = "AM";

    if (initialTime) {
      const match = initialTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (match) {
        // Convert to single-digit hours for matching picker values
        hourStr = parseInt(match[1], 10).toString();
        minuteStr = match[2];
        periodStr = match[3].toUpperCase();
      }
    } else {
      const now = new Date();
      let hoursVal = now.getHours();
      const minutesVal = now.getMinutes();
      periodStr = hoursVal >= 12 ? "PM" : "AM";
      hoursVal = hoursVal % 12;
      hoursVal = hoursVal ? hoursVal : 12; // '0' becomes '12'
      hourStr = hoursVal.toString();
      minuteStr = minutesVal.toString().padStart(2, "0");
    }

    setSelectedHour(hourStr);
    setSelectedMinute(minuteStr);
    setSelectedPeriod(periodStr);
  }, [initialTime]);

  const handleHourChange = (hour: string) => {
    setSelectedHour(hour);
  };

  const handleMinuteChange = (minute: string) => {
    setSelectedMinute(minute);
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleSave = () => {
    // Pad the hour to two digits to maintain compatibility with the app's expectations
    const formattedHour = selectedHour.padStart(2, "0");
    const formattedTime = `${formattedHour}:${selectedMinute} ${selectedPeriod}`;
    onTimeSelected(formattedTime);
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

  const renderPicker = (
    selectedValue: string,
    pickerData: string[],
    onValueChange: (val: string) => void,
  ) => {
    if (useFallbackPicker) {
      return (
        <JSWheelPicker
          pickerData={pickerData}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          textColor="#8E8E93"
          selectTextColor="#FFFFFF"
        />
      );
    }

    return (
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        pickerData={pickerData}
        onValueChange={onValueChange}
        textColor="#8E8E93"
        selectTextColor="#FFFFFF"
        textSize={22}
        itemStyle={styles.iosItemStyle}
      />
    );
  };

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "#1C1C1E" }} // Dark background
      handleIndicatorStyle={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      enableContentPanningGesture={false}
    >
      <BottomSheetView style={styles.container}>
        <Typography bold txtWhite fontSize={18} customStyles={styles.title}>
          Select Time
        </Typography>

        <View style={styles.pickerRow}>
          {/* Hour Column */}
          <View style={styles.column}>
            {renderPicker(selectedHour, hours, handleHourChange)}
          </View>

          {/* Minute Column */}
          <View style={styles.column}>
            {renderPicker(selectedMinute, minutes, handleMinuteChange)}
          </View>

          {/* Period Column */}
          <View style={styles.column}>
            {renderPicker(selectedPeriod, periods, handlePeriodChange)}
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsContainer}>
          <Button
            text="Confirm"
            type="filled"
            fullWidth
            color={theme.t100}
            onPress={handleSave}
            containerStyle={{ height: 46 }}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const jsStyles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * 3,
    width: "100%",
    position: "relative",
    justifyContent: "center",
  },
  highlight: {
    position: "absolute",
    left: 4,
    right: 4,
    height: ITEM_HEIGHT,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    top: ITEM_HEIGHT,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
    flex: 1,
  },
  title: {
    marginBottom: 16,
  },
  pickerRow: {
    flexDirection: "row",
    height: 180,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  column: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  picker: {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
  },
  iosItemStyle: {
    color: "#FFFFFF",
    fontSize: 22,
  },
  actionsContainer: {
    width: "100%",
    marginTop: 20,
  },
});
