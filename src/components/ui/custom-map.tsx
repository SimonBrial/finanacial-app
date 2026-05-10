import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import useTheme from "../../hook/useTheme";

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

interface CustomMapProps {
  latitude: number;
  longitude: number;
  title?: string;
  themeType?: "dark" | "light";
  interactive?: boolean;
  height?: number;
}

export default function CustomMap({
  latitude,
  longitude,
  title = "Location",
  themeType = "dark",
  interactive = true,
  height = 200,
}: CustomMapProps) {
  const { theme, sizes } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: sizes.md,
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          overflow: "hidden",
          height: height === 100 ? "100%" : height,
          flex: height === 100 ? 1 : undefined,
        },
      ]}
    >
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        scrollEnabled={interactive}
        zoomEnabled={interactive}
        pitchEnabled={interactive}
        rotateEnabled={interactive}
        userInterfaceStyle={themeType} // Para iOS
        customMapStyle={themeType === "dark" ? darkMapStyle : []} // Para Android/Google Maps
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={title}
          pinColor={theme.t100}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    backgroundColor: "#100F14",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
