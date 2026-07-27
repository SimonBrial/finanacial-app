import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTransactionStore } from "../../stores/useTransactionStore";
import useTheme from "../../hooks/useTheme";
import Typography from "../../components/ui/typography";
import Icon from "../../components/ui/icon";
import Badge from "../../components/ui/badge";
import CustomBadge from "../../components/ui/custom-badge";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import PayoneerIcon from "../../components/icons/payoneer-icon";
import PaypalIcon from "../../components/icons/paypal-icon";
import { darkenHexColor } from "../../utils/darkenHexColor";
import CustomMap from "../../components/ui/custom-map";
import { useCallback, useRef, useState, useMemo } from "react";
import LocationBottomSheet from "../../components/features/transactions/LocationBottomSheet";
import * as Location from "expo-location";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import ModalItems from "../../components/modal-items";
import Button from "../../components/ui/button-own";

const modalItems: {
  name: string;
  library: any;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    title: "Share",
    name: "share-social",
    library: "Ionicons",
    description: "Share this transaction",
    color: "white",
  },
  {
    title: "Edit",
    name: "edit",
    library: "MaterialIcons",
    description: "Edit this transaction",
    color: "#c24105",
  },
  {
    title: "Delete",
    name: "delete",
    library: "MaterialCommunityIcons",
    description: "Delete this transaction",
    color: "#df1d31ff",
  },
];

