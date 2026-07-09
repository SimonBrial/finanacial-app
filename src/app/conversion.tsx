import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import GlobalContainer from "../components/ui/global-container";
import Typography from "../components/ui/typography";
import Icon from "../components/ui/icon";
import Row from "../components/ui/row";
import useTheme from "../hooks/useTheme";

/* ─── Exchange rates (USD base) ──────────────────────── */
const RATES: Record<string, number> = {
  USD: 1.0,
  VES: 650.47,
  EUR: 0.92,
};

/* ─── Blinking cursor bar ────────────────────────────── */
function BlinkingCursor({ height = 28 }: { height?: number }) {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <View
      style={{
        width: 1.8,
        height,
        backgroundColor: on ? "#006DFF" : "transparent",
        borderRadius: 1,
      }}
    />
  );
}

/* ─── Main screen ────────────────────────────────────── */
export default function Conversion() {
  const router = useRouter();
  const { sizes } = useTheme();

  // ── Core state ──
  const [activeCard, setActiveCard] = useState<"top" | "bottom">("top");
  const [topCurrency, setTopCurrency] = useState("USD");
  const [bottomCurrency, setBottomCurrency] = useState("VES");
  const [rawValue, setRawValue] = useState("0");
  const [cursorIdx, setCursorIdx] = useState(3);
  const [showCursor, setShowCursor] = useState(false);
  const [activePicker, setActivePicker] = useState<"top" | "bottom" | null>(
    null,
  );

  // ── Arithmetic state ──
  const [pendingOp, setPendingOp] = useState<string | null>(null);
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [justPressedOp, setJustPressedOp] = useState(false);

  // ── Refs ──
  const cursorRef = useRef(3);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const holdInterval = useRef<NodeJS.Timeout | null>(null);
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const topScrollRef = useRef<ScrollView | null>(null);
  const bottomScrollRef = useRef<ScrollView | null>(null);

  // Keep ref in sync
  useEffect(() => {
    cursorRef.current = cursorIdx;
  }, [cursorIdx]);

  // Show cursor temporarily (2 seconds)
  const triggerCursorShow = useCallback(() => {
    setShowCursor(true);
    if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);
    cursorTimeoutRef.current = setTimeout(() => {
      setShowCursor(false);
    }, 2000);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (holdInterval.current) clearInterval(holdInterval.current);
      if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);
    };
  }, []);

  /* ─── Formatting helpers ───────────────────────────── */

  // Format raw string (e.g. "65047") → display string (e.g. "65.047")
  // raw uses "." for decimal, display uses "," for decimal and "." for thousands
  const formatForDisplay = useCallback((raw: string): string => {
    const parts = raw.split(".");
    const intStr = parts[0];
    const decStr = parts.length > 1 ? parts[1] : null;

    const intNum = parseInt(intStr) || 0;
    const formattedInt = intNum.toLocaleString("de-DE");
    return decStr !== null ? `${formattedInt},${decStr}` : formattedInt;
  }, []);

  const formatOutput = useCallback((num: number): string => {
    return num.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, []);

  /* ─── Mapping: raw cursor index ↔ formatted display index ─── */

  // Build a map from each formatted character position to its raw index.
  // Thousand-separator dots in the formatted string don't correspond to raw chars.
  const buildIndexMap = useCallback(
    (raw: string): number[] => {
      const display = formatForDisplay(raw);
      const map: number[] = [];
      let rawI = 0;

      // Walk through the raw integer part to figure out what the formatted version added
      const rawParts = raw.split(".");
      const rawInt = rawParts[0];
      const intNum = parseInt(rawInt) || 0;
      const formattedInt = intNum.toLocaleString("de-DE");

      // Map formatted integer chars to raw positions
      let rawPos = 0;
      for (let fi = 0; fi < formattedInt.length; fi++) {
        if (formattedInt[fi] === ".") {
          // Thousand separator — no raw counterpart, map to the same raw position
          map.push(-1); // marker for separator
        } else {
          map.push(rawPos);
          rawPos++;
        }
      }

      // If there's a decimal part
      if (rawParts.length > 1) {
        map.push(rawPos); // the comma "," maps to the raw "."
        rawPos++;
        for (let di = 0; di < rawParts[1].length; di++) {
          map.push(rawPos);
          rawPos++;
        }
      }

      return map;
    },
    [formatForDisplay],
  );

  // Convert raw cursor index → display cursor index
  const rawToDisplayCursor = useCallback(
    (raw: string, rawIdx: number): number => {
      const display = formatForDisplay(raw);
      const rawParts = raw.split(".");
      const rawInt = rawParts[0];
      const intNum = parseInt(rawInt) || 0;
      const formattedInt = intNum.toLocaleString("de-DE");

      if (rawIdx === 0) return 0;

      // Count how many raw chars we've consumed, track display position
      let rawCount = 0;
      let displayPos = 0;

      // Walk formatted integer
      for (let fi = 0; fi < formattedInt.length; fi++) {
        if (formattedInt[fi] !== ".") {
          rawCount++;
        }
        displayPos++;
        if (rawCount === rawIdx && rawIdx <= rawInt.length) {
          return displayPos;
        }
      }

      // Walk decimal part
      if (rawParts.length > 1 && rawIdx > rawInt.length) {
        displayPos++; // skip the comma
        const decOffset = rawIdx - rawInt.length - 1; // position within decimal digits
        return displayPos + decOffset;
      }

      // Cursor at end of integer part if rawIdx === rawInt.length
      if (rawIdx === rawInt.length) return displayPos;

      // Fallback: cursor at very end of raw → very end of display
      return display.length;
    },
    [formatForDisplay],
  );

  // Convert display tap index → raw cursor index
  const displayToRawCursor = useCallback(
    (raw: string, displayIdx: number): number => {
      const rawParts = raw.split(".");
      const rawInt = rawParts[0];
      const intNum = parseInt(rawInt) || 0;
      const formattedInt = intNum.toLocaleString("de-DE");

      if (displayIdx === 0) return 0;

      let rawCount = 0;

      // Walk through formatted integer
      for (let fi = 0; fi < formattedInt.length && fi < displayIdx; fi++) {
        if (formattedInt[fi] !== ".") {
          rawCount++;
        }
      }

      if (displayIdx <= formattedInt.length) {
        return rawCount;
      }

      // Past the integer part — account for comma and decimal
      if (rawParts.length > 1) {
        const afterInt = displayIdx - formattedInt.length;
        if (afterInt === 1) {
          // On the comma → position after the dot in raw
          return rawInt.length + 1;
        }
        // Decimal digits
        return rawInt.length + afterInt;
      }

      return raw.length;
    },
    [],
  );

  /* ─── Conversion math ──────────────────────────────── */
  const parsedInput = parseFloat(rawValue) || 0;
  const isTopActive = activeCard === "top";

  const outputVal = useMemo(() => {
    if (isTopActive) {
      return (parsedInput / RATES[topCurrency]) * RATES[bottomCurrency];
    } else {
      return (parsedInput / RATES[bottomCurrency]) * RATES[topCurrency];
    }
  }, [isTopActive, parsedInput, topCurrency, bottomCurrency]);

  const topDisplayText = isTopActive
    ? formatForDisplay(rawValue)
    : formatOutput(outputVal);
  const bottomDisplayText = isTopActive
    ? formatOutput(outputVal)
    : formatForDisplay(rawValue);

  const getDynamicFontSize = (text: string) => {
    const len = text.length;
    if (len <= 8) return 32;
    if (len <= 10) return 27;
    if (len <= 12) return 23;
    if (len <= 14) return 20;
    return 18;
  };

  const topFontSize = getDynamicFontSize(topDisplayText);
  const bottomFontSize = getDynamicFontSize(bottomDisplayText);

  const getSymbol = (c: string) => (c === "USD" ? "$" : c === "EUR" ? "€" : c);

  const rateRatio = RATES[bottomCurrency] / RATES[topCurrency];
  const rateLabelTop = `${rateRatio.toLocaleString("de-DE", { maximumFractionDigits: 2 })} ${bottomCurrency} = 1 ${topCurrency}`;
  const rateLabelBottom = `1 ${topCurrency} = ${rateRatio.toLocaleString("de-DE", { maximumFractionDigits: 2 })} ${bottomCurrency}`;

  /* ─── Cursor display index (for the active card) ───── */
  const displayCursorIdx = rawToDisplayCursor(rawValue, cursorIdx);
  const activeDisplayText = isTopActive ? topDisplayText : bottomDisplayText;
  const activeFontSize = isTopActive ? topFontSize : bottomFontSize;

  // Auto-scroll to keep cursor visible
  useEffect(() => {
    const ref = isTopActive ? topScrollRef : bottomScrollRef;
    const charWidth = activeFontSize * 0.58;
    const offset = Math.max(0, displayCursorIdx * charWidth - 120);
    ref.current?.scrollTo({ x: offset, animated: true });
  }, [displayCursorIdx, isTopActive, activeFontSize]);

  /* ─── Arithmetic evaluation ───────────────────────── */

  const evaluate = useCallback(
    (left: number, op: string, right: number): number => {
      switch (op) {
        case "+":
          return left + right;
        case "−":
          return left - right;
        case "×":
          return left * right;
        case "÷":
          return right !== 0 ? left / right : 0;
        default:
          return right;
      }
    },
    [],
  );

  /* ─── Key press handlers ───────────────────────────── */

  const deleteChar = useCallback(() => {
    const idx = cursorRef.current;
    if (idx <= 0) return;

    setRawValue((prev) => {
      const next = prev.slice(0, idx - 1) + prev.slice(idx);
      const final = next === "" ? "0" : next;
      const newIdx = next === "" ? 1 : idx - 1;
      setCursorIdx(newIdx);
      cursorRef.current = newIdx;
      return final;
    });
    setJustPressedOp(false);
  }, []);

  const onKeyPress = useCallback(
    (key: string) => {
      if (key === "backspace") {
        deleteChar();
        return;
      }

      if (key === "=") {
        const currentNum = parseFloat(rawValue) || 0;
        if (storedValue !== null && pendingOp) {
          const result = evaluate(storedValue, pendingOp, currentNum);
          const resultStr = Number.isInteger(result)
            ? result.toString()
            : result.toFixed(4).replace(/\.?0+$/, "") || "0";
          setRawValue(resultStr);
          setCursorIdx(resultStr.length);
          cursorRef.current = resultStr.length;
          setStoredValue(null);
          setPendingOp(null);
          setJustPressedOp(false);
          triggerCursorShow();
        }
        return;
      }

      // Arithmetic operators
      if (["+", "−", "×", "÷"].includes(key)) {
        const currentNum = parseFloat(rawValue) || 0;

        if (storedValue !== null && pendingOp && !justPressedOp) {
          // Chain: evaluate previous operation first
          const result = evaluate(storedValue, pendingOp, currentNum);
          const resultStr = Number.isInteger(result)
            ? result.toString()
            : result.toFixed(2).replace(/\.?0+$/, "") || "0";
          setStoredValue(result);
          setRawValue(resultStr);
          setCursorIdx(resultStr.length);
          cursorRef.current = resultStr.length;
        } else {
          // First operator press
          setStoredValue(currentNum);
        }

        setPendingOp(key);
        setJustPressedOp(true);
        return;
      }

      const idx = cursorRef.current;

      // If user just pressed an operator, start a fresh number
      if (justPressedOp) {
        setJustPressedOp(false);
        if (key === ",") {
          setRawValue("0.");
          setCursorIdx(2);
          cursorRef.current = 2;
        } else {
          setRawValue(key);
          setCursorIdx(1);
          cursorRef.current = 1;
        }
        return;
      }

      if (key === ",") {
        setRawValue((prev) => {
          if (prev.includes(".")) return prev;
          const nv = prev.slice(0, idx) + "." + prev.slice(idx);
          const ni = idx + 1;
          setCursorIdx(ni);
          cursorRef.current = ni;
          return nv;
        });
        return;
      }

      // Digit
      setRawValue((prev) => {
        if (prev === "0" && key !== "0") {
          setCursorIdx(1);
          cursorRef.current = 1;
          return key;
        }
        const nv = prev.slice(0, idx) + key + prev.slice(idx);
        const ni = idx + 1;
        setCursorIdx(ni);
        cursorRef.current = ni;
        return nv;
      });
    },
    [
      deleteChar,
      rawValue,
      storedValue,
      pendingOp,
      justPressedOp,
      evaluate,
      triggerCursorShow,
    ],
  );

  // Continuous backspace
  const onBackspacePressIn = useCallback(() => {
    deleteChar();
    holdTimer.current = setTimeout(() => {
      holdInterval.current = setInterval(deleteChar, 75);
    }, 400);
  }, [deleteChar]);

  const onBackspacePressOut = useCallback(() => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (holdInterval.current) clearInterval(holdInterval.current);
  }, []);

  /* ─── Swap ─────────────────────────────────────────── */
  const handleSwap = useCallback(() => {
    const pt = topCurrency;
    setTopCurrency(bottomCurrency);
    setBottomCurrency(pt);
    setActiveCard((prev) => (prev === "top" ? "bottom" : "top"));
    setCursorIdx((prev) => {
      cursorRef.current = prev;
      return prev;
    });
  }, [topCurrency, bottomCurrency]);

  /* ─── Currency picker ──────────────────────────────── */
  const selectCurrency = useCallback(
    (currency: string) => {
      if (activePicker === "top") setTopCurrency(currency);
      else if (activePicker === "bottom") setBottomCurrency(currency);
      setActivePicker(null);
    },
    [activePicker],
  );

  /* ─── Activate a card and convert value/set cursor ─── */
  const activateCardWithTap = useCallback(
    (card: "top" | "bottom", displayIdx?: number) => {
      if (activeCard === card) {
        if (displayIdx !== undefined) {
          const raw = displayToRawCursor(rawValue, displayIdx);
          setCursorIdx(raw);
          cursorRef.current = raw;
          triggerCursorShow();
        }
        return;
      }

      // Switch active card: convert output value of current card to new input rawValue
      const newRaw = outputVal.toFixed(4).replace(/\.?0+$/, "");

      let newCursorIdx = newRaw.length;
      if (displayIdx !== undefined) {
        newCursorIdx = displayToRawCursor(newRaw, displayIdx);
      }

      setRawValue(newRaw);
      setActiveCard(card);
      setCursorIdx(newCursorIdx);
      cursorRef.current = newCursorIdx;

      // Clear arithmetic pending operation to start fresh on the other card
      setPendingOp(null);
      setStoredValue(null);
      setJustPressedOp(false);

      triggerCursorShow();
    },
    [activeCard, outputVal, rawValue, displayToRawCursor, triggerCursorShow],
  );

  /* ─── Render the interactive value display ─────────── */
  const renderDisplay = (
    card: "top" | "bottom",
    displayText: string,
    fontSize: number,
    scrollRef: React.RefObject<ScrollView | null>,
  ) => {
    const isActive = activeCard === card;
    const chars = displayText.split("");
    const cursorDisplayPos = isActive ? displayCursorIdx : -1;

    return (
      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center", paddingRight: 8 }}
        keyboardShouldPersistTaps="always"
      >
        {/* Tap zone before first char */}
        <Pressable
          onPress={() => {
            activateCardWithTap(card, 0);
          }}
          style={{
            width: 8,
            height: fontSize * 1.4,
            justifyContent: "center",
          }}
        />

        {showCursor && isActive && cursorDisplayPos === 0 && (
          <BlinkingCursor height={fontSize * 0.85} />
        )}

        {chars.map((char, i) => (
          <React.Fragment key={i}>
            <Pressable
              onPress={() => {
                activateCardWithTap(card, i + 1);
              }}
              style={{ justifyContent: "center", paddingVertical: 2 }}
            >
              <Typography fontSize={fontSize} customStyles={styles.amountText}>
                {char}
              </Typography>
            </Pressable>
            {showCursor && isActive && cursorDisplayPos === i + 1 && (
              <BlinkingCursor height={fontSize * 0.85} />
            )}
          </React.Fragment>
        ))}

        {/* Tap zone after last char */}
        <Pressable
          onPress={() => {
            activateCardWithTap(card, undefined);
          }}
          style={{
            flexGrow: 1,
            minWidth: 20,
            height: fontSize * 1.4,
            justifyContent: "center",
          }}
        />
      </ScrollView>
    );
  };

  /* ─── Keypad layout: 5 rows ────────────────────────── */
  const keypadRows = [
    ["1", "2", "3", "+"],
    ["4", "5", "6", "−"],
    ["7", "8", "9", "×"],
    [",", "0", "backspace", "÷"],
    ["="],
  ];

  /* ─── JSX ──────────────────────────────────────────── */
  return (
    <GlobalContainer>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Row
          alignItem="center"
          justifyContent="space-between"
          width="100%"
          customStyles={styles.header}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Icon
              name="chevron-back"
              library="Ionicons"
              variant="light"
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <Typography
            fontSize={sizes.lg}
            bold
            customStyles={styles.headerTitle}
          >
            Conversion
          </Typography>
          <View style={{ width: 24 }} />
        </Row>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <View style={styles.cardsContainer}>
          {/* ─── TOP CARD ─── */}
          <View style={styles.card}>
            <Row justifyContent="space-between" alignItem="center">
              <Typography
                fontSize={sizes.md}
                bold
                customStyles={{ color: "#006DFF" }}
              >
                {isTopActive ? "Saldo" : "Equivalent"}
              </Typography>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setActivePicker("top")}
              >
                <Typography fontSize={13} customStyles={styles.pickerText}>
                  {topCurrency}
                </Typography>
                <Icon
                  name="chevron-down"
                  library="Ionicons"
                  variant="light"
                  size={12}
                  color="white"
                />
              </TouchableOpacity>
            </Row>

            <Row
              justifyContent="space-between"
              alignItem="center"
              customStyles={styles.valueRow}
            >
              <View style={styles.valueScrollContainer}>
                {renderDisplay(
                  "top",
                  topDisplayText,
                  topFontSize,
                  topScrollRef,
                )}
              </View>
              <Typography fontSize={24} customStyles={styles.currencySymbol}>
                {getSymbol(topCurrency)}
              </Typography>
            </Row>

            <Row alignItem="center" gap={4}>
              {isTopActive && pendingOp && storedValue !== null && (
                <Typography
                  fontSize={sizes.sm}
                  customStyles={styles.opIndicator}
                >
                  {formatForDisplay(storedValue.toString())} {pendingOp}
                </Typography>
              )}
              {(!isTopActive || !pendingOp) && (
                <Typography fontSize={sizes.sm} customStyles={styles.subtext}>
                  {isTopActive ? "Balance: 12.450,00" : rateLabelTop}
                </Typography>
              )}
            </Row>
          </View>

          {/* ─── SWAP ─── */}
          <View style={styles.swapLineContainer}>
            <View style={styles.swapLine} />
            <TouchableOpacity
              onPress={handleSwap}
              style={styles.swapButton}
              activeOpacity={0.8}
            >
              <Icon
                name="repeat"
                library="Feather"
                variant="light"
                size={22}
                color="white"
              />
            </TouchableOpacity>
          </View>

          {/* ─── BOTTOM CARD ─── */}
          <View style={styles.card}>
            <Row justifyContent="space-between" alignItem="center">
              <Typography
                fontSize={sizes.md}
                bold
                customStyles={{ color: "#006DFF" }}
              >
                {!isTopActive ? "Saldo" : "Equivalent"}
              </Typography>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setActivePicker("bottom")}
              >
                <Typography fontSize={13} customStyles={styles.pickerText}>
                  {bottomCurrency}
                </Typography>
                <Icon
                  name="chevron-down"
                  library="Ionicons"
                  variant="light"
                  size={12}
                  color="white"
                />
              </TouchableOpacity>
            </Row>

            <Row
              justifyContent="space-between"
              alignItem="center"
              customStyles={styles.valueRow}
            >
              <View style={styles.valueScrollContainer}>
                {renderDisplay(
                  "bottom",
                  bottomDisplayText,
                  bottomFontSize,
                  bottomScrollRef,
                )}
              </View>
              <Typography fontSize={20} customStyles={styles.currencySymbol}>
                {getSymbol(bottomCurrency)}
              </Typography>
            </Row>

            <Row alignItem="center" gap={4}>
              {!isTopActive && pendingOp && storedValue !== null && (
                <Typography
                  fontSize={sizes.sm}
                  customStyles={styles.opIndicator}
                >
                  {formatForDisplay(storedValue.toString())} {pendingOp}
                </Typography>
              )}
              {(isTopActive || !pendingOp) && (
                <Typography fontSize={sizes.sm} customStyles={styles.subtext}>
                  {!isTopActive ? "Balance: 12.450,00" : rateLabelBottom}
                </Typography>
              )}
            </Row>
          </View>
        </View>

        {/* ─── KEYPAD ─── */}
        <View style={styles.keyboardContainer}>
          {keypadRows.map((row, ri) => (
            <View key={ri} style={styles.keyboardRow}>
              {row.map((key) => {
                const isBackspace = key === "backspace";
                const isOp = ["+", "−", "×", "÷"].includes(key);
                const isEqual = key === "=";

                return (
                  <Pressable
                    key={key}
                    onPress={() => {
                      if (!isBackspace) onKeyPress(key);
                    }}
                    onPressIn={() => {
                      if (isBackspace) onBackspacePressIn();
                    }}
                    onPressOut={() => {
                      if (isBackspace) onBackspacePressOut();
                    }}
                    style={({ pressed }) => [
                      styles.keyButton,
                      isOp && styles.opKeyButton,
                      isEqual && styles.equalKeyButton,
                      pressed && styles.keyButtonPressed,
                    ]}
                  >
                    {isBackspace ? (
                      <Icon
                        name="backspace-outline"
                        library="Ionicons"
                        variant="light"
                        size={22}
                        color="white"
                      />
                    ) : (
                      <Typography
                        fontSize={isEqual ? 24 : isOp ? 20 : 22}
                        customStyles={
                          isEqual
                            ? styles.equalKeyText
                            : isOp
                              ? styles.opKeyText
                              : styles.keyText
                        }
                      >
                        {key}
                      </Typography>
                    )}
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      {/* ─── Currency Modal ─── */}
      <Modal
        visible={activePicker !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActivePicker(null)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setActivePicker(null)}
        >
          <View style={styles.modalContent}>
            <Typography fontSize={18} bold customStyles={styles.modalTitle}>
              Select Currency
            </Typography>
            {["VES", "USD", "EUR"].map((curr) => (
              <TouchableOpacity
                key={curr}
                style={styles.modalItem}
                onPress={() => selectCurrency(curr)}
              >
                <Typography fontSize={16} customStyles={styles.modalItemText}>
                  {curr}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </GlobalContainer>
  );
}

/* ─── Styles ─────────────────────────────────────────── */
const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 0.9,
    justifyContent: "space-between",
  },
  header: {
    paddingVertical: 5,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    color: "white",
  },
  cardsContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  card: {
    width: "100%",
    height: 120,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    gap: 4,
  },
  pickerText: {
    color: "white",
    fontWeight: "500",
  },
  valueRow: {
    marginTop: 10,
    marginBottom: 4,
  },
  valueScrollContainer: {
    flex: 1,
    marginRight: 12,
  },
  amountText: {
    color: "white",
    fontWeight: "300",
  },
  currencySymbol: {
    color: "#888888",
    fontWeight: "400",
  },
  subtext: {
    color: "#888888",
    marginTop: 4,
  },
  opIndicator: {
    color: "#006DFF",
    marginTop: 4,
    fontWeight: "500",
  },
  swapLineContainer: {
    height: 48,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 10,
  },
  swapLine: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    width: "100%",
    position: "absolute",
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#000000",
  },
  keyboardContainer: {
    width: "100%",
    gap: 8,
    paddingBottom: 10,
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  keyButton: {
    flex: 1,
    height: 56,
    backgroundColor: "#16161A",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  navKeyButton: {
    flex: 1,
    height: 44,
    backgroundColor: "#16161A",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  opKeyButton: {
    backgroundColor: "rgba(0, 109, 255, 0.08)",
    borderColor: "rgba(0, 109, 255, 0.15)",
  },
  equalKeyButton: {
    backgroundColor: "#006DFF",
    borderColor: "#006DFF",
  },
  keyButtonPressed: {
    borderColor: "#006DFF",
    borderWidth: 1.5,
  },
  keyText: {
    color: "white",
    fontWeight: "400",
  },
  opKeyText: {
    color: "#006DFF",
    fontWeight: "500",
  },
  equalKeyText: {
    color: "white",
    fontWeight: "700",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#16161A",
    borderRadius: 24,
    padding: 24,
    width: "80%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  modalTitle: {
    color: "white",
    marginBottom: 16,
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
  },
  modalItemText: {
    color: "white",
    fontWeight: "500",
  },
});
