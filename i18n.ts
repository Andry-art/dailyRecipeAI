import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import de from "./assets/locales/de.json";
import en from "./assets/locales/en.json";
import es from "./assets/locales/es.json";
import fr from "./assets/locales/fr.json";
import pt from "./assets/locales/pt.json";
import ru from "./assets/locales/ru.json";

const translations = {
  en,
  ru,
  pt,
  es,
  fr,
  de,
};

const i18n = new I18n(translations);

i18n.locale = getLocales()[0]?.languageCode || "en";

i18n.enableFallback = true;

export default i18n;
