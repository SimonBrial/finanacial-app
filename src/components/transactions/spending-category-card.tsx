import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../ui/icon";
import Typography from "../ui/typography";
import useTheme from "../../hook/useTheme";
import Badge from "../ui/badge";
import { LinearGradient } from "expo-linear-gradient";
import { SpendingCategoryCardProps } from "../../interface/interface";

export default function SpendingCategoryCard({
  library = "MaterialCommunityIcons",
  approachingLimit,
  selected,
  iconName,
  onPress,
  amount,
  limit,
  color,
  index,
  title,
}: SpendingCategoryCardProps) {
  const { sizes, globalStyles, inProgress } = useTheme();

  const percentage = Math.min((amount / limit) * 100, 100);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(index)}
      style={styles.container}
    >
      <LinearGradient
        colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]}
        style={[
          styles.backgroundContainer,
          {
            borderWidth: 1,
            borderColor:
              selected === index ? color : globalStyles.borderContainer,
          },
        ]}
        locations={[0.1, 1.0]}
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1, y: 0 }}
      >
        {/* Header Info */}
        <View style={styles.headerRow}>
          <View style={styles.leftInfo}>
            <Icon
              name={iconName}
              library={library}
              color={color}
              size={sizes.xl}
              variant="ghost"
              rounded
              padding={10}
            />
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: sizes.xs,
                }}
              >
                <Typography
                  fontSize={sizes.md}
                  txtWhite
                  customStyles={{ marginBottom: 2 }}
                >
                  {title}
                </Typography>
                <Badge text="$" color={color} />
              </View>
              <Typography
                fontSize={sizes.sm}
                customStyles={{ color: globalStyles.subtitle }}
              >
                LIMIT: {limit.toFixed(2)}
              </Typography>
            </View>
          </View>

          <View style={styles.rightInfo}>
            <Typography
              bold
              fontSize={sizes.md}
              customStyles={{ color, marginBottom: 2 }}
            >
              {amount.toFixed(2)}
            </Typography>
            <Typography
              fontSize={sizes.sm}
              customStyles={{ color: globalStyles.subtitle }}
            >
              {percentage.toFixed(0)}% spent
            </Typography>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBarTrack, { backgroundColor: `${color}30` }]}
          />
          <View
            style={[
              styles.progressBarFill,
              { backgroundColor: color, width: `${percentage}%` },
            ]}
          />
        </View>

        {/* Warning Banner */}
        {approachingLimit && (
          <View
            style={[
              styles.warningBanner,
              { borderColor: inProgress.p100, backgroundColor: inProgress.p20 },
            ]}
          >
            <Icon
              name="warning"
              library="AntDesign"
              variant="light"
              color={inProgress.p100}
              size={sizes.md}
            />
            <Typography
              fontSize={sizes.sm}
              customStyles={{ color: inProgress.p100, marginLeft: 6 }}
            >
              Approaching monthly limit
            </Typography>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.btn, styles.btnAdd, { backgroundColor: color }]}
            activeOpacity={0.7}
          >
            <Typography bold fontSize={sizes.sm} txtWhite>
              + Add
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btn,
              styles.btnDetails,
              { borderColor: color, backgroundColor: `${color}11` },
            ]}
            activeOpacity={0.7}
          >
            <Typography bold fontSize={sizes.sm} customStyles={{ color }}>
              Details
            </Typography>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  headerRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  leftInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rightInfo: {
    alignItems: "flex-end",
  },
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    position: "relative",
    marginBottom: 16,
    width: "100%",
  },
  progressBarTrack: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 3,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
    position: "absolute",
    left: 0,
    top: 0,
  },
  warningBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "transparent",
    width: "100%",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  btn: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAdd: {
    // Background color determined dynamically
  },
  btnDetails: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },

  backgroundContainer: {
    //position: "absolute",
    width: "100%",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
