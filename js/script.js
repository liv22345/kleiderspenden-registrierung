// Feste Referenzdaten der Geschäftsstelle (fiktiv)
const GESCHAEFTSSTELLE = {
  adresse: "Musterstraße 12, 70173 Stuttgart",
  plz: "70173",
};

const form = document.getElementById("spendenformular");
const radioVorort = document.getElementById("uebergabe-vorort");
const radioAbholung = document.getElementById("uebergabe-abholung");
const abholadresseBlock = document.getElementById("abholadresse-block");
const strasseInput = document.getElementById("strasse");
const plzInput = document.getElementById("plz");
const ortInput = document.getElementById("ort");
const plzFehler = document.getElementById("plz-fehler");
const fehlerBox = document.getElementById("formular-fehler");
const geschaeftsstellePlzAnzeige = document.getElementById("geschaeftsstelle-plz-anzeige");

if (geschaeftsstellePlzAnzeige) {
  geschaeftsstellePlzAnzeige.textContent = GESCHAEFTSSTELLE.plz;
}

// Zwischen den beiden Übergabearten umschalten und Pflichtfelder anpassen
function uebergabeartAktualisieren() {
  const istAbholung = radioAbholung.checked;
  abholadresseBlock.hidden = !istAbholung;
  strasseInput.required = istAbholung;
  plzInput.required = istAbholung;
  ortInput.required = istAbholung;
  plzInput.classList.remove("is-invalid");
  plzFehler.textContent = "";
}

radioVorort.addEventListener("change", uebergabeartAktualisieren);
radioAbholung.addEventListener("change", uebergabeartAktualisieren);
uebergabeartAktualisieren();

// Sehr einfacher XSS-Schutz: HTML-Sonderzeichen entschärfen, bevor Texte
// später irgendwo angezeigt oder weitergegeben werden.
function bereinigen(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Prüft, ob die ersten beiden Ziffern der eingegebenen PLZ mit der
// Geschäftsstellen-PLZ übereinstimmen.
function plzImAbholradius(plz) {
  return plz.slice(0, 2) === GESCHAEFTSSTELLE.plz.slice(0, 2);
}

function fehlerAnzeigen(nachricht) {
  fehlerBox.textContent = nachricht;
  fehlerBox.classList.remove("d-none");
}

function fehlerVerstecken() {
  fehlerBox.classList.add("d-none");
  fehlerBox.textContent = "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  fehlerVerstecken();
  plzInput.classList.remove("is-invalid");
  plzFehler.textContent = "";

  const istAbholung = radioAbholung.checked;
  const kleidungsart = document.getElementById("kleidungsart").value;
  const krisengebiet = document.getElementById("krisengebiet").value;

  if (!kleidungsart || !krisengebiet) {
    fehlerAnzeigen("Bitte wähle sowohl die Art der Kleidung als auch ein Krisengebiet aus.");
    return;
  }

  let ort = GESCHAEFTSSTELLE.adresse;

  if (istAbholung) {
    const strasse = strasseInput.value.trim();
    const plz = plzInput.value.trim();
    const ortEingabe = ortInput.value.trim();

    if (!strasse || !plz || !ortEingabe) {
      fehlerAnzeigen("Bitte fülle Straße, Postleitzahl und Ort für die Abholung vollständig aus.");
      return;
    }

    if (!/^\d{5}$/.test(plz)) {
      plzInput.classList.add("is-invalid");
      plzFehler.textContent = "Bitte gib eine gültige, fünfstellige Postleitzahl ein.";
      return;
    }

    if (!plzImAbholradius(plz)) {
      plzInput.classList.add("is-invalid");
      plzFehler.textContent = `Diese Postleitzahl liegt außerhalb unseres Abholradius (erste zwei Ziffern müssen mit ${GESCHAEFTSSTELLE.plz.slice(0, 2)} beginnen).`;
      return;
    }

    ort = `${bereinigen(strasse)}, ${plz} ${bereinigen(ortEingabe)}`;
  }

  const jetzt = new Date();
  const datum = jetzt.toLocaleDateString("de-DE");
  const uhrzeit = jetzt.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

  const params = new URLSearchParams({
    uebergabeart: istAbholung ? "Abholung" : "Übergabe an der Geschäftsstelle",
    kleidung: kleidungsart,
    gebiet: krisengebiet,
    ort: ort,
    datum: datum,
    uhrzeit: uhrzeit,
  });

  window.location.href = `bestaetigung.html?${params.toString()}`;
});
