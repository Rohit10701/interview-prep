"use client";
import React, { createContext, useEffect, useState } from "react";

export type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider = ({ children, initialTheme }: { children: React.ReactNode; initialTheme: ThemeType }) => {
  const [theme, setTheme] = useState<ThemeType>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    document.cookie = `theme=${theme}; path=/; max-age=31536000`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
