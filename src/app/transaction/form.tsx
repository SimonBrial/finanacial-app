import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import useTheme from "../../hook/useTheme";
import Typography from "../../components/ui/typography";
import Button from "../../components/ui/button";
import Icon from "../../components/ui/icon";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useCategoriesStore } from "../../store/useCategoriesStore";
import { Transaction, CategoryCardProps } from "../../interface/interface";

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

  // -----------------------------------------
  // TRANSACTION FORM STATE
  // -----------------------------------------
  const [txTitle, setTxTitle] = useState("");
  const [txAmount, setTxAmount] = useState("");
  const [txType, setTxType] = useState<"income" | "expense">("expense");
  const [txCategory, setTxCategory] = useState<string>("");
  const [txBank, setTxBank] = useState<string>("mercantil");

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

  const handleSaveTransaction = () => {
    if (!txTitle || !txAmount) {
      Alert.alert("Error", "Please fill required fields (Title, Amount)");
      return;
    }

    // Default icon/color from category or fallback
    const selectedCat = categories.find((c) => c.title === txCategory);
    const txIcon = selectedCat?.icon || "cash";
    const txLib = selectedCat?.library || "Ionicons";
    const txColorStr = selectedCat?.color || "#3b82f6";

    const payload: Omit<Transaction, "id"> = {
      title: txTitle,
      amount: parseFloat(txAmount),
      type: txType,
      category: txCategory || "General",
      icon: txIcon,
      library: txLib,
      bank: txBank as any,
      color: txColorStr,
      date: new Date().toISOString(),
      locationSave: false,
    };

    if (isEditMode && params.id) {
      editTransaction(params.id, payload);
    } else {
      addTransaction(payload);
    }
    router.back();
  };

  const handleSaveCategory = () => {
    if (!catTitle) {
      Alert.alert("Error", "Please enter a category name");
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
      style={{ flex: 1, backgroundColor: globalStyles.background }}
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
            <View style={{ alignItems: "center", marginVertical: sizes.xl }}>
              <Typography customStyles={{ color: globalStyles.subtitle }}>
                Amount
              </Typography>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Typography fontSize={32} txtWhite>
                  $
                </Typography>
                <TextInput
                  style={[styles.amountInput, { color: globalStyles.text }]}
                  keyboardType="numeric"
                  placeholder="0.00"
                  placeholderTextColor="#666"
                  value={txAmount}
                  onChangeText={setTxAmount}
                />
              </View>
            </View>

            {/* Type Toggle */}
            <View style={styles.typeToggleContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  txType === "expense" && { backgroundColor: "#df1d3180" },
                ]}
                onPress={() => setTxType("expense")}
              >
                <Typography txtWhite>Expense</Typography>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  txType === "income" && { backgroundColor: "#00C85180" },
                ]}
                onPress={() => setTxType("income")}
              >
                <Typography txtWhite>Income</Typography>
              </TouchableOpacity>
            </View>

            {/* Title */}
            <View>
              <Typography customStyles={{ color: globalStyles.subtitle, marginBottom: 8 }}>
                Title
              </Typography>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: globalStyles.backgroundSecondary,
                    color: globalStyles.text,
                    borderColor: globalStyles.borderContainer,
                  },
                ]}
                placeholder="Ex. Groceries"
                placeholderTextColor="#666"
                value={txTitle}
                onChangeText={setTxTitle}
              />
            </View>

            {/* Category selection */}
            <View>
              <Typography customStyles={{ color: globalStyles.subtitle, marginBottom: 8 }}>
                Category
              </Typography>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoryBadge,
                        {
                          backgroundColor:
                            txCategory === cat.title
                              ? cat.color
                              : globalStyles.backgroundSecondary,
                        },
                      ]}
                      onPress={() => setTxCategory(cat.title)}
                    >
                      <Icon
                        name={cat.icon}
                        library={cat.library}
                        size={16}
                        color="white"
                      />
                      <Typography txtWhite fontSize={12} customStyles={{ marginLeft: 6 }}>
                        {cat.title}
                      </Typography>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Bank selection (Simplified) */}
            <View>
              <Typography customStyles={{ color: globalStyles.subtitle, marginBottom: 8 }}>
                Account / Bank
              </Typography>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: globalStyles.backgroundSecondary,
                    color: globalStyles.text,
                    borderColor: globalStyles.borderContainer,
                  },
                ]}
                placeholder="Ex. banesco, paypal"
                placeholderTextColor="#666"
                value={txBank}
                onChangeText={setTxBank}
                autoCapitalize="none"
              />
            </View>
          </View>
        ) : (
          /* CATEGORY FORM */
          <View style={{ gap: sizes.md }}>
            <View>
              <Typography customStyles={{ color: globalStyles.subtitle, marginBottom: 8 }}>
                Category Name
              </Typography>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: globalStyles.backgroundSecondary,
                    color: globalStyles.text,
                    borderColor: globalStyles.borderContainer,
                  },
                ]}
                placeholder="Ex. Subscriptions"
                placeholderTextColor="#666"
                value={catTitle}
                onChangeText={setCatTitle}
              />
            </View>

            <View>
              <Typography customStyles={{ color: globalStyles.subtitle, marginBottom: 8 }}>
                Icon Name (Ionicons)
              </Typography>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: globalStyles.backgroundSecondary,
                    color: globalStyles.text,
                    borderColor: globalStyles.borderContainer,
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
              <Typography customStyles={{ color: globalStyles.subtitle, marginBottom: 8 }}>
                Color (Hex)
              </Typography>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: globalStyles.backgroundSecondary,
                    color: globalStyles.text,
                    borderColor: globalStyles.borderContainer,
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
            text="Save"
            type="filled"
            color={theme.t100}
            fullWidth
            onPress={
              formType === "transaction" ? handleSaveTransaction : handleSaveCategory
            }
          />
        </View>
      </ScrollView>
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
    fontSize: 48,
    fontWeight: "bold",
    marginLeft: 8,
    minWidth: 100,
  },
  typeToggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
});
