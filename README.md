# Kleiderspenden-Registrierung

Fallstudie im Rahmen des Kurses IPWA01-01 – Programmierung von Webanwendungsoberflächen (IU Internationale Hochschule).

Öffentlich zugängliches Portal, mit dem Kleiderspenden registriert werden können – entweder als persönliche Übergabe an der Geschäftsstelle oder als Abholung durch ein Sammelfahrzeug.

## Struktur

```
index.html              Startseite mit Registrierungsformular
bestaetigung.html        Bestätigungsseite mit allen erfassten Daten
css/style.css            Eigenständiges Styling (Bootstrap 5 als Basis)
js/script.js             Formularlogik: Umschaltung, PLZ-Prüfung, Validierung
js/bestaetigung.js       Liest und zeigt die übergebenen Registrierungsdaten sicher an
```

## Verwendete Technologien

- HTML5, CSS3
- Bootstrap 5 (responsives Grid, Formular-Komponenten)
- Vanilla JavaScript (keine Build-Tools nötig)

## Lokal ausführen

Repository klonen und `index.html` im Browser öffnen, oder über GitHub Pages bereitstellen (Settings → Pages → Branch `main`).

## Live-Demo

<!-- Nach Aktivierung von GitHub Pages hier den Link eintragen -->
https://DEIN-USERNAME.github.io/kleiderspenden-registrierung/
