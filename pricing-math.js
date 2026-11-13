/* Integer-cent tax and deposit for the website and the phone app.
   Card tax is a separate line. Cash tax is zero.
   Deposit is depositPercent of the price after that tax.
   Math.round matches the website: 8.45% of $200.00 is $16.90. */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.OG_PRICING = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function calcFromCents(baseCents, pay, policies) {
    var taxBp = Math.round(policies.taxPercent * 100);
    var depBp = Math.round(policies.depositPercent * 100);
    var tax = pay === "card" ? Math.round(baseCents * taxBp / 10000) : 0;
    var total = baseCents + tax;
    var deposit = Math.round(total * depBp / 10000);
    return { base: baseCents, tax: tax, total: total, deposit: deposit };
  }

  function calcTotals(amountDollars, pay, policies) {
    return calcFromCents(Math.round(Number(amountDollars) * 100), pay, policies);
  }

  return { calcFromCents: calcFromCents, calcTotals: calcTotals };
});
