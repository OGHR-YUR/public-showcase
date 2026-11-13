import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { View } from "react-native";
import { ThemeProvider, useTheme } from "../src/theme";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Barlow_400Regular: require("@expo-google-fonts/barlow/400Regular/Barlow_400Regular.ttf"),
    Barlow_500Medium: require("@expo-google-fonts/barlow/500Medium/Barlow_500Medium.ttf"),
    Barlow_600SemiBold: require("@expo-google-fonts/barlow/600SemiBold/Barlow_600SemiBold.ttf"),
    BarlowCondensed_600SemiBold: require("@expo-google-fonts/barlow-condensed/600SemiBold/BarlowCondensed_600SemiBold.ttf"),
    BarlowCondensed_700Bold: require("@expo-google-fonts/barlow-condensed/700Bold/BarlowCondensed_700Bold.ttf"),
  });

  if (!loaded && !error) {
    return <View style={{ flex: 1, backgroundColor: "#f4f1ec" }} />;
  }

  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  );
}

function Shell() {
  const { colors, styles, scheme } = useTheme();
  return (
    <View style={styles.frame}>
      <View style={styles.column}>
        <StatusBar style={scheme === "dark" ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.bg },
          }}
        />
      </View>
    </View>
  );
}
