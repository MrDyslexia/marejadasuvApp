import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import * as NavigationBar from "expo-navigation-bar";
import { useColorScheme } from "@/hooks/useColorScheme";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
NavigationBar.setVisibilityAsync("hidden");
NavigationBar.setPositionAsync("absolute");
NavigationBar.setBehaviorAsync("overlay-swipe");
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="light" hidden />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false,orientation: "portrait", }} />
        <Stack.Screen name="(offline)" options={{ headerShown: false,orientation: "portrait",}} />
        <Stack.Screen name="(online)" options={{ headerShown: false,orientation: "portrait"}} />
        <Stack.Screen
          name="pd_modal"
          options={{
            headerShown: false,
            presentation: "modal",
            orientation: "portrait",
          }}
        />
        <Stack.Screen
          name="acc_modal"
          options={{
            headerShown: false,
            presentation: "modal",
            orientation: "portrait",
          }}
        />
        <Stack.Screen
          name="img_expand"
          options={{
            headerShown: false,
            presentation: "modal",
            orientation: "all",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
