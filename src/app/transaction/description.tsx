import React, { useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import {
  RichText,
  Toolbar,
  useEditorBridge,
  TenTapStartKit,
} from "@10play/tentap-editor";
import { useRouter } from "expo-router";
import useTheme from "../../hooks/useTheme";
import Typography from "../../components/ui/typography";
import Button from "../../components/ui/button";

export default function TransactionDescription() {
  const router = useRouter();
  const { sizes, theme, globalStyles } = useTheme();

  // Inicializamos el puente del editor con el kit de inicio y el tema oscuro
  const editor = useEditorBridge({
    bridgeExtensions: TenTapStartKit,
    autofocus: true,
    initialContent: "Write your transaction description here...",
    theme: {
      webview: {
        backgroundColor: globalStyles.bgContainerStart,
      },
      toolbar: {
        toolbarBody: {
          backgroundColor: globalStyles.bgContainerEnd,
          borderTopColor: globalStyles.borderContainer,
          height: 50,
        },
      },
    },
  });

  // Inyectamos CSS para forzar el color del texto a blanco dentro del WebView
  useEffect(() => {
    if (editor) {
      editor.injectCSS(`
        body {
          color: white !important;
          font-family: sans-serif;
          font-size: 16px;
          background-color: ${globalStyles.bgContainerStart} !important;
        }
        .ProseMirror {
          min-height: 100%;
          padding: 16px;
          color: white !important;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #747474;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror:focus {
          outline: none;
        }
      `);
    }
  }, [editor, globalStyles.bgContainerStart]);

  return (
    <View style={{ flex: 1, backgroundColor: globalStyles.bgContainerStart }}>
      <View
        style={{
          flex: 1,
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
            marginBottom: sizes.xl,
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
            Add Description
          </Typography>
          <Button
            iconLeft="save-outline"
            library="Ionicons"
            type="ghost"
            size="lg"
            color="white"
            onPress={() => router.back()}
            padding={10}
          />
        </View>

        <View style={styles.editorContainer}>
          {/* Editor de Texto Enriquecido */}
          <RichText editor={editor} />
        </View>
      </View>

      {/* Barra de herramientas que se posiciona sobre el teclado */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0} // Platform.OS === "ios" ? 0 :
        style={styles.toolbarContainer}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  editorContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 20,
    overflow: "hidden",
  },
  toolbarContainer: {
    backgroundColor: "#1B1A1F",
    borderTopWidth: 1,
    borderTopColor: "#313035",
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
