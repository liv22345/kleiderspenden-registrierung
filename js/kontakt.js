// Einfaches Kontaktformular: Es gibt kein Backend in dieser Fallstudie,
// daher wird die Nachricht nicht versendet, sondern die Eingabe nur
// clientseitig bestätigt. Der Name wird dabei escaped angezeigt, damit
// kein injizierter Code ausgeführt werden kann.
//
// Zusätzlich enthält das Formular zwei einfache Schutzmechanismen:
// 1. Eine Formatprüfung der E-Mail-Adresse per regulärem Ausdruck.
// 2. Ein Honeypot-Feld ("firma"), das für Menschen unsichtbar ist,
//    von simplen Spam-Bots aber häufig automatisch ausgefüllt wird.
//    Ist es befüllt, wird die Anfrage stillschweigend verworfen.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const kontaktForm = document.getElementById("kontaktformular");

if (kontaktForm) {
  const erfolgBox = document.getElementById("kontakt-erfolg");
  const erfolgName = document.getElementById("kontakt-erfolg-name");

  const nameInput = document.getElementById("kontakt-name");
  const nameFehler = document.getElementById("kontakt-name-fehler");
  const emailInput = document.getElementById("kontakt-email");
  const emailFehler = document.getElementById("kontakt-email-fehler");
  const nachrichtInput = document.getElementById("kontakt-nachricht");
  const nachrichtFehler = document.getElementById("kontakt-nachricht-fehler");

  function fehlerSetzen(input, fehlerElement, nachricht) {
    input.classList.add("is-invalid");
    fehlerElement.textContent = nachricht;
  }

  function fehlerZuruecksetzen(input, fehlerElement) {
    input.classList.remove("is-invalid");
    fehlerElement.textContent = "";
  }

  kontaktForm.addEventListener("submit", function (event) {
    event.preventDefault();

    fehlerZuruecksetzen(nameInput, nameFehler);
    fehlerZuruecksetzen(emailInput, emailFehler);
    fehlerZuruecksetzen(nachrichtInput, nachrichtFehler);

    const honeypot = document.getElementById("kontakt-firma").value.trim();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const nachricht = nachrichtInput.value.trim();

    // Honeypot befüllt -> vermutlich ein Bot. Anfrage stillschweigend
    // verwerfen, aber dem Absender keinen Hinweis darauf geben.
    if (honeypot) {
      kontaktForm.reset();
      return;
    }

    // Alle Pflichtfelder prüfen und ggf. mehrere Fehler gleichzeitig anzeigen,
    // statt nur beim ersten fehlenden Feld abzubrechen.
    let gueltig = true;

    if (!name) {
      fehlerSetzen(nameInput, nameFehler, "Bitte gib deinen Namen ein.");
      gueltig = false;
    }

    if (!email) {
      fehlerSetzen(emailInput, emailFehler, "Bitte gib deine E-Mail-Adresse ein.");
      gueltig = false;
    } else if (!EMAIL_PATTERN.test(email)) {
      fehlerSetzen(emailInput, emailFehler, "Bitte gib eine gültige E-Mail-Adresse ein (z. B. name@beispiel.de).");
      gueltig = false;
    }

    if (!nachricht) {
      fehlerSetzen(nachrichtInput, nachrichtFehler, "Bitte gib eine Nachricht ein.");
      gueltig = false;
    }

    if (!gueltig) {
      return;
    }

    erfolgName.textContent = name;
    kontaktForm.classList.add("d-none");
    erfolgBox.classList.remove("d-none");
  });
}

