import { createContext, useContext, type ReactNode } from 'react';

// The type for the theme string, e.g. 'light' | 'dark' | string
export type ColorScheme = string;

interface ColorSchemeContextProps {
  colorScheme: ColorScheme;
}

const ColorSchemeContext = createContext<ColorSchemeContextProps | undefined>(undefined);

export const ColorSchemeProvider = ({
  colorScheme,
  children,
}: {
  colorScheme: ColorScheme;
  children: ReactNode;
}) => {
  return (
    <ColorSchemeContext.Provider value={{ colorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export function useColorScheme() {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error('useColorScheme must be used within a ColorSchemeProvider');
  }
  return context.colorScheme;
}
