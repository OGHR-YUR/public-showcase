/* ============================================================
   O.G. SITE CONFIG — edit this file only
   Prices, tax, deposit, cancellation cutoff, contacts,
   booking links, and ticket links all live here.
   Leave every booking URL and ticket URL as "" until you
   paste the real link. Do not put a placeholder URL here.
   ============================================================ */
window.OG_CONFIG = {
  publicName: "Oscar G.",

  phoneDisplay: "385-346-8125",
  /* E.164 number used for sms: links. Display stays phoneDisplay. */
  phoneSms: "+13853468125",

  emails: {
    detailing: "o.g.autospa.services@gmail.com",
    filmingAndEdits: "ogproductions385@gmail.com",
    /* Planned catalog inbox. INACTIVE — the site does not show this address. */
    products: "ogproducts385@gmail.com",
    productsPublic: false
  },

  serviceArea: {
    base: "Kearns, UT",
    freeRadiusMiles: 30
  },

  /*
    Card payments add this rate as its own line in the booking summary.
    Cash has no tax. Salt Lake City combined rate, Utah Tax Commission
    location code 18-122, as of April 1, 2026.
    Edit taxPercent as a percent (8.45 means 8.45%).
  */
  policies: {
    taxPercent: 8.45,
    taxLocationCode: "18-122",
    taxAsOf: "2026-04-01",
    taxPlace: "Salt Lake City combined",
    /* Deposit is this percent of the service price AFTER tax. */
    depositPercent: 50,
    /* Hours before the appointment. */
    cancellationCutoffHours: 8
  },

  /*
    One shared Acuity calendar for detailing, filming, and editing.
    Each key is one appointment type. Paste that type's full URL, or
    leave "" and the button falls back to a text message.
  */
  bookingUrls: {
    standardInteriorExterior: "",
    premiumInteriorExterior: "",
    exteriorOnly: "",
    maintenance: "",
    ceramicCoating12Month: "",
    ceramicCoating3to5Year: "",
    wheelCeramicCoating: "",
    interiorLeatherCeramicCoating: "",
    maintenanceDetail: "",
    interiorExteriorWash: "",
    polishOnly: "",
    polishAndWax: "",
    deepInterior: "",
    signatureDetail: "",
    paintCorrection: "",
    interiorRestoration: "",
    windowTint: "",
    wraps: "",
    semis: "",
    filming: "",
    podcastEditing: "",
    eventEditing: "",
    consultationPhone15: "",
    consultationInPerson: "",
    /* Already on the site, not part of the required slot list. */
    engineBay: "",
    commercialAccounts: ""
  },

  /* Every show is ticketed. Paste a ticket URL or leave "". */
  ticketUrls: {
    losVakerosOct30: "",
    theDescentOct31: "",
    micheladaFestNov1: "",
    losVakerosNov7: "",
    loveOnTheBlockNov22: ""
  },

  catalog: {
    /* Affiliate catalog. This site links out. It does not check out. */
    url: "https://ogproducts.netlify.app",
    pickCount: 134
  },

  /*
    Merch stays on Shopify. The store password stays on until you
    fully release it — do not remove that password in Shopify.
    Product URLs can stay "" and the buttons use storeUrl.
  */
  shopify: {
    storeUrl: "https://11u81s-f0.myshopify.com",
    passwordProtected: true,
    racingTeeUrl: "",
    hoodieUrl: "",
    shoulderBagsUrl: ""
  },

  /*
    Published offers already on the site. They come off the final
    total when the customer mentions them. They are not subtracted
    from the starting price on the menu.
  */
  offers: {
    firstDetailOff: 25,
    responderMilitaryPercent: 10
  },

  fees: {
    /* Flat fee added to the balance when a detailing appointment starts after this time. */
    detailingAfterHours: 50,
    detailingAfterHoursAfter: "8 PM",
    filmingMidweek: 50,
    filmingExtraHour: 100,
    filmingHoursIncluded: 4
  },

  /*
    kind:
      "tiers"    — customer picks a vehicle class in the summary
      "starting" — one starting price
      "listed"   — a listed edit price (may still vary; see note)
      "label"    — text only, such as a range
      "quote"    — contact for a quote; no dollar amount
    Coupes use the sedan price. Regular cabs and extended cabs are
    not separate rows; trucks are midsize/small or large.
  */
  prices: {
    exteriorOnly: {
      kind: "tiers",
      tiers: [
        { id: "sedan-or-mid-small", label: "Sedan or midsize/small truck", amount: 85 },
        { id: "large", label: "Large SUV, three-row, van, or large truck", amount: 105 }
      ]
    },
    standardInteriorExterior: {
      kind: "tiers",
      tiers: [
        { id: "sedan", label: "Sedan", amount: 190 },
        { id: "mid-small", label: "Midsize or small truck", amount: 200 },
        { id: "large", label: "Large or three-row", amount: 220 }
      ]
    },
    premiumInteriorExterior: {
      kind: "tiers",
      tiers: [
        { id: "sedan", label: "Sedan", amount: 250 },
        { id: "mid-small", label: "Midsize or small truck", amount: 280 },
        { id: "large", label: "Large or three-row", amount: 315 }
      ]
    },
    maintenance: { kind: "quote" },
    maintenanceDetail: { kind: "starting", amount: 120, qualifier: "for sedans" },
    interiorExteriorWash: { kind: "starting", amount: 250 },
    deepInterior: { kind: "starting", amount: 140 },
    signatureDetail: { kind: "quote" },
    paintCorrection: { kind: "quote" },
    interiorRestoration: { kind: "starting", amount: 250 },
    polishOnly: { kind: "starting", amount: 300 },
    polishAndWax: { kind: "starting", amount: 350 },
    ceramicCoating12Month: { kind: "starting", amount: 850 },
    ceramicCoating3to5Year: { kind: "starting", amount: 850 },
    wheelCeramicCoating: { kind: "starting", amount: 75, qualifier: "each wheel" },
    interiorLeatherCeramicCoating: {
      kind: "tiers",
      tiers: [
        { id: "small-cars", label: "Small cars", amount: 320 },
        { id: "small-suvs", label: "Small SUVs", amount: 340 },
        { id: "suvs-vans", label: "SUVs or vans", amount: 360 },
        { id: "trucks", label: "Trucks", amount: 340 }
      ]
    },
    windowTint: { kind: "starting", amount: 350 },
    wraps: { kind: "quote" },
    semis: {
      kind: "tiers",
      tiers: [
        { id: "twin", label: "Twin cabs", amount: 250 },
        { id: "sleeper", label: "Sleepers", amount: 350 }
      ]
    },
    engineBay: { kind: "starting", amount: 50 },
    commercialAccounts: { kind: "quote" },

    filmingConcert: { kind: "starting", amount: 500 },
    filmingClub: { kind: "starting", amount: 350 },
    filmingPrivate: { kind: "starting", amount: 500 },
    filmingCommunity: { kind: "starting", amount: 350 },
    filmingBirthday: { kind: "starting", amount: 350 },
    filmingOther: { kind: "starting", amount: 350 },

    podcast30Basic: { kind: "listed", amount: 100 },
    podcast30Standard: { kind: "listed", amount: 150 },
    podcast30Premium: { kind: "listed", amount: 225 },
    podcast60Basic: { kind: "listed", amount: 150 },
    podcast60Standard: { kind: "listed", amount: 225 },
    podcast60Premium: { kind: "listed", amount: 350 },
    podcast120Basic: { kind: "listed", amount: 250 },
    podcast120Standard: { kind: "listed", amount: 350 },
    podcast120Premium: { kind: "listed", amount: 500 },
    podcastStarter: { kind: "listed", amount: 350, qualifier: "/month" },
    podcastGrowth: { kind: "listed", amount: 800, qualifier: "/month" },
    podcastPro: { kind: "listed", amount: 1250, qualifier: "/month" },

    eventBasic: { kind: "listed", amount: 200 },
    eventStandard: { kind: "listed", amount: 250 },
    eventPremium: { kind: "listed", amount: 400 },

    addon3Clips: { kind: "label", label: "$75" },
    addon5Clips: { kind: "label", label: "$125" },
    addon10Clips: { kind: "label", label: "$225" },
    addonThumbnail: { kind: "label", label: "$25–$50" },
    addonCaptions: { kind: "label", label: "$25–$75" },
    addonIntro: { kind: "label", label: "$75–$200" },
    addonRush: { kind: "label", label: "Additional 25–50%" },
    addonRevision: { kind: "label", label: "$40–$75" },

    partnerBasic: { kind: "listed", amount: 800, qualifier: "one-time" },
    partnerBooking: { kind: "listed", amount: 1200, qualifier: "one-time" },

    shoulderBag: { kind: "listed", amount: 180 }
  },

  /*
    What the booking summary knows about each button.
    bookingUrlKey must match a key in bookingUrls.
    needsUtility is the water-and-power choice (detailing only).
  */
  services: {
    exteriorOnly: {
      name: "Exterior Only",
      group: "detail",
      bookingUrlKey: "exteriorOnly",
      priceKey: "exteriorOnly",
      needsUtility: true
    },
    standardInteriorExterior: {
      name: "Standard Interior & Exterior",
      group: "detail",
      bookingUrlKey: "standardInteriorExterior",
      priceKey: "standardInteriorExterior",
      needsUtility: true
    },
    premiumInteriorExterior: {
      name: "Premium Interior & Exterior",
      group: "detail",
      bookingUrlKey: "premiumInteriorExterior",
      priceKey: "premiumInteriorExterior",
      needsUtility: true
    },
    maintenance: {
      name: "Maintenance",
      group: "detail",
      bookingUrlKey: "maintenance",
      priceKey: "maintenance",
      needsUtility: true
    },
    maintenanceDetail: {
      name: "Maintenance Detail",
      group: "detail",
      bookingUrlKey: "maintenanceDetail",
      priceKey: "maintenanceDetail",
      needsUtility: true
    },
    interiorExteriorWash: {
      name: "Interior & Exterior Wash",
      group: "detail",
      bookingUrlKey: "interiorExteriorWash",
      priceKey: "interiorExteriorWash",
      needsUtility: true
    },
    deepInterior: {
      name: "Deep Interior",
      group: "detail",
      bookingUrlKey: "deepInterior",
      priceKey: "deepInterior",
      needsUtility: true
    },
    signatureDetail: {
      name: "Signature Detail",
      group: "detail",
      bookingUrlKey: "signatureDetail",
      priceKey: "signatureDetail",
      needsUtility: true
    },
    paintCorrection: {
      name: "Paint Correction",
      group: "detail",
      bookingUrlKey: "paintCorrection",
      priceKey: "paintCorrection",
      needsUtility: true
    },
    interiorRestoration: {
      name: "Interior Restoration",
      group: "detail",
      bookingUrlKey: "interiorRestoration",
      priceKey: "interiorRestoration",
      needsUtility: true
    },
    polishOnly: {
      name: "Polish Only",
      group: "detail",
      bookingUrlKey: "polishOnly",
      priceKey: "polishOnly",
      needsUtility: true
    },
    polishAndWax: {
      name: "Polish & Wax",
      group: "detail",
      bookingUrlKey: "polishAndWax",
      priceKey: "polishAndWax",
      needsUtility: true
    },
    ceramicCoating12Month: {
      name: "Ceramic Coating — 12 Month",
      group: "detail",
      bookingUrlKey: "ceramicCoating12Month",
      priceKey: "ceramicCoating12Month",
      needsUtility: true
    },
    ceramicCoating3to5Year: {
      name: "Ceramic Coating — 3 to 5 Year",
      group: "detail",
      bookingUrlKey: "ceramicCoating3to5Year",
      priceKey: "ceramicCoating3to5Year",
      needsUtility: true
    },
    wheelCeramicCoating: {
      name: "Wheel Ceramic Coating",
      group: "detail",
      bookingUrlKey: "wheelCeramicCoating",
      priceKey: "wheelCeramicCoating",
      needsUtility: true
    },
    interiorLeatherCeramicCoating: {
      name: "Interior Leather Ceramic Coating",
      group: "detail",
      bookingUrlKey: "interiorLeatherCeramicCoating",
      priceKey: "interiorLeatherCeramicCoating",
      needsUtility: true
    },
    windowTint: {
      name: "Window Tint",
      group: "detail",
      bookingUrlKey: "windowTint",
      priceKey: "windowTint",
      needsUtility: true
    },
    wraps: {
      name: "Wraps",
      group: "detail",
      bookingUrlKey: "wraps",
      priceKey: "wraps",
      needsUtility: true
    },
    semis: {
      name: "Semis",
      group: "detail",
      bookingUrlKey: "semis",
      priceKey: "semis",
      needsUtility: true
    },
    engineBay: {
      name: "Engine Bay Cleaning",
      group: "detail",
      bookingUrlKey: "engineBay",
      priceKey: "engineBay",
      needsUtility: true
    },
    commercialAccounts: {
      name: "Commercial Accounts",
      group: "detail",
      bookingUrlKey: "commercialAccounts",
      priceKey: "commercialAccounts",
      needsUtility: true
    },
    filmingConcert: {
      name: "Filming — Concert / Live Show",
      group: "film",
      bookingUrlKey: "filming",
      priceKey: "filmingConcert",
      needsUtility: false
    },
    filmingClub: {
      name: "Filming — Club / Bar",
      group: "film",
      bookingUrlKey: "filming",
      priceKey: "filmingClub",
      needsUtility: false
    },
    filmingPrivate: {
      name: "Filming — Private Event",
      group: "film",
      bookingUrlKey: "filming",
      priceKey: "filmingPrivate",
      needsUtility: false
    },
    filmingCommunity: {
      name: "Filming — Community Event",
      group: "film",
      bookingUrlKey: "filming",
      priceKey: "filmingCommunity",
      needsUtility: false
    },
    filmingBirthday: {
      name: "Filming — Birthday",
      group: "film",
      bookingUrlKey: "filming",
      priceKey: "filmingBirthday",
      needsUtility: false
    },
    filmingOther: {
      name: "Filming — Other Event",
      group: "film",
      bookingUrlKey: "filming",
      priceKey: "filmingOther",
      needsUtility: false
    },
    podcast30Basic: { name: "30-Minute Podcast — Basic Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast30Basic", needsUtility: false },
    podcast30Standard: { name: "30-Minute Podcast — Standard Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast30Standard", needsUtility: false },
    podcast30Premium: { name: "30-Minute Podcast — Premium Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast30Premium", needsUtility: false },
    podcast60Basic: { name: "1-Hour Podcast — Basic Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast60Basic", needsUtility: false },
    podcast60Standard: { name: "1-Hour Podcast — Standard Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast60Standard", needsUtility: false },
    podcast60Premium: { name: "1-Hour Podcast — Premium Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast60Premium", needsUtility: false },
    podcast120Basic: { name: "2-Hour Podcast — Basic Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast120Basic", needsUtility: false },
    podcast120Standard: { name: "2-Hour Podcast — Standard Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast120Standard", needsUtility: false },
    podcast120Premium: { name: "2-Hour Podcast — Premium Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast120Premium", needsUtility: false },
    podcastStarter: { name: "Podcast monthly — Starter", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcastStarter", needsUtility: false },
    podcastGrowth: { name: "Podcast monthly — Growth", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcastGrowth", needsUtility: false },
    podcastPro: { name: "Podcast monthly — Pro", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcastPro", needsUtility: false },
    eventBasic: { name: "Event Editing — Basic Edit", group: "edit", bookingUrlKey: "eventEditing", priceKey: "eventBasic", needsUtility: false },
    eventStandard: { name: "Event Editing — Standard Edit", group: "edit", bookingUrlKey: "eventEditing", priceKey: "eventStandard", needsUtility: false },
    eventPremium: { name: "Event Editing — Premium Edit", group: "edit", bookingUrlKey: "eventEditing", priceKey: "eventPremium", needsUtility: false }
  },

  shows: [
    { id: "losVakerosOct30", name: "Los Vakeros", month: "Oct", day: "30", dow: "Friday", year: "2026", note: "Filming the full set live." },
    { id: "theDescentOct31", name: "The Descent", month: "Oct", day: "31", dow: "Saturday", year: "2026", note: "Filming the full set live. Mac Castro Presents." },
    { id: "micheladaFestNov1", name: "Michelada Fest", month: "Nov", day: "1", dow: "Sunday", year: "2026", note: "Filming live · 801 Event Center, 1055 W North Temple, Salt Lake City · 4 PM–12 AM" },
    { id: "losVakerosNov7", name: "Los Vakeros", month: "Nov", day: "7", dow: "Saturday", year: "2026", note: "Filming the full set live." },
    { id: "loveOnTheBlockNov22", name: "Love On The Block", month: "Nov", day: "22", dow: "Sunday", year: "2026", note: "Filming the full set live." }
  ],

  bags: [
    { name: "Pink Signature-Style Shoulder Bag", image: "bag-1.jpg" },
    { name: "Light Pink Signature-Style Shoulder Bag", image: "bag-2.jpg" },
    { name: "Cherry Print Shoulder Bag – Tan", image: "bag-3.jpg" },
    { name: "Cherry Print Shoulder Bag – Navy", image: "bag-4.jpg" },
    { name: "Black Signature-Style Shoulder Bag", image: "bag-5.jpg" },
    { name: "Brown Signature-Style Shoulder Bag – Black Trim", image: "bag-6.jpg" },
    { name: "Brown Signature-Style Shoulder Bag – Saddle Trim", image: "bag-7.jpg" },
    { name: "Cream Signature-Style Shoulder Bag – Taupe Trim", image: "bag-8.jpg" }
  ]
};
