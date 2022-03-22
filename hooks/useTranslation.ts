import { useEffect, useState } from "react";
import { Language } from "interfaces";
import { languages } from "translations";

const langOptions = [];
for (const lan of languages) {
  langOptions.push(lan);
}

const ISSERVER = typeof window === "undefined";

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>(languages.en);

  let localLang = "en";

  if (!ISSERVER) {
    localLang = localStorage?.getItem("lang") || "en";
  }

  useEffect(() => {
    setLanguage(languages[localLang]);
  }, [localLang]);

  const changeLang = (langConf: Language) => {
    localStorage?.setItem("lang", langConf.id);
    setLanguage(languages[langConf.id]);
  };

  const getTranslation = (key: string) => {
    if (!key) return "";

    const keys = key?.split(" ");
    return capitalizeFirstLetter(getNestedTranslation(language, keys));
  };

  return {
    language,
    setLanguage,
    changeLang,
    langOptions,
    t: getTranslation,
  };
};

const getNestedTranslation = (language: Language, keys: string[]) => {
  return keys
    .map((key) => {
      return language.words[key] ?? key;
    })
    .join(" ");
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
