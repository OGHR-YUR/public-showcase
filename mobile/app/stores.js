import { Text } from "react-native";
import { Body, Header, Screen } from "../src/blocks";
import { storeNote } from "../src/catalog";
import { useTheme } from "../src/theme";

export default function StoresScreen() {
  const { styles } = useTheme();
  return (
    <Screen>
      <Header back />
      <Body testID="screen-stores">
        <Text style={styles.kicker}>App Store and Google Play</Text>
        <Text style={styles.title}>Not submitted</Text>
        <Text style={styles.lede}>{storeNote}</Text>
        <Text style={styles.fine}>
          iPhone and Android ship from this one Expo project. Nothing has been sent to App Store Connect or the Play Console.
        </Text>
      </Body>
    </Screen>
  );
}
