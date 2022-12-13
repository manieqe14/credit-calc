import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locale/en";
import { Resources } from "./locale/locale.types";
import { pl } from "./locale/pl";

const resources: Resources = {
  en,
  pl
};

i18n.use(initReactI18next).init({ resources, lng: "en", interpolation: { escapeValue: false }});

export default i18n;
