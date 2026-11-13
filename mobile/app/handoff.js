import { useState } from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Body, CheckoutMath, Choice, Header, PrimaryButton, Screen } from "../src/blocks";
import {
  UTILITY,
  checkoutFor,
  config,
  selectionFromParams,
  smsBody,
  smsHref,
  submitReady,
  termsParagraphs,
} from "../src/booking-logic";
import { openExternal } from "../src/open-link";
import { useTheme } from "../src/theme";

export default function HandoffScreen() {
  const params = useLocalSearchParams();
  const serviceId = Array.isArray(params.service) ? params.service[0] : params.service;
  const selection = selectionFromParams(params);
  const quote = checkoutFor(serviceId, selection);
  const [agreed, setAgreed] = useState(false);
  const [utility, setUtility] = useState("");
  const [opened, setOpened] = useState(false);
  const { styles } = useTheme();

  if (!quote) {
    return (
      <Screen>
        <Header back />
        <Body>
          <Text style={styles.title}>Booking not found</Text>
        </Body>
      </Screen>
    );
  }

  const gates = { agreed: agreed, utility: utility };
  const ready = submitReady(quote, gates);
  const label = !quote.url ? "Text to book" : quote.service.quoteForm ? "Request a quote" : "Continue to book";

  function submit() {
    if (!submitReady(quote, { agreed: agreed, utility: utility })) return;
    const url = quote.url || smsHref(smsBody(quote, selection, utility));
    openExternal(url);
    setOpened(true);
  }

  return (
    <Screen>
      <Header back />
      <Body testID="screen-handoff">
        <Text style={styles.kicker}>Booking handoff</Text>
        <Text style={styles.title}>{quote.service.name}</Text>
        {quote.tier ? <Text style={styles.lede}>{quote.tier.label}</Text> : null}
        <Text style={styles.fine}>
          {quote.url
            ? "This opens the existing Acuity page for this service. The app does not collect a card number, and it does not charge the deposit."
            : "This service does not have an Acuity link yet. Texting Oscar is the backup. No card number is collected here."}
        </Text>

        <CheckoutMath quote={quote} pay={selection.pay} />

        {selection.acidWash ? (
          <Text style={styles.fine}>Acid wash is a site add-on. It uses the same Acuity link as this service.</Text>
        ) : null}

        {quote.service.needsUtility ? (
          <>
            <Text style={styles.label}>Water and electricity</Text>
            <Text style={styles.fine}>Choose one. The booking cannot be submitted until you do.</Text>
            {UTILITY.map(function (option) {
              return (
                <Choice
                  key={option.id}
                  testID={"utility-" + option.id}
                  label={option.label}
                  selected={utility === option.id}
                  onPress={() => setUtility(option.id)}
                />
              );
            })}
            <Text style={styles.fine}>
              No travel fee within {config.serviceArea.freeRadiusMiles} miles of {config.serviceArea.base}. Outside that, a travel fee applies and is quoted when you book.
            </Text>
          </>
        ) : null}

        <Text style={styles.label}>Terms</Text>
        {termsParagraphs().map(function (paragraph) {
          return <Text key={paragraph} style={styles.fine}>{paragraph}</Text>;
        })}
        <PrimaryButton
          testID="agree-terms"
          label={agreed ? "Agreed to the terms" : "I agree to the terms"}
          onPress={() => setAgreed(function (current) { return !current; })}
        />

        <PrimaryButton testID="submit-book" label={label} disabled={!ready} onPress={submit} />
        {!ready ? (
          <Text style={styles.fine}>
            {quote.service.needsUtility && !utility ? "Choose water and electricity, or that Oscar brings his own. " : ""}
            {!agreed ? "Agree to the terms before submitting." : ""}
          </Text>
        ) : null}
        {opened ? (
          <Text style={styles.lede} testID="handoff-opened">
            {quote.url
              ? "Acuity opened in the browser. Finish the date there. You cannot cancel. If you reschedule, the deposit rolls over."
              : "Your text app should open with these details. If it does not, text " + config.phoneDisplay + "."}
          </Text>
        ) : null}
        {quote.url ? <Text style={styles.fine} testID="acuity-url">{quote.url}</Text> : null}
      </Body>
    </Screen>
  );
}
