import { useEffect, useState } from "react";

export const useToogleTheme = () => {
  const [themeState, setThemeState] = useState<boolean>(false);

  useEffect(() => {
    const getTheme = localStorage.getItem("Theme");
    if (getTheme === "dark") {
      setThemeState(true);
    }
  }, []);

  useEffect(() => {
    if (themeState) {
      localStorage.setItem("Theme", "dark");
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("Theme", "light");
      document.body.classList.remove("dark");
    }
  }, [themeState]);

  const toogleTheme = () => {
    setThemeState(!themeState);
  };

  return { themeState, toogleTheme };
};
