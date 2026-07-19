// Liest die per URL übergebenen Registrierungsdaten aus und zeigt sie an.
// textContent wird bewusst verwendet (statt innerHTML), damit kein
// injizierter HTML-/Script-Code ausgeführt werden kann.

const params = new URLSearchParams(window.location.search);

const felder = {
  kleidung: "anzeige-kleidung",
  gebiet: "anzeige-gebiet",
  uebergabeart: "anzeige-uebergabeart",
  ort: "anzeige-ort",
  datum: "anzeige-datum",
  uhrzeit: "anzeige-uhrzeit",
};

const hatAlleDaten = Object.keys(felder).every((key) => params.has(key) && params.get(key));

const inhaltCard = document.getElementById("bestaetigung-inhalt");
const hinweisCard = document.getElementById("keine-daten-hinweis");

if (!hatAlleDaten) {
  inhaltCard.classList.add("d-none");
  hinweisCard.classList.remove("d-none");
} else {
  Object.entries(felder).forEach(([param, elementId]) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = params.get(param);
    }
  });
}
