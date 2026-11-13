/* Shared behavior for the static front door. Reads window.OG_CONFIG. */
(function () {
  var OG = window.OG_CONFIG;
  if (!OG) return;

  function cleanUrl(url) {
    if (typeof url !== "string") return "";
    var value = url.trim();
    if (!/^https?:\/\//i.test(value)) return "";
    return value;
  }

  /* Sized services store a URL per vehicle id. Everything else is one string. */
  function resolveBookingUrl(svc, tier) {
    var raw = OG.bookingUrls[svc.bookingUrlKey];
    if (raw && typeof raw === "object") {
      if (tier && raw[tier.id]) return cleanUrl(raw[tier.id]);
      return "";
    }
    return cleanUrl(raw);
  }

  function dollars(amount) {
    var n = Number(amount);
    return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }

  function money(cents) {
    var n = Math.abs(cents);
    var whole = Math.floor(n / 100);
    var frac = n % 100;
    return (cents < 0 ? "-" : "") + "$" + whole.toLocaleString("en-US") + "." + (frac < 10 ? "0" : "") + frac;
  }

  /* Tax and deposit use integer cents so 8.45% doesn't drift.
     The formula is in pricing-math.js, loaded before this file.
     The phone app imports that same file. */
  function calcFromCents(baseCents, pay) {
    return window.OG_PRICING.calcFromCents(baseCents, pay, OG.policies);
  }

  function calcTotals(amountDollars, pay) {
    return window.OG_PRICING.calcTotals(amountDollars, pay, OG.policies);
  }

  window.OG_CALC = calcTotals;

  function priceRecord(key) {
    return OG.prices[key] || null;
  }

  function priceText(key) {
    var price = priceRecord(key);
    if (!price) return "";
    if (price.kind === "quote") return "Contact for quote · Starting price on request";
    if (price.kind === "label") return price.label;
    if (price.kind === "tiers") {
      return price.tiers.map(function (tier) {
        return tier.label + " " + dollars(tier.amount);
      }).join(" · ");
    }
    var text = (price.kind === "starting" ? "Starting at " : "") + dollars(price.amount);
    if (price.qualifier) text += " " + price.qualifier;
    return text;
  }

  function smsHref(body) {
    return "sms:" + OG.phoneSms + "?&body=" + encodeURIComponent(body);
  }

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function utilityLabel(value) {
    if (value === "supply") return "I can supply water and power";
    if (value === "bring") return "I prefer Oscar brings his own water and power source";
    return "";
  }

  /* ---------- fill numbers from config ---------- */
  document.querySelectorAll("[data-price-key]").forEach(function (el) {
    var key = el.getAttribute("data-price-key");
    var price = priceRecord(key);
    if (!price) return;
    if (el.classList.contains("price") && price.amount != null && price.kind !== "quote") {
      el.innerHTML = dollars(price.amount) + (price.qualifier ? " <span>" + price.qualifier + "</span>" : "");
      return;
    }
    el.textContent = priceText(key);
  });

  document.querySelectorAll("[data-tiers]").forEach(function (el) {
    var price = priceRecord(el.getAttribute("data-tiers"));
    if (!price || !price.tiers) return;
    var html = '<ul class="tier-list">';
    price.tiers.forEach(function (tier) {
      html += "<li><span>" + esc(tier.label) + "</span><strong>" + dollars(tier.amount) + "</strong></li>";
    });
    html += "</ul>";
    el.innerHTML = html;
  });

  document.querySelectorAll("[data-fee]").forEach(function (el) {
    var amount = OG.fees[el.getAttribute("data-fee")];
    if (amount == null) return;
    el.textContent = dollars(amount);
  });

  document.querySelectorAll("[data-fee-text]").forEach(function (el) {
    var value = OG.fees[el.getAttribute("data-fee-text")];
    if (value == null) return;
    el.textContent = String(value);
  });

  document.querySelectorAll("[data-fee-plain]").forEach(function (el) {
    var amount = OG.fees[el.getAttribute("data-fee-plain")];
    if (amount == null) return;
    el.textContent = String(amount);
  });

  document.querySelectorAll("[data-offer]").forEach(function (el) {
    var key = el.getAttribute("data-offer");
    var amount = OG.offers[key];
    if (amount == null) return;
    el.textContent = key === "responderMilitaryPercent" ? String(amount) + "%" : dollars(amount);
  });

  document.querySelectorAll("[data-policy]").forEach(function (el) {
    var key = el.getAttribute("data-policy");
    if (key === "depositPercent") el.textContent = String(OG.policies.depositPercent) + "%";
    if (key === "cutoff") el.textContent = String(OG.policies.cancellationCutoffHours) + " hours";
    if (key === "taxPercent") el.textContent = String(OG.policies.taxPercent) + "%";
    if (key === "taxPlace") el.textContent = OG.policies.taxPlace;
    if (key === "taxCode") el.textContent = OG.policies.taxLocationCode;
    if (key === "miles") el.textContent = String(OG.serviceArea.freeRadiusMiles);
    if (key === "base") el.textContent = OG.serviceArea.base;
    if (key === "name") el.textContent = OG.publicName;
  });

  document.querySelectorAll(".js-phone").forEach(function (el) {
    el.textContent = el.getAttribute("data-phone-label") || OG.phoneDisplay;
    if (el.tagName === "A" && !el.getAttribute("data-keep-href")) {
      el.setAttribute("href", "sms:" + OG.phoneSms);
    }
  });

  document.querySelectorAll(".js-email-detail").forEach(function (el) {
    el.textContent = OG.emails.detailing;
    el.setAttribute("href", "mailto:" + OG.emails.detailing);
  });

  document.querySelectorAll(".js-email-film").forEach(function (el) {
    el.textContent = OG.emails.filmingAndEdits;
    el.setAttribute("href", "mailto:" + OG.emails.filmingAndEdits);
  });

  /* Products inbox stays in config and off the page while productsPublic is false. */
  if (OG.emails.productsPublic) {
    document.querySelectorAll(".js-email-products").forEach(function (el) {
      el.hidden = false;
      el.textContent = OG.emails.products;
      if (el.tagName === "A") el.setAttribute("href", "mailto:" + OG.emails.products);
    });
  }

  function applyConsultLink(el) {
    var key = el.getAttribute("data-consult");
    var url = cleanUrl(OG.bookingUrls[key]);
    if (url) {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
      el.textContent = el.getAttribute("data-book-label") || "Book a free consultation";
    } else {
      el.setAttribute("href", "sms:" + OG.phoneSms);
      el.removeAttribute("target");
      el.setAttribute("rel", "noopener");
      el.textContent = el.getAttribute("data-text-label") || ("Free Consultation · Text " + OG.phoneDisplay);
    }
  }

  document.querySelectorAll(".js-consult").forEach(applyConsultLink);

  var generalSchedule = document.getElementById("generalSchedule");
  if (generalSchedule && typeof OG.bookingUrls.general === "string" && cleanUrl(OG.bookingUrls.general)) {
    generalSchedule.setAttribute("href", OG.bookingUrls.general);
  }

  var phoneConsultUrl = cleanUrl(OG.bookingUrls.consultationPhone15);
  var textFlow = document.getElementById("consultTextFlow");
  var bookFlow = document.getElementById("consultBookFlow");
  if (textFlow) textFlow.hidden = !!phoneConsultUrl;
  if (bookFlow) bookFlow.hidden = !phoneConsultUrl;

  var eventList = document.getElementById("eventList");
  if (eventList && OG.shows) {
    OG.shows.forEach(function (show) {
      var article = document.createElement("article");
      article.className = "event";
      article.innerHTML =
        '<div class="event-date"><div class="dow">' + esc(show.dow) + '</div><div class="day">' + esc(show.day) +
        '</div><div class="mon">' + esc(show.month) + " " + esc(show.year) + "</div></div>" +
        "<div><h3>" + esc(show.name) + "</h3><p>" + esc(show.note) + "</p></div>";
      var btn = document.createElement("button");
      btn.className = "event-badge ticket-soon";
      btn.type = "button";
      btn.setAttribute("data-ticket", show.id);
      btn.textContent = "Tickets coming soon";
      article.appendChild(btn);
      eventList.appendChild(article);
    });
  }

  document.querySelectorAll("[data-ticket]").forEach(function (el) {
    var url = cleanUrl(OG.ticketUrls[el.getAttribute("data-ticket")]);
    if (url) {
      el.textContent = "Get tickets";
      el.disabled = false;
      if (el.tagName === "A") {
        el.setAttribute("href", url);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      } else {
        el.addEventListener("click", function () { window.open(url, "_blank", "noopener"); });
      }
    } else {
      el.textContent = "Tickets coming soon";
      if (el.tagName === "BUTTON") el.disabled = true;
      if (el.tagName === "A") {
        el.removeAttribute("href");
        el.setAttribute("role", "button");
        el.setAttribute("aria-disabled", "true");
      }
    }
  });

  var depositNote = "A " + OG.policies.depositPercent + "% deposit is required. It is " + OG.policies.depositPercent + "% of the service price after tax: card payments add tax first, and cash has no tax. The deposit is non-refundable, and it rolls over if you reschedule. Cancel at least " + OG.policies.cancellationCutoffHours + " hours before the appointment.";
  document.querySelectorAll("[data-deposit-note]").forEach(function (el) {
    el.textContent = depositNote;
  });

  /* ---------- tabs ---------- */
  var tabBtns = Array.prototype.slice.call(document.querySelectorAll(".tab-btn[data-tab]"));
  var tabPanels = Array.prototype.slice.call(document.querySelectorAll(".tab-panel"));
  var tabIds = tabPanels.map(function (panel) { return panel.id; });
  var stickyShell = document.querySelector(".sticky-shell");
  var heroImg = document.getElementById("heroImg");
  var heroDefault = { src: "assets/img-01.jpg", alt: "Red sports car with a mirror-gloss finish after a paint correction detail" };
  var heroByTab = {
    filming: { src: "assets/img-27.jpg", alt: "DJ set being recorded live" },
    podcast: { src: "assets/img-02.jpg", alt: "Video editing timeline on a screen — podcast footage being cut into a finished edit by O.G.Edits" },
    "event-editing": { src: "assets/img-02.jpg", alt: "Video editing timeline on a screen — event footage being cut into a finished edit by O.G.Edits" }
  };
  Object.keys(heroByTab).forEach(function (key) {
    var pre = new Image();
    pre.src = heroByTab[key].src;
  });

  function setHero(id) {
    if (!heroImg) return;
    var hero = heroByTab[id] || heroDefault;
    if (heroImg.getAttribute("src") !== hero.src) heroImg.setAttribute("src", hero.src);
    heroImg.setAttribute("alt", hero.alt);
  }

  var heroBrand = document.getElementById("heroBrand");
  var heroLoc = document.getElementById("heroLoc");
  var heroPartner = document.getElementById("heroPartner");
  var heroSponsor = document.getElementById("heroSponsor");
  var heroSub = document.getElementById("heroSub");
  var heroBio = {
    home: "Oscar G. runs four brands from this front door. <span class=\"hl\">O.G.AutoSpa</span> details vehicles where you are. <span class=\"hl\">O.G.Productions</span> films live shows. <span class=\"hl\">O.G.Edits</span> cuts video and podcasts. <span class=\"hl\">O.G.Products</span> is the catalog and the merch. Detailing, filming, and editing share one calendar, so those bookings don't overlap.",
    detailing: 'Detailing by O.G.AutoSpa, specializing in <span class="hl">high-end vehicles</span>, from exotics and sports cars to luxury daily drivers: polish and wax, restorations, ceramic coatings, tinting and wraps, interiors, semis, and commercial accounts.',
    productions: 'Filming and editing by O.G.Productions and O.G.Edits, specializing in <span class="hl">live shows and events</span>: concerts, club and bar nights, private events, community events, and birthdays, plus podcast and event editing.'
  };
  var heroBrandState = "";

  function brandKey(id) {
    if (id === "home") return "home";
    if (id === "filming" || id === "podcast" || id === "event-editing") return "productions";
    if (id === "services") return "detailing";
    return "both";
  }

  function setHeroBrand(id) {
    if (!heroBrand) return;
    var state = brandKey(id);
    if (heroLoc) heroLoc.hidden = id === "podcast";
    if (heroPartner) heroPartner.hidden = state !== "productions";
    if (heroSponsor) heroSponsor.hidden = state === "productions";
    if (state !== heroBrandState) {
      heroBrandState = state;
      if (state === "home") heroBrand.innerHTML = 'Oscar <span class="thin">G.</span>';
      else if (state === "productions") heroBrand.innerHTML = 'O.G. <span class="thin">Productions</span>';
      else if (state === "both") heroBrand.innerHTML = 'O.G.AutoSpa <span class="thin">&amp; Services</span><span class="thin">O.G. Productions</span>';
      else heroBrand.innerHTML = 'O.G.AutoSpa <span class="thin">&amp; Services</span>';
    }
    if (heroSub) {
      var bio = state === "home" ? heroBio.home : state === "productions" ? heroBio.productions : state === "detailing" ? heroBio.detailing : heroBio.detailing;
      if (state === "both") bio = heroBio.detailing + " Live shows filmed by O.G.Productions, cut by O.G.Edits.";
      if (heroSub.innerHTML !== bio) heroSub.innerHTML = bio;
      heroSub.classList.toggle("pop", state === "productions" || state === "home");
    }
    if (heroSponsor && state === "home") heroSponsor.textContent = "AutoSpa · Productions · Edits · Products";
    if (heroSponsor && state === "detailing") heroSponsor.textContent = "Proud sponsor of The RedLine Crew";
    if (heroSponsor && state === "both") heroSponsor.textContent = "Proud sponsor of The RedLine Crew";
  }

  var topBrand = document.getElementById("topBrand");
  var topBrandHtml = "";
  function setTopBrand(id) {
    if (!topBrand) return;
    var state = brandKey(id);
    var html = state === "home"
      ? 'Oscar <span>G.</span><span class="brand-second">AutoSpa · Productions · Edits · Products</span>'
      : state === "productions"
        ? 'O.G.<span>Productions</span>'
        : state === "detailing"
          ? 'O.G.<span>AutoSpa</span>'
          : 'O.G.<span>AutoSpa</span><span class="brand-second">Productions · Edits · Products</span>';
    if (html === topBrandHtml) return;
    topBrandHtml = html;
    topBrand.innerHTML = html;
  }

  function setBrandNav(id) {
    var current = id === "event-editing" ? "podcast" : id === "events" ? "filming" : id;
    document.querySelectorAll("[data-brand]").forEach(function (link) {
      if (link.getAttribute("data-brand") === current) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function activateTab(id, opts) {
    opts = opts || {};
    if (tabIds.indexOf(id) === -1) return false;
    setHero(id);
    setHeroBrand(id);
    setTopBrand(id);
    setBrandNav(id);
    tabPanels.forEach(function (panel) { panel.hidden = panel.id !== id; });
    tabBtns.forEach(function (btn) {
      var on = btn.getAttribute("data-tab") === id;
      btn.setAttribute("aria-selected", on ? "true" : "false");
      if (on && btn.scrollIntoView) {
        try { btn.scrollIntoView({ block: "nearest", inline: "center", behavior: "auto" }); } catch (err) {}
      }
    });
    if (opts.updateHash !== false) {
      try { history.replaceState(null, "", "#" + id); } catch (err) {}
    }
    if (opts.scroll) {
      var panel = document.getElementById(id);
      if (panel) {
        var offset = stickyShell ? stickyShell.offsetHeight : 0;
        var y = panel.getBoundingClientRect().top + window.pageYOffset - offset - 12;
        var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: Math.max(0, y), behavior: reduced ? "auto" : "smooth" });
      }
    }
    return true;
  }

  tabBtns.forEach(function (btn, idx) {
    btn.addEventListener("click", function () { activateTab(btn.getAttribute("data-tab"), { scroll: true }); });
    btn.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight") next = tabBtns[(idx + 1) % tabBtns.length];
      if (e.key === "ArrowLeft") next = tabBtns[(idx - 1 + tabBtns.length) % tabBtns.length];
      if (e.key === "Home") next = tabBtns[0];
      if (e.key === "End") next = tabBtns[tabBtns.length - 1];
      if (next) {
        e.preventDefault();
        next.focus();
        activateTab(next.getAttribute("data-tab"), { scroll: false });
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (!href || href === "#" || href === "#top") {
        if (href === "#top") {
          e.preventDefault();
          activateTab("home", { scroll: true });
        }
        return;
      }
      var id = href.slice(1);
      if (tabIds.indexOf(id) !== -1) {
        e.preventDefault();
        activateTab(id, { scroll: true });
      }
    });
  });

  document.querySelectorAll("[data-goto]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("data-goto");
      if (tabIds.indexOf(id) !== -1) {
        e.preventDefault();
        activateTab(id, { scroll: true });
      }
    });
  });

  (function () {
    var initial = (location.hash || "").replace("#", "");
    if (tabIds.indexOf(initial) !== -1) activateTab(initial, { updateHash: false, scroll: false });
    else if (tabIds.indexOf("home") !== -1) activateTab("home", { updateHash: false, scroll: false });
  })();

  /* ---------- portfolio filter ---------- */
  var chips = document.querySelectorAll(".chip");
  var works = document.querySelectorAll(".work");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (item) { item.setAttribute("aria-pressed", "false"); });
      chip.setAttribute("aria-pressed", "true");
      var filter = chip.getAttribute("data-filter");
      works.forEach(function (work) {
        work.hidden = !(filter === "all" || work.getAttribute("data-kind") === filter);
      });
    });
  });

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightboxImg = document.getElementById("lightboxImg");
    var lightboxCap = document.getElementById("lightboxCap");
    var lastFocus = null;
    function openLightbox(src, caption, alt) {
      lastFocus = document.activeElement;
      lightboxImg.src = src;
      lightboxImg.alt = alt || "";
      lightboxCap.textContent = caption || "";
      lightbox.classList.add("open");
      document.getElementById("lightboxClose").focus();
    }
    function closeLightbox() {
      lightbox.classList.remove("open");
      lightboxImg.removeAttribute("src");
      if (lastFocus) lastFocus.focus();
    }
    document.querySelectorAll(".work button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        openLightbox(btn.getAttribute("data-full"), btn.getAttribute("data-caption"), img ? img.alt : "");
      });
    });
    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });
  }

  /* ---------- consultation text sheet ---------- */
  var consultForm = document.getElementById("consultForm");
  if (consultForm) {
    consultForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cName").value.trim();
      var phone = document.getElementById("cPhone").value.trim();
      var email = document.getElementById("cEmail").value.trim();
      var reason = document.getElementById("cReason").value.trim();
      var dateVal = document.getElementById("cDate").value;
      var timeVal = document.getElementById("cTime").value;
      var when = "";
      if (dateVal) {
        var dp = dateVal.split("-");
        var d = new Date(+dp[0], +dp[1] - 1, +dp[2]);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        when = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
      }
      if (timeVal) {
        var tp = timeVal.split(":");
        var h = +tp[0];
        var ampm = h >= 12 ? "PM" : "AM";
        var h12 = h % 12;
        if (h12 === 0) h12 = 12;
        when += (when ? " at " : "") + h12 + ":" + tp[1] + " " + ampm;
      }
      var lines = ["Free consultation request", "Name: " + name, "Phone: " + phone];
      if (email) lines.push("Email: " + email);
      lines.push("Reason: " + reason);
      lines.push("Best time to call: " + when);
      var href = smsHref(lines.join("\n"));
      var smsLink = document.getElementById("consultSmsLink");
      if (smsLink) smsLink.setAttribute("href", href);
      var done = document.getElementById("consultDone");
      if (done) done.hidden = false;
      window.location.href = href;
    });
  }

  /* ---------- booking summary ---------- */
  var dialog = document.getElementById("summaryDialog");
  var card = document.getElementById("summaryCard");
  var summaryState = null;
  var opener = null;

  function selectedTier(price) {
    if (!summaryState || !price || !price.tiers) return null;
    for (var i = 0; i < price.tiers.length; i++) {
      if (price.tiers[i].id === summaryState.tierId) return price.tiers[i];
    }
    return null;
  }

  function acidApplies(svc) {
    var spec = OG.prices.acidWash;
    return !!(spec && spec.appliesTo && spec.appliesTo.indexOf(svc.priceKey) !== -1);
  }

  function serviceAmount(price, tier) {
    if (tier) return tier.amount;
    if (price && price.amount != null && price.kind !== "quote" && price.kind !== "label") return price.amount;
    return null;
  }

  function tierAmount(sizeId) {
    var tiers = (OG.prices.acidWash && OG.prices.acidWash.tiers) || [];
    var i;
    for (i = 0; i < tiers.length; i++) {
      if (tiers[i].id === sizeId) return tiers[i].amount;
    }
    return 0;
  }

  function acidChoicePreview(tier) {
    if (!tier) return null;
    if (tier.id === "sedan" || tier.id === "mid-small" || tier.id === "large") return tierAmount(tier.id);
    return null;
  }

  function acidChoice(tier) {
    if (!summaryState.acidWash) return { amount: 0, pending: false };
    var size = tier && (tier.id === "sedan" || tier.id === "mid-small" || tier.id === "large") ? tier.id : summaryState.acidSize;
    var tiers = (OG.prices.acidWash && OG.prices.acidWash.tiers) || [];
    var i;
    for (i = 0; i < tiers.length; i++) {
      if (tiers[i].id === size) return { amount: tiers[i].amount, pending: false, label: tiers[i].label };
    }
    return { amount: 0, pending: true };
  }

  function quoteAddons(svc, price, tier) {
    var base = serviceAmount(price, tier);
    var pet = 0;
    var acid = { amount: 0, pending: false };
    if (base != null && svc.needsUtility && summaryState.petHair && OG.prices.petHair) pet = OG.prices.petHair.amount;
    if (base != null && acidApplies(svc)) acid = acidChoice(tier);
    return { base: base, pet: pet, acid: acid };
  }

  function summaryReady(svc, price) {
    if (svc.needsUtility && !summaryState.utility) return false;
    if (price && price.tiers && !selectedTier(price)) return false;
    if (!svc.quoteForm && !summaryState.pay) return false;
    var extras = quoteAddons(svc, price, selectedTier(price));
    if (extras.acid.pending) return false;
    return true;
  }

  function priceBreakdown(svc, price, tier, pay) {
    var extras = quoteAddons(svc, price, tier);
    if (extras.base == null || !pay || extras.acid.pending) return null;
    var serviceCents = Math.round(extras.base * 100);
    var petCents = Math.round((extras.pet || 0) * 100);
    var acidCents = Math.round((extras.acid.amount || 0) * 100);
    return {
      service: serviceCents,
      pet: petCents,
      acid: acidCents,
      totals: calcFromCents(serviceCents + petCents + acidCents, pay)
    };
  }

  function buildSms(svc, price, tier, parts) {
    var lines = ["Booking request", "Service: " + svc.name];
    if (tier) lines.push("Vehicle: " + tier.label);
    if (price && price.kind === "quote") lines.push("Price: Contact for quote / starting price on request");
    else if (tier) lines.push("Starting price: " + dollars(tier.amount));
    else if (price && price.amount != null) lines.push("Price: " + priceText(svc.priceKey));
    if (parts && parts.acid) lines.push("Acid wash: " + money(parts.acid));
    if (parts && parts.pet) lines.push("Pet hair removal: " + money(parts.pet));
    lines.push("Pay: " + (summaryState.pay === "card" ? "Card" : "Cash"));
    if (parts) {
      lines.push("Tax: " + money(parts.totals.tax));
      lines.push("Total: " + money(parts.totals.total));
      lines.push("Deposit (" + OG.policies.depositPercent + "%): " + money(parts.totals.deposit));
    }
    if (svc.needsUtility) lines.push("Water and power: " + utilityLabel(summaryState.utility));
    lines.push("Shared calendar: detailing, filming, and editing.");
    return lines.join("\n");
  }

  function renderSummary() {
    if (!summaryState || !card) return;
    var svc = summaryState.service;
    var price = priceRecord(svc.priceKey);
    var tier = selectedTier(price);
    var url = resolveBookingUrl(svc, tier);
    var amount = serviceAmount(price, tier);
    var ready = summaryReady(svc, price);
    var parts = ready ? priceBreakdown(svc, price, tier, summaryState.pay) : null;
    var showPet = amount != null && svc.needsUtility && OG.prices.petHair && !svc.quoteForm;
    var showAcid = amount != null && acidApplies(svc);

    var keepScroll = card.scrollTop;
    var html = "";
    html += '<button class="summary-close" type="button" id="summaryClose">Close</button>';
    html += '<p class="summary-kicker">Booking summary</p>';
    html += '<h3 id="summaryTitle">' + esc(svc.name) + "</h3>";
    html += '<p class="summary-fine">Detailing, filming, and editing book onto one shared calendar so they don\'t overlap.</p>';

    if (price && price.tiers) {
      html += '<p class="summary-label">Vehicle</p><div class="choice-set">';
      price.tiers.forEach(function (item) {
        html += '<label class="choice"><input type="radio" name="tier" value="' + esc(item.id) + '"' + (summaryState.tierId === item.id ? " checked" : "") + '> <span>' + esc(item.label) + " — " + dollars(item.amount) + "</span></label>";
      });
      html += "</div>";
      html += '<p class="summary-fine">Starting price for that vehicle. It can increase depending on the condition.</p>';
    } else if (price && price.kind === "quote") {
      html += '<p class="summary-fine"><strong>Contact for quote.</strong> Starting price on request. It can increase depending on the condition of the vehicle.</p>';
    } else if (amount != null) {
      html += '<p class="summary-fine"><strong>' + priceText(svc.priceKey) + ".</strong> This is the service price. It can increase depending on the condition of the vehicle.</p>";
    }

    if (svc.needsUtility) {
      html += '<p class="summary-label">Water and power</p>';
      html += '<p class="summary-fine">Choose one to continue. Either option works.</p>';
      html += '<div class="choice-set">';
      html += '<label class="choice"><input type="radio" name="utility" value="supply"' + (summaryState.utility === "supply" ? " checked" : "") + "> <span>I can supply water and power</span></label>";
      html += '<label class="choice"><input type="radio" name="utility" value="bring"' + (summaryState.utility === "bring" ? " checked" : "") + "> <span>I prefer Oscar brings his own water and power source</span></label>";
      html += "</div>";
      html += '<p class="summary-fine">No travel fee within ' + OG.serviceArea.freeRadiusMiles + " miles of " + OG.serviceArea.base + ". Outside that, a travel fee applies. Oscar quotes the fee when you book.</p>";
      html += '<p class="summary-fine">Appointments that start after ' + esc(OG.fees.detailingAfterHoursAfter) + " add a flat " + dollars(OG.fees.detailingAfterHours) + " after-hours fee to the balance.</p>";
    }

    if (showAcid || showPet) {
      html += '<p class="summary-label">Add-ons</p><div class="choice-set">';
      if (showAcid) {
        var acidPreview = acidChoicePreview(tier);
        html += '<label class="choice"><input type="checkbox" id="addAcid"' + (summaryState.acidWash ? " checked" : "") + "> <span>Add acid wash" + (acidPreview ? " — " + dollars(acidPreview) : "") + "</span></label>";
        if (summaryState.acidWash && tier && tier.id === "sedan-or-mid-small") {
          html += '<label class="choice"><input type="radio" name="acidSize" value="sedan"' + (summaryState.acidSize === "sedan" ? " checked" : "") + "> <span>Sedan — " + dollars(tierAmount("sedan")) + "</span></label>";
          html += '<label class="choice"><input type="radio" name="acidSize" value="mid-small"' + (summaryState.acidSize === "mid-small" ? " checked" : "") + "> <span>Midsize/small truck — " + dollars(tierAmount("mid-small")) + "</span></label>";
        }
      }
      if (showPet) {
        html += '<label class="choice"><input type="checkbox" id="addPet"' + (summaryState.petHair ? " checked" : "") + "> <span>Add pet hair removal — " + dollars(OG.prices.petHair.amount) + " starting</span></label>";
      }
      html += "</div>";
      html += '<p class="summary-fine">Add-on prices are before tax and can go up depending on condition.</p>';
    }

    if (!svc.quoteForm) {
    html += '<p class="summary-label">How you\'ll pay the balance</p>';
    html += '<div class="choice-set">';
    html += '<label class="choice"><input type="radio" name="pay" value="card"' + (summaryState.pay === "card" ? " checked" : "") + "> <span>Card</span></label>";
    html += '<label class="choice"><input type="radio" name="pay" value="cash"' + (summaryState.pay === "cash" ? " checked" : "") + "> <span>Cash</span></label>";
    html += "</div>";
    }

    if (!svc.quoteForm && parts) {
      html += '<div class="math">';
      html += '<div class="math-row"><span>Service price</span><strong>' + money(parts.service) + "</strong></div>";
      if (parts.acid) html += '<div class="math-row"><span>Acid wash</span><strong>' + money(parts.acid) + "</strong></div>";
      if (parts.pet) html += '<div class="math-row"><span>Pet hair removal</span><strong>' + money(parts.pet) + "</strong></div>";
      if (summaryState.pay === "card") {
        html += '<div class="math-row"><span>Tax (' + OG.policies.taxPercent + "%)</span><strong>" + money(parts.totals.tax) + "</strong></div>";
      } else {
        html += '<div class="math-row"><span>Tax</span><strong>' + money(0) + "</strong></div>";
      }
      html += '<div class="math-row total"><span>Total</span><strong>' + money(parts.totals.total) + "</strong></div>";
      html += '<div class="math-row total"><span>Deposit due (' + OG.policies.depositPercent + "%)</span><strong>" + money(parts.totals.deposit) + "</strong></div>";
      html += "</div>";
      if (summaryState.pay === "cash") html += '<p class="summary-fine">Cash has no tax. The deposit is ' + OG.policies.depositPercent + "% of the total.</p>";
      else html += '<p class="summary-fine">Card tax is ' + OG.policies.taxPlace + " (" + OG.policies.taxPercent + "%, Utah Tax Commission location code " + OG.policies.taxLocationCode + "). The deposit is " + OG.policies.depositPercent + "% of the total after tax.</p>";
    } else if (!svc.quoteForm && ready && price && price.kind === "quote") {
      html += '<p class="summary-fine">Once Oscar sets the price, a card payment adds tax at ' + OG.policies.taxPercent + "% as its own line. Cash has no tax. The deposit is " + OG.policies.depositPercent + "% of that total.</p>";
    }

    if (svc.quoteForm) {
      html += '<p class="summary-fine">This opens a quote request. There is no deposit.</p>';
      html += '<p class="summary-fine">Cancel at least ' + OG.policies.cancellationCutoffHours + " hours before the appointment.</p>";
    } else {
      html += '<p class="summary-fine">The deposit is non-refundable. If you reschedule, it rolls over. Cancel at least ' + OG.policies.cancellationCutoffHours + " hours before the appointment.</p>";
    }
    html += '<p class="summary-fine">First-time clients can mention ' + dollars(OG.offers.firstDetailOff) + " off a first full detail. First responders and military can mention " + OG.offers.responderMilitaryPercent + "% off. Those come off the final total.</p>";

    if (!url) html += '<p class="soon-note">Booking link coming soon</p>';

    var label = "Choose the options above to continue";
    if (ready && url) label = svc.quoteForm ? "Request a quote" : "Continue to book";
    else if (ready) label = "Text to book";
    html += '<div class="summary-actions">';
    html += '<button class="btn btn-red" type="button" id="summaryGo"' + (ready ? "" : " disabled") + ">" + label + "</button>";
    html += "</div>";
    if (ready && url) {
      html += '<p class="summary-fine"><a id="summaryText" href="' + esc(smsHref(buildSms(svc, price, tier, parts))) + '">Text these details to ' + esc(OG.phoneDisplay) + "</a> if you also want them in writing.</p>";
    }

    card.innerHTML = html;
    card.scrollTop = keepScroll;
    document.getElementById("summaryClose").addEventListener("click", closeSummary);
    card.querySelectorAll('input[name="tier"]').forEach(function (input) {
      input.addEventListener("change", function () {
        summaryState.tierId = input.value;
        renderSummary();
      });
    });
    card.querySelectorAll('input[name="utility"]').forEach(function (input) {
      input.addEventListener("change", function () {
        summaryState.utility = input.value;
        renderSummary();
      });
    });
    card.querySelectorAll('input[name="pay"]').forEach(function (input) {
      input.addEventListener("change", function () {
        summaryState.pay = input.value;
        renderSummary();
      });
    });
    var addAcid = document.getElementById("addAcid");
    if (addAcid) {
      addAcid.addEventListener("change", function () {
        summaryState.acidWash = addAcid.checked;
        renderSummary();
      });
    }
    var addPet = document.getElementById("addPet");
    if (addPet) {
      addPet.addEventListener("change", function () {
        summaryState.petHair = addPet.checked;
        renderSummary();
      });
    }
    card.querySelectorAll('input[name="acidSize"]').forEach(function (input) {
      input.addEventListener("change", function () {
        summaryState.acidSize = input.value;
        renderSummary();
      });
    });
    var go = document.getElementById("summaryGo");
    if (go) {
      go.addEventListener("click", function () {
        if (!summaryReady(svc, price)) return;
        var freshTier = selectedTier(price);
        var freshUrl = resolveBookingUrl(svc, freshTier);
        var freshParts = priceBreakdown(svc, price, freshTier, summaryState.pay);
        if (freshUrl) window.open(freshUrl, "_blank", "noopener");
        else window.location.href = smsHref(buildSms(svc, price, freshTier, freshParts));
      });
    }
  }

  function openSummary(serviceId, trigger) {
    var svc = OG.services[serviceId];
    if (!svc || !dialog) return;
    opener = trigger || document.activeElement;
    summaryState = { service: svc, tierId: "", utility: "", pay: "", petHair: false, acidWash: false, acidSize: "" };
    dialog.hidden = false;
    dialog.classList.add("open");
    renderSummary();
    var closeBtn = document.getElementById("summaryClose");
    if (closeBtn) closeBtn.focus();
  }

  function closeSummary() {
    if (!dialog) return;
    dialog.classList.remove("open");
    dialog.hidden = true;
    summaryState = null;
    if (opener && opener.focus) opener.focus();
  }

  document.querySelectorAll("[data-book]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openSummary(btn.getAttribute("data-book"), btn);
    });
  });

  if (dialog) {
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) closeSummary();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && dialog.classList.contains("open")) closeSummary();
    });
  }
})();
