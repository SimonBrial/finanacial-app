import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Typography from "./typography";
import ModalItems from "../modal-items";
import useTheme from "../../hooks/useTheme";

interface BottomSheetItem {
  title: string;
  name: string;
  library: any;
  description: string;
  onPress: () => void;
  color?: string;
}

interface GenericBottomSheetModalProps {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  title: string;
  items: BottomSheetItem[];
  snapPoints?: string[];
  onChange?: (index: number) => void;
}

export default function GenericBottomSheetModal({
  sheetRef,
  title,
  items,
  snapPoints = ["50%", "75%"],
  onChange,
}: GenericBottomSheetModalProps) {
  const { sizes } = useTheme();

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

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={onChange}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.indicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Typography
          fontSize={sizes.lg}
          txtWhite
          bold
          customStyles={styles.title}
        >
          {title}
        </Typography>
        {items.map((item, index) => (
          <ModalItems
            key={index}
            name={item.name}
            library={item.library}
            title={item.title}
            description={item.description}
            variant={"light"}
            color={item.color}
            onPress={() => {
              sheetRef.current?.dismiss();
              item.onPress();
            }}
          />
        ))}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#100F14",
  },
  indicator: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
  title: {
    paddingBottom: 10,
  },
});
