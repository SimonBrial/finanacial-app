import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Typography from "../ui/typography";
import Icon from "../ui/icon";
import Button from "../ui/button";
import CustomMap from "../ui/custom-map";
import useTheme from "../../hook/useTheme";

interface LocationBottomSheetProps {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  onLocationSelected: (latitude: number, longitude: number, address?: string) => void;
  title?: string;
}

export default function LocationBottomSheet({
  sheetRef,
  onLocationSelected,
  title = "Location",
}: LocationBottomSheetProps) {
  const { sizes, globalStyles, theme } = useTheme();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  // Default coords to center on map if no location exists
  const [tempLat, setTempLat] = useState(37.78825);
  const [tempLng, setTempLng] = useState(-122.4324);

  const snapPoints = useMemo(() => ["35%"], []);

  const handleUseCurrentLocation = async () => {
    sheetRef.current?.dismiss();
    setIsLoadingLocation(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setIsLoadingLocation(false);
      Alert.alert(
        "Permission Denied",
        "Permission to access location was denied. Please enable it in your phone settings."
      );
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      onLocationSelected(location.coords.latitude, location.coords.longitude);
      Alert.alert("Success", "Location updated successfully.");
    } catch (error) {
      Alert.alert(
        "Error",
        "Could not get current location. Please make sure location services are enabled."
      );
    } finally {
      setIsLoadingLocation(false);
    }
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
    <>
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

          <Pressable
            style={styles.modalItem}
            onPress={handleUseCurrentLocation}
            disabled={isLoadingLocation}
          >
            <View style={[styles.iconWrapper, { backgroundColor: "rgba(255,255,255,0.05)" }]}>
              {isLoadingLocation ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Icon name="my-location" library="MaterialIcons" size={24} color="white" />
              )}
            </View>
            <View style={styles.textWrapper}>
              <Typography txtWhite bold>Use Current Location</Typography>
              <Typography customStyles={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                Get location from GPS
              </Typography>
            </View>
          </Pressable>

          <Pressable
            style={styles.modalItem}
            onPress={() => {
              sheetRef.current?.dismiss();
              setIsMapFullscreen(true);
            }}
          >
            <View style={[styles.iconWrapper, { backgroundColor: "rgba(255,255,255,0.05)" }]}>
              <Icon name="map" library="MaterialIcons" size={24} color="white" />
            </View>
            <View style={styles.textWrapper}>
              <Typography txtWhite bold>Add Manually</Typography>
              <Typography customStyles={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                Select on map
              </Typography>
            </View>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>

      {/* Fullscreen Map Modal */}
      <Modal
        visible={isMapFullscreen}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsMapFullscreen(false)}
      >
        <View style={{ flex: 1, backgroundColor: "#100F14" }}>
          {/* Search Bar Overlay */}
          <View style={styles.searchBarContainer}>
            <Icon name="search" library="Ionicons" size={20} color="#888" variant="light" />
            <TextInput
              placeholder="Search address or place..."
              placeholderTextColor="#888"
              style={{ flex: 1, marginLeft: 10, color: "white", fontSize: 16 }}
            />
          </View>

          <CustomMap
            latitude={tempLat}
            longitude={tempLng}
            title="Selected Location"
            themeType="dark"
            interactive={true}
            height={100}
            onLocationSelect={(lat, lng) => {
              setTempLat(lat);
              setTempLng(lng);
            }}
          />

          {/* Bottom Actions Overlay */}
          <View style={styles.mapActionsContainer}>
            <Button
              text="Cancel"
              type="ghost"
              iconLeft="close"
              library="MaterialCommunityIcons"
              onPress={() => setIsMapFullscreen(false)}
              containerStyle={{
                flex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgb(255, 255, 255)",
                borderWidth: 1,
              }}
              color="white"
            />
            <Button
              text="Save Location"
              type="filled"
              iconLeft="save-alt"
              library="MaterialIcons"
              color={theme.t100}
              onPress={() => {
                setIsMapFullscreen(false);
                onLocationSelected(tempLat, tempLng);
              }}
              containerStyle={{ flex: 1 }}
            />
          </View>
        </View>
      </Modal>
    </>
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
  searchBarContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30,30,30,0.9)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  mapActionsContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    zIndex: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
});
