import React, { useState } from "react";
import tc from "tinycolor2";

export type Theme = {
  [index: number]: string;
  "--primary-color": string;
};
export type ThemeComputed = {
  [index: number]: string;
  "--primary-color-contrast": string;
};
export type ThemeFull = Theme & ThemeComputed;

export type ThemeContext = {
  theme: ThemeFull;
  setTheme(theme: Theme): void;
};

export const defaultTheme: ThemeFull = {
  "--primary-color": "#4287f5",
  "--primary-color-contrast": "#ffffff",
};

const ThemeContext = React.createContext<ThemeContext>({
  theme: defaultTheme,
  setTheme: () => {
    throw new Error("setTheme() not implemented");
  },
});
ThemeContext.displayName = "ThemeContext";

export const ThemeProvider: React.FC = props => {
  const [theme, updateTheme] = useState<ThemeFull>(defaultTheme);

  const _getContrast = (color: string): string => {
    return tc.mostReadable(color, ["black", "white"]).toHexString();
  };

  const _computeStyles = (newTheme: Theme): ThemeComputed => {
    return {
      "--primary-color-contrast": _getContrast(newTheme["--primary-color"]),
    };
  };

  const setTheme = (newTheme: Theme) => {
    const computed = _computeStyles(newTheme);
    const fullTheme = Object.assign(newTheme, computed);

    const root = document.documentElement;
    const rootComputedStyle = getComputedStyle(root);
    for (const key in fullTheme) {
      const current = rootComputedStyle.getPropertyValue(key);
      if (current !== fullTheme[key]) {
        root.style.setProperty(key, fullTheme[key]);
      }
    }

    updateTheme(fullTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
