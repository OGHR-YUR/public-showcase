const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { calcFromCents } = require("../../pricing-math");
const booking = require("../src/booking-logic");

const sedanSelection = {
  tierId: "sedan",
  pay: "card",
  acidWash: false,
  petHair: false,
  acidSize: "",
};

test("sedan standard interior and exterior, card", function () {
  const price = booking.config.prices.standardInteriorExterior;
  const sedan = price.tiers.find(function (tier) { return tier.id === "sedan"; });
  assert.equal(booking.config.policies.taxPercent, 8.45);
  assert.equal(booking.config.policies.depositPercent, 50);
  assert.equal(sedan.amount, 200);

  const quote = booking.checkoutFor("standardInteriorExterior", sedanSelection);
  assert.deepEqual(quote.parts.totals, { base: 20000, tax: 1690, total: 21690, deposit: 10845 });
  assert.deepEqual(quote.parts.totals, calcFromCents(20000, "card", booking.config.policies));
  assert.equal(booking.dollars(sedan.amount), "$200");
  assert.equal(booking.money(quote.parts.totals.tax), "$16.90");
  assert.equal(booking.money(quote.parts.totals.total), "$216.90");
  assert.equal(booking.money(quote.parts.totals.deposit), "$108.45");
  assert.equal(booking.money(quote.parts.service), "$200.00");

  const menu = quote.lines.map(function (line) { return line.label + " " + line.amount; }).join(" | ");
  assert.equal(menu.includes("tax"), false);
  assert.equal(menu.includes("16.90"), false);
  assert.equal(quote.lines.find(function (line) { return line.id === "sedan"; }).amount, "$200");

  const url = booking.config.bookingUrls.standardInteriorExterior.sedan;
  assert.equal(quote.url, url);
  assert.equal(url.includes("owner=40723502"), true);
  assert.equal(booking.config.acuityOwner, "40723502");

  const withAcid = booking.checkoutFor("standardInteriorExterior", {
    tierId: "sedan",
    pay: "card",
    acidWash: true,
    petHair: false,
    acidSize: "",
  });
  assert.equal(withAcid.url, url);
  assert.equal(withAcid.parts.acid, 4000);
  assert.equal(withAcid.parts.totals.base, 24000);

  console.log(JSON.stringify({
    path: "standard interior and exterior, sedan, card",
    base: "$200",
    tax: "$16.90",
    total: "$216.90",
    deposit: "$108.45",
    cents: quote.parts.totals,
    acuity: quote.url,
  }));
});

test("cash has no tax and the deposit is half the service price", function () {
  const quote = booking.checkoutFor("standardInteriorExterior", {
    tierId: "sedan",
    pay: "cash",
    acidWash: false,
    petHair: false,
    acidSize: "",
  });
  assert.deepEqual(quote.parts.totals, { base: 20000, tax: 0, total: 20000, deposit: 10000 });
  assert.equal(booking.money(quote.parts.totals.tax), "$0.00");
  assert.equal(booking.money(quote.parts.totals.deposit), "$100.00");
});

test("booking cannot be submitted until terms are agreed and detailing utility is chosen", function () {
  const detail = booking.checkoutFor("standardInteriorExterior", sedanSelection);
  assert.equal(booking.submitReady(detail, { agreed: false, utility: "supply" }), false);
  assert.equal(booking.submitReady(detail, { agreed: true, utility: "" }), false);
  assert.equal(booking.submitReady(detail, { agreed: true, utility: "supply" }), true);
  assert.equal(booking.submitReady(detail, { agreed: true, utility: "bring" }), true);

  const edit = booking.checkoutFor("podcast30Basic", {
    tierId: "",
    pay: "card",
    acidWash: false,
    petHair: false,
    acidSize: "",
  });
  assert.equal(edit.service.needsUtility, false);
  assert.equal(booking.submitReady(edit, { agreed: true, utility: "" }), true);
  assert.equal(booking.submitReady(edit, { agreed: false, utility: "" }), false);
  assert.equal(edit.parts.totals.base, 10000);
});

test("the app does not offer an 8-hour cancellation window", function () {
  const text = booking.termsParagraphs().join(" ");
  assert.equal(/8[ -]?hour/i.test(text), false);
  assert.match(text, /cannot cancel/i);
  assert.match(text, /reschedule/i);
  assert.match(text, /non-refundable/i);
  assert.match(text, /no exceptions/i);
  assert.match(text, /detailing, filming, and editing/i);
});

test("the website calls the shared cents math", function () {
  const root = path.resolve(__dirname, "../..");
  const site = fs.readFileSync(path.join(root, "site.js"), "utf8");
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.equal(site.includes("window.OG_PRICING.calcFromCents"), true);
  assert.equal(html.includes('src="pricing-math.js"'), true);
});
