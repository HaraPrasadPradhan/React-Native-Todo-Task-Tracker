import { ThemeProvider } from "@/hooks/useTheme";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
const convex = convexUrl
  ? new ConvexReactClient(convexUrl, { unsavedChangesWarning: false })
  : null;

function MissingConvexUrl() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>
        Missing EXPO_PUBLIC_CONVEX_URL
      </Text>
      <Text style={{ textAlign: "center" }}>
        Add it to your `.env.local` (or Expo env) and restart `expo start`.
      </Text>
    </View>
  );
}

export default function RootLayout() {
  if (!convex) return <MissingConvexUrl />;
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
  );
}
