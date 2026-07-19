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
  const emailInput = document.getElementById("kontakt-email");
  const emailFehler = document.getElementById("kontakt-email-fehler");

  kontaktForm.addEventListener("submit", function (event) {
    event.preventDefault();

    emailInput.classList.remove("is-invalid");
    emailFehler.textContent = "";

    const honeypot = document.getElementById("kontakt-firma").value.trim();
    const name = document.getElementById("kontakt-name").value.trim();
    const email = emailInput.value.trim();
    const nachricht = document.getElementById("kontakt-nachricht").value.trim();

    // Honeypot befüllt -> vermutlich ein Bot. Anfrage stillschweigend
    // verwerfen, aber dem Absender keinen Hinweis darauf geben.
    if (honeypot) {
      kontaktForm.reset();
      return;
    }

    if (!name || !email || !nachricht) {
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      emailInput.classList.add("is-invalid");
      emailFehler.textContent = "Bitte gib eine gültige E-Mail-Adresse ein (z. B. name@beispiel.de).";
      return;
    }

    erfolgName.textContent = name;
    kontaktForm.classList.add("d-none");
    erfolgBox.classList.remove("d-none");
  });
}

