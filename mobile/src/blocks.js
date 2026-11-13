import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { config, dollars, menuLines, money } from "./booking-logic";
import { openExternal } from "./open-link";
import { useTheme } from "./theme";

export function Screen({ children }) {
  const { styles } = useTheme();
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
      {children}
    </SafeAreaView>
  );
}

export function Header({ back }) {
  const { styles } = useTheme();
  const router = useRouter();
  return (
    <View style={styles.header}>
      {back ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      ) : null}
      <Text style={styles.brand} accessibilityRole="header">
        Oscar <Text style={styles.brandAccent}>G.</Text>
      </Text>
      <Pressable accessibilityRole="link" accessibilityLabel={"Text " + config.phoneDisplay} onPress={() => openExternal("sms:" + config.phoneSms)}>
        <Text style={styles.phone}>{config.phoneDisplay}</Text>
      </Pressable>
    </View>
  );
}

export function Body({ children, testID }) {
  const { styles } = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.scroll} testID={testID}>
      {children}
    </ScrollView>
  );
}

export function PrimaryButton({ label, onPress, disabled, testID }) {
  const { styles } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={!!disabled}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [styles.btn, disabled && styles.btnDisabled, pressed && !disabled && styles.btnPressed]}
    >
      <Text style={[styles.btnText, disabled && styles.btnTextDisabled]}>{label}</Text>
    </Pressable>
  );
}

export function Choice({ label, selected, onPress, testID, role }) {
  const { styles } = useTheme();
  return (
    <Pressable
      accessibilityRole={role || "radio"}
      accessibilityState={{ selected: !!selected, checked: !!selected }}
      onPress={onPress}
      testID={testID}
      style={[styles.choice, selected && styles.choiceOn]}
    >
      <View style={[styles.dot, selected && styles.dotOn]} />
      <Text style={styles.choiceText}>{label}</Text>
    </Pressable>
  );
}

export function PriceLines({ lines, testPrefix }) {
  const { styles } = useTheme();
  return lines.map(function (line) {
    const key = line.id || line.amount;
    return (
      <View key={key} style={styles.tierRow}>
        {line.label ? <Text style={styles.tierLabel}>{line.label}</Text> : null}
        <Text style={styles.tierPrice} testID={testPrefix && line.id ? testPrefix + "-" + line.id : undefined}>
          {line.amount}
        </Text>
      </View>
    );
  });
}

export function ServiceCard({ number, title, blurb, lines, action, onAction, priceTestID, bookTestID }) {
  const { styles } = useTheme();
  return (
    <View style={styles.card}>
      <Text style={styles.num}>{number}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      {blurb ? <Text style={styles.fine}>{blurb}</Text> : null}
      <PriceLines lines={lines} testPrefix={priceTestID} />
      {action ? <PrimaryButton label={action} onPress={onAction} testID={bookTestID} /> : null}
    </View>
  );
}

export function serviceLines(priceKey) {
  return menuLines(config.prices[priceKey]);
}

export function CheckoutMath({ quote, pay }) {
  const { styles } = useTheme();
  if (!quote || !quote.parts) return null;
  const totals = quote.parts.totals;
  const card = pay === "card";
  const taxLabel = card ? "Tax (" + config.policies.taxPercent + "%)" : "Tax";
  const spoken =
    "Service price " + money(quote.parts.service) +
    ", " + taxLabel + " " + money(totals.tax) +
    ", total " + money(totals.total) +
    ", deposit " + money(totals.deposit);
  return (
    <View style={styles.math} accessibilityLabel={spoken}>
      <Text style={styles.kicker}>Checkout</Text>
      <MathRow label="Service price" value={money(quote.parts.service)} testID="amount-service" />
      {quote.parts.acid ? <MathRow label="Acid wash" value={money(quote.parts.acid)} testID="amount-acid" /> : null}
      {quote.parts.pet ? <MathRow label="Pet hair removal" value={money(quote.parts.pet)} testID="amount-pet" /> : null}
      <MathRow label={taxLabel} value={money(totals.tax)} testID="amount-tax" />
      <MathRow label="Total" value={money(totals.total)} testID="amount-total" strong />
      <MathRow label={"Deposit due (" + config.policies.depositPercent + "%)"} value={money(totals.deposit)} testID="amount-deposit" strong accent />
      <Text style={styles.fine}>
        {card
          ? "Card tax is " + config.policies.taxPlace + " (" + config.policies.taxPercent + "%). The deposit is " + config.policies.depositPercent + "% of the total after tax."
          : "Cash has no tax. The deposit is " + config.policies.depositPercent + "% of the total."}
      </Text>
    </View>
  );
}

function MathRow({ label, value, testID, strong, accent }) {
  const { styles } = useTheme();
  return (
    <View style={styles.mathRow}>
      <Text style={[styles.mathLabel, strong && styles.mathStrong]}>{label}</Text>
      <Text testID={testID} style={[styles.mathValue, strong && styles.mathStrong, accent && styles.mathAccent]}>
        {value}
      </Text>
    </View>
  );
}

export function offerNote() {
  return (
    "First-time clients can mention " + dollars(config.offers.firstDetailOff) +
    " off a first full detail. First responders and military can mention " +
    config.offers.responderMilitaryPercent +
    "% off. Those come off the final total, not the starting price on this menu."
  );
}
