export const vehicleOptions = [
  {
    name: "Auto osobowe (do 2000 ccm)",
    value: 3.1,
    description: "Podatek akcyzowy dla samochodów osobowych o pojemności do 2000 cm³.",
    fuelType: ["benzyna", "diesel"],
  },
  {
    name: "Auto osobowe (powyżej 2000 ccm)",
    value: 18.6,
    description: "Podatek akcyzowy dla samochodów osobowych o pojemności powyżej 2000 cm³.",
    fuelType: ["benzyna", "diesel"],
  },
  {
    name: "Klasyczne hybrydy (HEV) i miękkie hybrydy (MHEV) (powyżej 2000 ccm do 3500 ccm)",
    value: 9.3,
    description: "Podatek akcyzowy dla klasycznych hybryd (HEV) i miękkich hybryd (MHEV) z silnikiem spalinowym o pojemności powyżej 2000 cm³ do 3500 cm³.",
    fuelType: ["benzyna", "diesel", "hybryda"],
  },
  {
    name: "Hybrydy plug-in (PHEV) (powyżej 2000 ccm do 3500 ccm)",
    value: 9.3,
    description: "Podatek akcyzowy dla hybryd plug-in (PHEV) z silnikiem spalinowym o pojemności powyżej 2000 cm³ do 3500 cm³.",
    fuelType: ["benzyna", "diesel", "hybryda"],
  },
  {
    name: "Klasyczne hybrydy (HEV) i miękkie hybrydy (MHEV) (do 2000 ccm)",
    value: 1.55,
    description: "Podatek akcyzowy dla klasycznych hybryd (HEV) i miękkich hybryd (MHEV) z silnikiem spalinowym o pojemności do 2000 cm³.",
    fuelType: ["benzyna", "diesel", "hybryda"],
  },
  {
    name: "Samochody hybrydowe plug-in (PHEV) z silnikami poniżej 2000 ccm",
    value: 0,
    description: "Samochody hybrydowe plug-in (PHEV) z silnikami o pojemności poniżej 2000 cm³ są zwolnione z podatku akcyzowego.",
    fuelType: ["benzyna", "diesel", "hybryda", "elektryczny"],
  },
  {
    name: "Samochody elektryczne o zwiększonym zasięgu (REX)",
    value: 0,
    description: "Samochody elektryczne o zwiększonym zasięgu (REX) są zwolnione z podatku akcyzowego. Jednakże, ulga ta może być cofnięta w przyszłości.",
    fuelType: ["elektryczny"],
  },
  {
    name: "Samochody ciężarowe o dopuszczalnej masie całkowitej poniżej 3,5 tony",
    value: 0,
    description: "Samochody ciężarowe o dopuszczalnej masie całkowitej poniżej 3,5 tony nie podlegają opłacie akcyzowej.",
    fuelType: ["benzyna", "diesel", "hybryda", "elektryczny"],
  },
  {
    name: "Samochody ciężarowe o dopuszczalnej masie całkowitej powyżej 3,5 tony",
    value: 0,
    description: "Samochody ciężarowe o dopuszczalnej masie całkowitej powyżej 3,5 tony nie podlegają opłacie akcyzowej.",
    fuelType: ["benzyna", "diesel", "hybryda", "elektryczny"],
  },
];

export const currencies = ["PLN", "EUR", "GBP", "CHF", "USD"];

export const options = {
  badaniaTechniczne: 64,
  badaniaTechniczneKolizja: 94,
  tlumaczeniaDokumentow: 250,
  rejestracjaPojazdu: 161.5,
  tabliceRejestracyjne: 80,
  dowodRejestracyjny: 54,
  pozwolenieCzasowe: 26,
  oplataEwidencyjna: 1.5,
};
