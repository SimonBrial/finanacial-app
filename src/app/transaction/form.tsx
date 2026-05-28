import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { Dropdown } from "react-native-element-dropdown";
import useTheme from "../../hook/useTheme";
import Typography from "../../components/ui/typography";
import Button from "../../components/ui/button";
import Icon from "../../components/ui/icon";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useCategoriesStore } from "../../store/useCategoriesStore";
import { Transaction, CategoryCardProps } from "../../interface/interface";
import { banks } from "../../utils/banks";
import categoriesData from "../../utils/categories";
import LocationBottomSheet from "../../components/transactions/LocationBottomSheet";
import ReceiptBottomSheet from "../../components/transactions/ReceiptBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function FormScreen() {
  const router = useRouter();
  const { sizes, globalStyles, theme } = useTheme();
  const params = useLocalSearchParams<{ type?: string; id?: string }>();

  const isEditMode = !!params.id;
  const initialType = params.type === "category" ? "category" : "transaction";

  // State for form type
  const [formType, setFormType] = useState<"transaction" | "category">(
    initialType
  );

  // Zustand Stores
  const { transactions, addTransaction, editTransaction } = useTransactionStore();
  const { categories, addCategory, editCategory } = useCategoriesStore();

  // Bottom Sheet Refs
  const locationSheetRef = useRef<BottomSheetModal>(null);
  const receiptSheetRef = useRef<BottomSheetModal>(null);

  // -----------------------------------------
  // TRANSACTION FORM STATE
  // -----------------------------------------
  const [txTitle, setTxTitle] = useState("");
  const [txAmount, setTxAmount] = useState("");
  const [txType, setTxType] = useState<"income" | "expense">("expense");
  const [txCategory, setTxCategory] = useState<string>("");
  const [txBank, setTxBank] = useState<string>("mercantil");
  
  // Date & Time Defaults
  const [txDate, setTxDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [txTime, setTxTime] = useState(dayjs().format("hh:mm A"));
  
  // Tooltip Visibility States
  const [showDateTooltip, setShowDateTooltip] = useState(false);
  const [showTimeTooltip, setShowTimeTooltip] = useState(false);

  // Reusable bottom sheet selections
  const [locationCoords, setLocationCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [attachedReceipt, setAttachedReceipt] = useState<string | null>(null);
  const [txDescription, setTxDescription] = useState("");

  // -----------------------------------------
  // CATEGORY FORM STATE
  // -----------------------------------------
  const [catTitle, setCatTitle] = useState("");
  const [catIcon, setCatIcon] = useState("apps-outline");
  const [catColor, setCatColor] = useState("#FF5733");

  // Load existing data if edit mode
  useEffect(() => {
    if (isEditMode) {
      if (formType === "transaction") {
        const existingTx = transactions.find((t) => t.id === params.id);
        if (existingTx) {
          setTxTitle(existingTx.title);
          setTxAmount(existingTx.amount.toString());
          setTxType(existingTx.type);
          setTxCategory(existingTx.category);
          setTxBank(existingTx.bank);
          if (existingTx.date) {
            setTxDate(dayjs(existingTx.date).format("DD/MM/YYYY"));
            setTxTime(dayjs(existingTx.date).format("hh:mm A"));
          }
          if (existingTx.latitude && existingTx.longitude) {
            setLocationCoords({ latitude: existingTx.latitude, longitude: existingTx.longitude });
          }
        }
      } else {
        const existingCat = categories.find(
          (c) => c.id.toString() === params.id
        );
        if (existingCat) {
          setCatTitle(existingCat.title);
          setCatIcon(existingCat.icon);
          setCatColor(existingCat.color);
        }
      }
    }
  }, [isEditMode, formType, params.id, transactions, categories]);

  // Dropdown lists
  const bankDropdownData = banks.map((b) => ({
    label: b.name,
    value: b.shortName.toLowerCase(),
  }));

  const categoryDropdownData = Array.from(
    new Set(categoriesData.flatMap((cat) => cat.Category))
  ).map((name) => {
    const catObj = categoriesData.find((cat) => cat.Category.includes(name));
    return {
      label: name,
      value: name,
      icon: catObj?.Icon || "apps-outline",
      library: catObj?.Library || "Ionicons",
    };
  });

  const handleSaveTransaction = () => {
    if (!txTitle.trim()) {
      Alert.alert("Required Field", "Transaction Name is required.");
      return;
    }
    if (!txAmount) {
      Alert.alert("Required Field", "Amount is required.");
      return;
    }

    // Default icon/color from category or fallback
    const selectedCat = categoriesData.find((c) => c.Category.includes(txCategory));
    const txIcon = selectedCat?.Icon || "cash";
    const txLib = selectedCat?.Library || "Ionicons";
    const txColorStr = "#3b82f6"; // default base blue

    let parsedDate = new Date().toISOString();
    try {
      const parsed = dayjs(txDate + " " + txTime, "DD/MM/YYYY hh:mm A");
      if (parsed.isValid()) {
        parsedDate = parsed.toISOString();
      } else {
        console.warn("Parsed date is invalid, using current date/time fallback.");
      }
    } catch (e) {
      console.warn("Failed to parse date/time, using current date/time fallback.", e);
    }

    const payload: Omit<Transaction, "id"> = {
      title: txTitle,
      amount: parseFloat(txAmount),
      type: txType,
      category: txCategory || "General",
      icon: txIcon,
      library: txLib as any,
      bank: txBank as any,
      color: txColorStr,
      date: parsedDate,
      locationSave: !!locationCoords,
      ...(locationCoords ? { latitude: locationCoords.latitude, longitude: locationCoords.longitude } : {}),
    };

    if (isEditMode && params.id) {
      editTransaction(params.id, payload);
    } else {
      addTransaction(payload);
    }
    router.back();
  };

  const handleSaveCategory = () => {
    if (!catTitle.trim()) {
      Alert.alert("Required Field", "Please enter a category name");
      return;
    }

    const payload: Omit<CategoryCardProps, "id" | "createdAt"> = {
      title: catTitle,
      icon: catIcon,
      library: "Ionicons",
      share: false,
      color: catColor,
    };

    if (isEditMode && params.id) {
      editCategory(parseInt(params.id), payload);
    } else {
      addCategory(payload);
    }
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: Platform.OS === "ios" ? 60 : 40 }]}>
        <Button
          iconLeft="chevron-back"
          library="Ionicons"
          type="ghost"
          size="lg"
          color="white"
          onPress={() => router.back()}
          padding={10}
        />
        <Typography fontSize={sizes.lg} txtWhite bold>
          {isEditMode ? "Edit" : "New"}{" "}
          {formType === "transaction" ? "Transaction" : "Category"}
        </Typography>
        <View style={{ width: 44 }} /> {/* Spacer */}
      </View>

      {/* Tabs - Only show if not editing */}
      {!isEditMode && (
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              formType === "transaction" && {
                borderBottomColor: theme.t100,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setFormType("transaction")}
          >
            <Typography
              txtWhite
              customStyles={{ opacity: formType === "transaction" ? 1 : 0.5 }}
            >
              Transaction
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              formType === "category" && {
                borderBottomColor: theme.t100,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setFormType("category")}
          >
            <Typography
              txtWhite
              customStyles={{ opacity: formType === "category" ? 1 : 0.5 }}
            >
              Category
            </Typography>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={{ padding: sizes.md, paddingBottom: 100 }}>
        {formType === "transaction" ? (
          /* TRANSACTION FORM */
          <View style={{ gap: sizes.md }}>
            {/* Amount */}
            <View style={{ alignItems: "center", marginVertical: sizes.lg }}>
              <Typography customStyles={{ color: "rgba(255, 255, 255, 0.5)" }}>
                Amount
              </Typography>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                <TextInput
                  style={[styles.amountInput, { color: "white" }]}
                  keyboardType="numeric"
                  placeholder="100.00"
                  placeholderTextColor="rgba(255, 255, 255, 0.2)"
                  value={txAmount}
                  onChangeText={setTxAmount}
                />
              </View>
            </View>

            {/* Type Toggle */}
            <View style={styles.typeToggleContainer}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setTxType("income")}
              >
                {txType === "income" ? (
                  <LinearGradient
                    colors={["rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.02)"]}
                    style={[styles.typeButton, styles.activeTypeButton]}
                  >
                    <Typography customStyles={{ color: "#00C851", fontWeight: "bold" }}>
                      Income
                    </Typography>
                  </LinearGradient>
                ) : (
                  <View style={styles.typeButton}>
                    <Typography customStyles={{ color: "rgba(255, 255, 255, 0.4)" }}>
                      Income
                    </Typography>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setTxType("expense")}
              >
                {txType === "expense" ? (
                  <LinearGradient
                    colors={["rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.02)"]}
                    style={[styles.typeButton, styles.activeTypeButton]}
                  >
                    <Typography customStyles={{ color: theme.t100 || "#0070f3", fontWeight: "bold" }}>
                      Expense
                    </Typography>
                  </LinearGradient>
                ) : (
                  <View style={styles.typeButton}>
                    <Typography customStyles={{ color: "rgba(255, 255, 255, 0.4)" }}>
                      Expense
                    </Typography>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Title / Transaction Name */}
            <View>
              <Typography customStyles={{ color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
                Transaction Name <Typography customStyles={{ color: "#df1d31" }}>*</Typography>
              </Typography>
              <View style={styles.inputWrapper}>
                <Icon name="shapes" library="Ionicons" size={20} color="white" />
                <TextInput
                  style={[styles.textInput, { color: "white" }]}
                  placeholder="Transaction Name"
                  placeholderTextColor="#666"
                  value={txTitle}
                  onChangeText={setTxTitle}
                />
              </View>
            </View>

            {/* Date */}
            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <Typography customStyles={{ color: "rgba(255,255,255,0.7)" }}>Date</Typography>
                <Pressable onPress={() => setShowDateTooltip(!showDateTooltip)} style={styles.infoIcon}>
                  <Icon name="information-circle-outline" library="Ionicons" size={16} color="rgba(255,255,255,0.6)" />
                </Pressable>
              </View>
              {showDateTooltip && (
                <View style={styles.tooltipBubble}>
                  <Typography fontSize={12} txtWhite>Defaults to current date.</Typography>
                </View>
              )}
              <View style={styles.inputWrapper}>
                <Icon name="calendar-outline" library="Ionicons" size={20} color="white" />
                <TextInput
                  style={[styles.textInput, { color: "white" }]}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#666"
                  value={txDate}
                  onChangeText={setTxDate}
                />
              </View>
            </View>

            {/* Time */}
            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <Typography customStyles={{ color: "rgba(255,255,255,0.7)" }}>Time</Typography>
                <Pressable onPress={() => setShowTimeTooltip(!showTimeTooltip)} style={styles.infoIcon}>
                  <Icon name="information-circle-outline" library="Ionicons" size={16} color="rgba(255,255,255,0.6)" />
                </Pressable>
              </View>
              {showTimeTooltip && (
                <View style={styles.tooltipBubble}>
                  <Typography fontSize={12} txtWhite>Defaults to current time.</Typography>
                </View>
              )}
              <View style={styles.inputWrapper}>
                <Icon name="time-outline" library="Ionicons" size={20} color="white" />
                <TextInput
                  style={[styles.textInput, { color: "white" }]}
                  placeholder="hh:mm A"
                  placeholderTextColor="#666"
                  value={txTime}
                  onChangeText={setTxTime}
                />
              </View>
            </View>

            {/* Bank selection */}
            <View>
              <Typography customStyles={{ color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
                Select Bank <Typography customStyles={{ color: "#df1d31" }}>*</Typography>
              </Typography>
              <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownListContainer}
                itemTextStyle={{ color: "white" }}
                placeholderStyle={{ color: "#666" }}
                selectedTextStyle={{ color: "white" }}
                activeColor="rgba(255,255,255,0.08)"
                data={bankDropdownData}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Select a bank"
                value={txBank}
                onChange={(item) => setTxBank(item.value)}
                renderLeftIcon={() => (
                  <Icon name="card-outline" library="Ionicons" size={20} color="white" style={{ marginRight: 10 }} />
                )}
              />
            </View>

            {/* Category selection */}
            <View>
              <Typography customStyles={{ color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
                Select Category <Typography customStyles={{ color: "#df1d31" }}>*</Typography>
              </Typography>
              <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownListContainer}
                itemTextStyle={{ color: "white" }}
                placeholderStyle={{ color: "#666" }}
                selectedTextStyle={{ color: "white" }}
                activeColor="rgba(255,255,255,0.08)"
                data={categoryDropdownData}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Select a category"
                value={txCategory}
                onChange={(item) => setTxCategory(item.value)}
                renderLeftIcon={() => (
                  <Icon name="shapes-outline" library="Ionicons" size={20} color="white" style={{ marginRight: 10 }} />
                )}
              />
            </View>

            {/* Location Section */}
            <View style={{ marginTop: 8 }}>
              <Typography customStyles={{ color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginBottom: 8, fontSize: 12 }}>
                LOCATION
              </Typography>
              <Pressable
                style={styles.actionBlockButton}
                onPress={() => locationSheetRef.current?.present()}
              >
                <Icon name={locationCoords ? "checkmark-circle" : "add"} library="Ionicons" size={28} color="white" />
                <Typography txtWhite customStyles={{ marginLeft: sizes.sm }}>
                  {locationCoords ? "Location Added" : "Add location"}
                </Typography>
              </Pressable>
            </View>

            {/* Description Textarea */}
            <View>
              <Typography customStyles={{ color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
                Description
              </Typography>
              <TextInput
                style={styles.textarea}
                placeholder="Add Description"
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
                value={txDescription}
                onChangeText={setTxDescription}
              />
            </View>

            {/* Attach Receipt */}
            <Pressable
              style={[styles.actionBlockButton, { justifyContent: "space-between", paddingHorizontal: 16 }]}
              onPress={() => receiptSheetRef.current?.present()}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="receipt-outline" library="Ionicons" size={24} color="white" />
                <Typography txtWhite customStyles={{ marginLeft: 12 }}>
                  {attachedReceipt ? "Receipt Attached" : "Attach Receipt"}
                </Typography>
              </View>
              <Icon name={attachedReceipt ? "checkmark" : "add"} library="Ionicons" size={20} color="white" />
            </Pressable>
          </View>
        ) : (
          /* CATEGORY FORM */
          <View style={{ gap: sizes.md }}>
            <View>
              <Typography customStyles={{ color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
                Category Name <Typography customStyles={{ color: "#df1d31" }}>*</Typography>
              </Typography>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: "rgba(255,255,255,0.03)",
                    color: "white",
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                ]}
                placeholder="Ex. Subscriptions"
                placeholderTextColor="#666"
                value={catTitle}
                onChangeText={setCatTitle}
              />
            </View>

            <View>
              <Typography customStyles={{ color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
                Icon Name (Ionicons)
              </Typography>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: "rgba(255,255,255,0.03)",
                    color: "white",
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                ]}
                placeholder="Ex. apps-outline"
                placeholderTextColor="#666"
                value={catIcon}
                onChangeText={setCatIcon}
                autoCapitalize="none"
              />
            </View>

            <View>
              <Typography customStyles={{ color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
                Color (Hex)
              </Typography>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: "rgba(255,255,255,0.03)",
                    color: "white",
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                ]}
                placeholder="#FF0000"
                placeholderTextColor="#666"
                value={catColor}
                onChangeText={setCatColor}
                autoCapitalize="none"
              />
            </View>
          </View>
        )}

        <View style={{ marginTop: sizes.xxxl }}>
          <Button
            text={formType === "transaction" ? "Create Transaction" : "Create Category"}
            type="filled"
            color={theme.t100}
            fullWidth
            onPress={
              formType === "transaction" ? handleSaveTransaction : handleSaveCategory
            }
          />
        </View>
      </ScrollView>

      {/* Reusable Bottom Sheets */}
      <LocationBottomSheet
        sheetRef={locationSheetRef}
        onLocationSelected={(lat, lng) => setLocationCoords({ latitude: lat, longitude: lng })}
      />

      <ReceiptBottomSheet
        sheetRef={receiptSheetRef}
        onReceiptSelected={(uri) => setAttachedReceipt(uri)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
  amountInput: {
    fontSize: 44,
    fontWeight: "bold",
    textAlign: "center",
    minWidth: 200,
  },
  typeToggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 4,
  },
  typeButton: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  activeTypeButton: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  dropdownListContainer: {
    backgroundColor: "#100F14",
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
  },
  actionBlockButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 8,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  textarea: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "white",
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
  },
  infoIcon: {
    padding: 2,
  },
  tooltipBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
});
