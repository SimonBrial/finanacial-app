import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Typography from "../../ui/typography";
import Icon from "../../ui/icon";
import useTheme from "../../../hooks/useTheme";

interface ReceiptBottomSheetProps {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  onReceiptSelected: (uri: string) => void;
  title?: string;
}

export default function ReceiptBottomSheet({
  sheetRef,
  onReceiptSelected,
  title = "Attach Receipt",
}: ReceiptBottomSheetProps) {
  const { sizes } = useTheme();

  const snapPoints = useMemo(() => ["35%"], []);

  const handleTakePhoto = () => {
    sheetRef.current?.dismiss();
    // Simulate photo taking
    Alert.alert("Camera", "Photo capture simulated.", [
      {
        text: "OK",
        onPress: () => onReceiptSelected("mock-uri-from-camera.jpg"),
      },
    ]);
  };

  const handleChooseFromGallery = () => {
    sheetRef.current?.dismiss();
    // Simulate gallery pick
    Alert.alert("Gallery", "Gallery selection simulated.", [
      {
        text: "OK",
        onPress: () => onReceiptSelected("mock-uri-from-gallery.jpg"),
      },
    ]);
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
    []
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "#100F14" }}
      handleIndicatorStyle={{ backgroundColor: "rgba(255,255,255,0.5)" }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Typography
          fontSize={sizes.lg}
          txtWhite
          bold
          customStyles={{ paddingBottom: sizes.sm, textAlign: "center" }}
        >
          {title}
        </Typography>

        <Pressable style={styles.modalItem} onPress={handleTakePhoto}>
          <View style={[styles.iconWrapper, { backgroundColor: "rgba(255,255,255,0.05)" }]}>
            <Icon name="camera" library="Ionicons" size={24} color="white" />
          </View>
          <View style={styles.textWrapper}>
            <Typography txtWhite bold>Take Photo</Typography>
            <Typography customStyles={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
              Use camera to snap a receipt
            </Typography>
          </View>
        </Pressable>

        <Pressable style={styles.modalItem} onPress={handleChooseFromGallery}>
          <View style={[styles.iconWrapper, { backgroundColor: "rgba(255,255,255,0.05)" }]}>
            <Icon name="image" library="Ionicons" size={24} color="white" />
          </View>
          <View style={styles.textWrapper}>
            <Typography txtWhite bold>Choose from Gallery</Typography>
            <Typography customStyles={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
              Select a receipt photo from gallery
            </Typography>
          </View>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    gap: 12,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
});
