import moment from "moment";
moment.updateLocale("fr", {
  relativeTime: {
    future: "dans %s",
    past: "%s",
    s: "Il y a quelques secondes",
    ss: "Il y a %d secondes",
    m: "Il y a une minute",
    mm: "Il y a %d minutes",
    h: "Il y a une heure",
    hh: "Il y a %d heures",
    d: "Il y a un jour",
    dd: "Il y a %d jours",
    w: "Il y a une semaine",
    ww: "Il y a %d semaines",
    M: "Il y a un mois",
    MM: "Il y a %d mois",
    y: "Il y a un an",
    yy: "Il y a %d années",
  },
});
