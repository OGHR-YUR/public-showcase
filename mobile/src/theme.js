import { createContext, useContext, useMemo } from "react";
import { StyleSheet, useColorScheme } from "react-native";

const light = {
  bg: "#f4f1ec",
  raised: "#ffffff",
  ink: "#191817",
  soft: "#4c4741",
  line: "#ddd6cb",
  accent: "#c8102e",
  accentInk: "#ffffff",
  chip: "#e9e3d8",
  tint: "#fde8ec",
  frame: "#e6dfd4",
};

const dark = {
  bg: "#121110",
  raised: "#1c1a18",
  ink: "#f2ede6",
  soft: "#b6aea2",
  line: "#332f2b",
  accent: "#e8334f",
  accentInk: "#ffffff",
  chip: "#262320",
  tint: "#3a2228",
  frame: "#0c0b0a",
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? dark : light;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const value = useMemo(() => ({ colors: colors, styles: styles, scheme: scheme === "dark" ? "dark" : "light" }), [colors, styles, scheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("ThemeProvider is missing");
  return value;
}

function createStyles(c) {
  return StyleSheet.create({
    frame: { flex: 1, minHeight: "100%", backgroundColor: c.frame, alignItems: "center" },
    column: { flex: 1, width: "100%", maxWidth: 480, backgroundColor: c.bg },
    safe: { flex: 1, backgroundColor: c.bg },
    scroll: { paddingHorizontal: 20, paddingBottom: 36 },
    header: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: c.line,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    back: { paddingVertical: 8, paddingRight: 4, minHeight: 44, justifyContent: "center" },
    backText: { fontFamily: "BarlowCondensed_600SemiBold", fontSize: 16, letterSpacing: 1.2, textTransform: "uppercase", color: c.accent },
    brand: { flex: 1, fontFamily: "BarlowCondensed_700Bold", fontSize: 22, letterSpacing: 0.6, textTransform: "uppercase", color: c.ink },
    brandAccent: { color: c.accent },
    phone: { fontFamily: "Barlow_600SemiBold", fontSize: 15, color: c.ink },
    kicker: {
      fontFamily: "Barlow_600SemiBold",
      fontSize: 12,
      letterSpacing: 1.8,
      textTransform: "uppercase",
      color: c.accent,
      marginTop: 22,
    },
    title: {
      fontFamily: "BarlowCondensed_700Bold",
      fontSize: 40,
      lineHeight: 42,
      letterSpacing: 0.2,
      textTransform: "uppercase",
      color: c.ink,
      marginTop: 4,
    },
    lede: { fontFamily: "Barlow_400Regular", fontSize: 17, lineHeight: 25, color: c.ink, marginTop: 12 },
    fine: { fontFamily: "Barlow_400Regular", fontSize: 15, lineHeight: 22, color: c.soft, marginTop: 8 },
    banner: {
      marginTop: 16,
      backgroundColor: c.chip,
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    bannerText: { fontFamily: "Barlow_500Medium", fontSize: 15, lineHeight: 22, color: c.ink },
    card: {
      marginTop: 12,
      backgroundColor: c.raised,
      borderWidth: 1,
      borderColor: c.line,
      borderRadius: 10,
      padding: 16,
    },
    cardPressed: { borderColor: c.accent },
    num: { fontFamily: "BarlowCondensed_600SemiBold", fontSize: 14, letterSpacing: 1.4, color: c.accent },
    cardTitle: { fontFamily: "BarlowCondensed_700Bold", fontSize: 26, lineHeight: 28, textTransform: "uppercase", color: c.ink, marginTop: 2 },
    tierRow: { flexDirection: "row", justifyContent: "space-between", gap: 12, marginTop: 8, alignItems: "flex-start" },
    tierLabel: { flex: 1, fontFamily: "Barlow_400Regular", fontSize: 15, lineHeight: 21, color: c.soft },
    tierPrice: { fontFamily: "Barlow_600SemiBold", fontSize: 16, color: c.ink },
    btn: {
      marginTop: 14,
      backgroundColor: c.accent,
      borderRadius: 4,
      minHeight: 52,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    btnPressed: { opacity: 0.88 },
    btnDisabled: { backgroundColor: c.chip },
    btnText: { fontFamily: "BarlowCondensed_600SemiBold", fontSize: 18, letterSpacing: 1.1, textTransform: "uppercase", color: c.accentInk },
    btnTextDisabled: { color: c.soft },
    ghost: {
      marginTop: 10,
      borderWidth: 1.5,
      borderColor: c.line,
      borderRadius: 4,
      minHeight: 52,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
      backgroundColor: c.raised,
    },
    ghostOn: { borderColor: c.accent, backgroundColor: c.tint },
    ghostText: { fontFamily: "Barlow_500Medium", fontSize: 16, lineHeight: 22, color: c.ink, textAlign: "center" },
    choice: {
      marginTop: 8,
      borderWidth: 1.5,
      borderColor: c.line,
      borderRadius: 8,
      minHeight: 52,
      paddingHorizontal: 14,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: c.raised,
    },
    choiceOn: { borderColor: c.accent, backgroundColor: c.tint },
    dot: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: c.line },
    dotOn: { borderColor: c.accent, backgroundColor: c.accent },
    choiceText: { flex: 1, fontFamily: "Barlow_500Medium", fontSize: 16, lineHeight: 22, color: c.ink },
    label: {
      marginTop: 20,
      fontFamily: "BarlowCondensed_600SemiBold",
      fontSize: 14,
      letterSpacing: 1.4,
      textTransform: "uppercase",
      color: c.soft,
    },
    math: { marginTop: 18, borderTopWidth: 3, borderTopColor: c.accent, paddingTop: 8 },
    mathRow: { flexDirection: "row", justifyContent: "space-between", gap: 12, paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: c.line },
    mathLabel: { flex: 1, fontFamily: "Barlow_400Regular", fontSize: 16, color: c.soft },
    mathValue: { fontFamily: "Barlow_600SemiBold", fontSize: 16, color: c.ink },
    mathStrong: { fontFamily: "BarlowCondensed_700Bold", fontSize: 22, color: c.ink },
    mathAccent: { color: c.accent },
    link: { fontFamily: "Barlow_600SemiBold", fontSize: 16, color: c.accent, marginTop: 8 },
  });
}