export default function TransactionDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { transactions } = useTransactionStore();
  const { sizes, globalStyles, theme } = useTheme();

  const transaction = transactions.find((t) => t.id === id);
  const {
    updateTransactionLocation,
    removeTransactionLocation,
    deleteTransaction,
  } = useTransactionStore();

  type ModalType = "actions" | "addLocation" | "editLocation";
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const locationSheetRef = useRef<BottomSheetModal>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);
    bottomSheetModalRef.current?.present();
  };

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    openModal("actions");
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const snapPoints = useMemo(() => {
    if (modalType === "actions") return ["50%", "75%"];
    return ["40%"];
  }, [modalType]);

  const handleUseCurrentLocation = async () => {
    bottomSheetModalRef.current?.dismiss();
    setIsLoadingLocation(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setIsLoadingLocation(false);
      Alert.alert(
        "Permission Denied",
        "Permission to access location was denied. Please enable it in your phone settings.",
      );
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      updateTransactionLocation(
        id as string,
        location.coords.latitude,
        location.coords.longitude,
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Could not get current location. Please make sure location services are enabled.",
      );
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleDeleteLocation = () => {
    bottomSheetModalRef.current?.dismiss();
    removeTransactionLocation(id as string);
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.6} // Ajusta el nivel de oscuridad (0.0 a 1.0)
      />
    ),
    [],
  );

  if (!transaction) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography txtWhite>Transaction not found</Typography>
        <Button
          text="Go Back"
          type="light"
          color={theme.t100}
          onPress={() => router.back()}
          containerStyle={{ marginTop: 20 }}
        />
      </View>
    );
  }

  const transactionDate = dayjs(transaction.date).format("MMM DD, YYYY");
  const transactionTime = dayjs(transaction.date).format("hh:mm A");

  // Mock receipt data
  const hasReceipt = false;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingHorizontal: sizes.md,
        paddingTop: 60,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: sizes.xxxl,
        }}
      >
        <Button
          iconLeft="chevron-back"
          library="Ionicons"
          type="ghost"
          size="lg"
          color="white"
          onPress={() => router.back()}
          padding={10}
        />
        <Typography fontSize={sizes.lg} txtWhite>
          Transaction Details
        </Typography>
        <Button
          iconLeft="dots-vertical"
          library="MaterialCommunityIcons"
          type="light"
          size="lg"
          color="white"
          onPress={handlePresentModalPress}
          padding={10}
        />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon & Title & Amount */}
        <View style={{ alignItems: "center", marginBottom: sizes.xl }}>
          {transaction.bank === "payoneer" ? (
            <View style={{ marginBottom: sizes.md }}>
              <PayoneerIcon size={100} />
            </View>
          ) : transaction.bank === "paypal" ? (
            <View style={{ marginBottom: sizes.md }}>
              <PaypalIcon size={100} />
            </View>
          ) : (
            <LinearGradient
              colors={[
                transaction.color,
                darkenHexColor(transaction.color, 30),
              ]}
              style={{
                width: 100,
                height: 100,
                borderRadius: sizes.md,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: sizes.md,
                borderWidth: 1,
                borderColor: "transparent",
              }}
            >
              <Icon
                name={transaction.icon}
                library={transaction.library}
                color="white"
                size={50}
                variant="light"
              />
            </LinearGradient>
          )}
          <Typography fontSize={sizes.xl} txtWhite>
            {transaction.title}
          </Typography>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: sizes.xs,
            }}
          >
            <Typography fontSize={36} bold txtWhite>
              {transaction.amount.toFixed(2)}
            </Typography>
            <Typography
              fontSize={sizes.sm}
              txtWhite
              customStyles={{
                marginLeft: sizes.xs,
                fontWeight: "bold",
              }}
            >
              VES
            </Typography>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.card}>
          <DetailRow
            label="Type"
            value={
              <Badge
                text={transaction.type === "income" ? "Income" : "Expense"}
                type="ghost"
                color={transaction.type === "income" ? "#00C851" : "#df1d31"}
                iconLeft={
                  transaction.type === "income"
                    ? "arrow-up-circle-outline"
                    : "arrow-down-circle-outline"
                }
                library="Ionicons"
                size="md"
              />
            }
          />
          <DetailRow
            label="Date"
            value={<Typography txtWhite>{transactionDate}</Typography>}
          />
          <DetailRow
            label="Time"
            value={<Typography txtWhite>{transactionTime}</Typography>}
          />
          <DetailRow
            label="Payment Method"
            value={<CustomBadge bankName={transaction.bank} size="md" />}
          />
          <DetailRow
            label="Category"
            value={
              <Badge
                text={transaction.category}
                type="ghost"
                color={globalStyles.subtitle}
                size="md"
              />
            }
          />
        </View>

        {/* Location Section */}
        <View style={{ marginTop: sizes.xl, marginBottom: sizes.md }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: sizes.md,
              paddingHorizontal: 10,
            }}
          >
            <Typography
              fontSize={sizes.md}
              customStyles={{ color: globalStyles.subtitle, letterSpacing: 1 }}
            >
              LOCATION
            </Typography>
            {transaction.locationSave && (
              <Pressable
                onPress={() => openModal("editLocation")}
                disabled={isLoadingLocation}
                style={{
                  marginLeft: 10,
                  opacity: isLoadingLocation ? 0.3 : 1,
                }}
              >
                <Icon
                  name="pencil"
                  library="MaterialCommunityIcons"
                  size={28}
                  color={"white"}
                  variant="light"
                />
              </Pressable>
            )}
          </View>

          {isLoadingLocation ? (
            <View
              style={{
                borderRadius: sizes.md,
                height: 200,
                backgroundColor: "rgba(255,255,255,0.05)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.1)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={theme.t100} />
              <Typography txtWhite customStyles={{ marginTop: 10 }}>
                Getting location...
              </Typography>
            </View>
          ) : transaction.locationSave ? (
            <View
              style={{
                borderRadius: sizes.md,
                overflow: "hidden",
                height: 200,
                position: "relative",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              {transaction.latitude && transaction.longitude ? (
                <CustomMap
                  latitude={transaction.latitude}
                  longitude={transaction.longitude}
                  title={transaction.title}
                  themeType="dark"
                  interactive={true}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#2A2A2A",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="map-outline"
                    library="Ionicons"
                    size={40}
                    color={globalStyles.subtitle}
                  />
                  <Typography
                    customStyles={{
                      color: globalStyles.subtitle,
                      marginTop: 8,
                    }}
                  >
                    [Location Not Found]
                  </Typography>
                </View>
              )}
              <Pressable
                style={styles.viewMapButton}
                onPress={() => setIsMapFullscreen(true)}
              >
                <Icon
                  name="fullscreen"
                  library="MaterialIcons"
                  size={28}
                  color="white"
                  variant="light"
                />
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={styles.addLocationBox}
              onPress={() => locationSheetRef.current?.present()}
            >
              <Icon
                name="add"
                library="Ionicons"
                size={36}
                color="white"
                variant="light"
              />
              <Typography txtWhite customStyles={{ marginLeft: sizes.sm }}>
                Add location
              </Typography>
            </Pressable>
          )}
        </View>

        {/* Actions List */}
        <View style={{ gap: sizes.sm }}>
          <Pressable
            style={styles.actionButton}
            onPress={() => router.push("/transaction/description")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="reorder-three"
                library="Ionicons"
                size={28}
                color="white"
                variant="light"
              />
              <Typography txtWhite customStyles={{ marginLeft: sizes.md }}>
                Add description
              </Typography>
            </View>
            <Icon
              name="chevron-forward"
              library="Ionicons"
              size={24}
              color="white"
              variant="light"
            />
          </Pressable>

          <Pressable style={styles.actionButton}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="reader-outline"
                library="Ionicons"
                size={28}
                color={hasReceipt ? "#00C851" : "white"}
                variant="light"
              />
              <Typography txtWhite customStyles={{ marginLeft: sizes.md }}>
                {hasReceipt ? "Receipt Attached" : "Attach Receipt"}
              </Typography>
            </View>
            <Icon
              name={hasReceipt ? "checkmark" : "add"}
              library="Ionicons"
              size={24}
              color="white"
              variant="light"
            />
          </Pressable>

          <Button
            text="Report Issue"
            iconLeft="warning-outline"
            library="Ionicons"
            type="ghost"
            color="#dc3545"
            fullWidth
            containerStyle={{
              marginTop: sizes.md,
              borderWidth: 1,
              borderColor: "rgba(220, 53, 69, 0.3)",
            }}
          />
        </View>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#100F14" }}
        handleIndicatorStyle={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        {modalType === "addLocation" ? (
          <BottomSheetView style={styles.contentContainer}>
            <Typography
              fontSize={sizes.lg}
              txtWhite
              bold
              customStyles={{ paddingBottom: sizes.sm, textAlign: "center" }}
            >
              Add Location
            </Typography>
            <ModalItems
              name="my-location"
              library="MaterialIcons"
              title="Use Current Location"
              description="Get location from GPS"
              variant="light"
              color="white"
              iconSize={28}
              onPress={handleUseCurrentLocation}
            />
            <ModalItems
              name="map"
              library="MaterialIcons"
              title="Add Manually"
              description="Select on map"
              variant="light"
              color="white"
              iconSize={28}
              onPress={() => {
                bottomSheetModalRef.current?.dismiss();
                setIsMapFullscreen(true);
              }}
            />
          </BottomSheetView>
        ) : modalType === "editLocation" ? (
          <BottomSheetView style={styles.contentContainer}>
            <Typography
              fontSize={sizes.lg}
              txtWhite
              bold
              customStyles={{ paddingBottom: sizes.sm, textAlign: "center" }}
            >
              Edit Location
            </Typography>
            <ModalItems
              name="edit"
              library="MaterialIcons"
              title="Edit Address"
              description="Update manual address"
              variant="light"
              color="#c24105"
              iconSize={28}
              onPress={() => {
                bottomSheetModalRef.current?.dismiss();
                setIsMapFullscreen(true);
              }}
            />
            <ModalItems
              name="delete"
              library="MaterialIcons"
              title="Remove Address"
              description="Delete saved location"
              variant="light"
              color="#df1d31ff"
              iconSize={28}
              onPress={handleDeleteLocation}
            />
          </BottomSheetView>
        ) : (
          <BottomSheetView style={styles.contentContainer}>
            <Typography
              fontSize={sizes.lg}
              txtWhite
              bold
              customStyles={{
                paddingBottom: sizes.sm,
                textAlign: "center",
              }}
            >
              What would you like to do with this transaction?
            </Typography>
            {modalItems.map((item, index) => (
              <ModalItems
                key={index}
                name={item.name}
                library={item.library}
                title={item.title}
                description={item.description}
                variant="light"
                color={item.color}
                iconSize={28}
                onPress={() => {
                  bottomSheetModalRef.current?.dismiss();
                  if (item.title === "Delete") {
                    Alert.alert(
                      "Delete Transaction",
                      "Are you sure you want to delete this transaction?",
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => {
                            deleteTransaction(id as string);
                            router.back();
                          },
                        },
                      ],
                    );
                  } else if (item.title === "Edit") {
                    router.push(`/transaction/form?type=transaction&id=${id}`);
                  }
                }}
              />
            ))}
          </BottomSheetView>
        )}
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
          <View
            style={{
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
            }}
          >
            <Icon
              name="search"
              library="Ionicons"
              size={20}
              color="#888"
              variant="light"
            />
            <TextInput
              placeholder="Search address or place..."
              placeholderTextColor="#888"
              style={{ flex: 1, marginLeft: 10, color: "white", fontSize: 16 }}
            />
          </View>

          <CustomMap
            latitude={transaction.latitude || 37.78825} // Fallback coords if new
            longitude={transaction.longitude || -122.4324}
            title={transaction.title}
            themeType="dark"
            interactive={true}
            height={100} // This will trigger flex: 1 in CustomMap now
          />

          {/* Bottom Actions Overlay */}
          <View
            style={{
              position: "absolute",
              bottom: 40,
              left: 20,
              right: 20,
              zIndex: 100,
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 15,
            }}
          >
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
                Alert.alert(
                  "Location Saved",
                  "The new address has been updated successfully.",
                );
              }}
              containerStyle={{ flex: 1 }}
            />
          </View>
        </View>
      </Modal>
      <LocationBottomSheet
        sheetRef={locationSheetRef}
        onLocationSelected={(lat, lng) => {
          updateTransactionLocation(id as string, lat, lng);
        }}
      />
    </View>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
      }}
    >
      <Typography customStyles={{ color: "#888888" }}>{label}</Typography>
      <View>{value}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 8,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  addLocationBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  viewMapButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 6,
    borderRadius: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
});
