import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

type LoadingIndicatorProps = {
  message?: string;
};

export default function LoadingIndicator({
  message = "Loading your tasks...",
}: LoadingIndicatorProps) {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <View style={homeStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={homeStyles.loadingText}>{message}</Text>
      </View>
    </LinearGradient>
  );
}
