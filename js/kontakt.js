// Einfaches Kontaktformular: Es gibt kein Backend in dieser Fallstudie,
// daher wird die Nachricht nicht versendet, sondern die Eingabe nur
// clientseitig bestätigt. Der Name wird dabei escaped angezeigt, damit
// kein injizierter Code ausgeführt werden kann.

const kontaktForm = document.getElementById("kontaktformular");

if (kontaktForm) {
  const erfolgBox = document.getElementById("kontakt-erfolg");
  const erfolgName = document.getElementById("kontakt-erfolg-name");

  kontaktForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("kontakt-name").value.trim();
    const email = document.getElementById("kontakt-email").value.trim();
    const nachricht = document.getElementById("kontakt-nachricht").value.trim();

    if (!name || !email || !nachricht) {
      return;
    }

    erfolgName.textContent = name;
    kontaktForm.classList.add("d-none");
    erfolgBox.classList.remove("d-none");
  });
}
