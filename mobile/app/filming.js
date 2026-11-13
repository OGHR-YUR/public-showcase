import { Text } from "react-native";
import { useRouter } from "expo-router";
import { Body, Header, Screen, ServiceCard, serviceLines } from "../src/blocks";
import { filmingMenu } from "../src/catalog";
import { config, dollars, policySentences } from "../src/booking-logic";
import { useTheme } from "../src/theme";

export default function FilmingScreen() {
  const { styles } = useTheme();
  const router = useRouter();
  return (
    <Screen>
      <Header back />
      <Body testID="screen-filming">
        <Text style={styles.kicker}>O.G.Productions</Text>
        <Text style={styles.title}>Filming</Text>
        <Text style={styles.lede}>
          Live show and event filming. Questions: {config.emails.filmingAndEdits}. These starting prices have no tax line. Card tax is added at checkout.
        </Text>
        <Text style={styles.fine}>
          Videography has no after-hours fee. Video events on Sunday through Wednesday morning, before noon, add {dollars(config.fees.filmingMidweek)}. The starting price covers {config.fees.filmingHoursIncluded} hours. Each additional hour is {dollars(config.fees.filmingExtraHour)}.
        </Text>
        {filmingMenu.map(function (item, index) {
          const service = config.services[item.id];
          return (
            <ServiceCard
              key={item.id}
              number={String(index + 1).padStart(2, "0")}
              title={service.name}
              blurb={item.blurb}
              lines={serviceLines(service.priceKey)}
              bookTestID={"book-" + item.id}
              action="Book"
              onAction={() => router.push({ pathname: "/summary", params: { service: item.id } })}
            />
          );
        })}
        {policySentences().map(function (sentence) {
          return <Text key={sentence} style={styles.fine}>{sentence}</Text>;
        })}
      </Body>
    </Screen>
  );
}
