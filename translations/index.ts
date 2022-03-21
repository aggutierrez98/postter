import en from "./en.json";
import es from "./es.json";
export const languages = {
  en,
  es,
  [Symbol.iterator]: function* () {
    yield* Object.values(this);
  },
};
