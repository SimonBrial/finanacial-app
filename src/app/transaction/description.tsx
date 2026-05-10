import { View, Pressable, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import useTheme from "../../hook/useTheme";
import Typography from "../../components/ui/typography";
import Icon from "../../components/ui/icon";

export default function TransactionDescription() {
  const router = useRouter();
  const { sizes, theme, globalStyles } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: "black", paddingHorizontal: sizes.md, paddingTop: 60 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: sizes.xl }}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Icon name="chevron-back" library="Ionicons" size={24} color={theme.t100} />
        </Pressable>
        <Typography fontSize={sizes.lg} txtWhite>Add Description</Typography>
        <Pressable onPress={() => router.back()} style={styles.textButton}>
          <Typography customStyles={{ color: "#006DFF" }} bold>Save</Typography>
        </Pressable>
      </View>

      <View style={styles.editorContainer}>
        {/* Toolbar Placeholder */}
        <View style={styles.toolbar}>
          <Icon name="format-bold" library="MaterialIcons" size={24} color="white" />
          <Icon name="format-italic" library="MaterialIcons" size={24} color="white" />
          <Icon name="format-underlined" library="MaterialIcons" size={24} color="white" />
          <Icon name="format-list-bulleted" library="MaterialIcons" size={24} color="white" />
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Write your transaction description here..."
          placeholderTextColor="#888"
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 8,
  },
  textButton: {
    padding: 10,
  },
  editorContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 40,
    overflow: "hidden",
  },
  toolbar: {
    flexDirection: "row",
    gap: 16,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  textInput: {
    flex: 1,
    padding: 16,
    color: "white",
    fontSize: 16,
  }
});
