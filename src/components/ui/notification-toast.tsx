import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import { useNotificationStore } from "../../stores/useNotificationStore";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "./typography";
import Icon from "./icon";

export default function NotificationToast() {
  const { notifications, hideNotification } = useNotificationStore();
  const currentNotification = notifications[notifications.length - 1];

  const translateY = useSharedValue(-200);

  useEffect(() => {
    if (currentNotification) {
      // Smooth cubic-bezier entrance animation with no bounce
      translateY.value = withTiming(0, {
        duration: 350,
        easing: Easing.out(Easing.cubic),
      });
      
      const timer = setTimeout(() => {
        translateY.value = withTiming(-200, { duration: 300, easing: Easing.in(Easing.cubic) }, () => {
          hideNotification(currentNotification.id);
        });
      }, 4000); // Automatically dismiss after 4 seconds

      return () => clearTimeout(timer);
    }
  }, [currentNotification, hideNotification, translateY]);

  const getThemeDetails = () => {
    if (!currentNotification) {
      return {
        gradient: ["#16161a", "#16161a"],
        icon: "information",
        library: "Ionicons" as const,
      };
    }
    switch (currentNotification.type) {
      case "success":
        return {
          gradient: ["#00E676", "#00C851"],
          icon: "checkmark",
          library: "Ionicons" as const,
        };
      case "warning":
        return {
          gradient: ["#FFB300", "#FF8F00"],
          icon: "warning",
          library: "Ionicons" as const,
        };
      case "danger":
        return {
          gradient: ["#FF1744", "#D50000"],
          icon: "close",
          library: "Ionicons" as const,
        };
      default:
        return {
          gradient: ["#0070f3", "#0056b3"],
          icon: "information",
          library: "Ionicons" as const,
        };
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!currentNotification) return null;

  const { gradient, icon, library } = getThemeDetails();

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.card}>
        <LinearGradient colors={gradient as [string, string]} style={styles.iconWrapper}>
          <Icon name={icon} library={library} size={26} color="white" />
        </LinearGradient>
        <View style={styles.textContainer}>
          <Typography bold txtWhite fontSize={15}>
            {currentNotification.title}
          </Typography>
          <Typography
            fontSize={13}
            customStyles={{ color: "rgba(255, 255, 255, 0.7)", marginTop: 2 }}
          >
            {currentNotification.description}
          </Typography>
          <Typography
            fontSize={10}
            customStyles={{ color: "rgba(255, 255, 255, 0.3)", marginTop: 4 }}
          >
            {currentNotification.timestamp}
          </Typography>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    zIndex: 99999,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16161a",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
});
