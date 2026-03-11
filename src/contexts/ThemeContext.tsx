import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeColor = 'sky' | 'emerald' | 'rose' | 'amber' | 'violet';

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem('theme-color');
    return (saved as ThemeColor) || 'sky';
  });

  useEffect(() => {
    localStorage.setItem('theme-color', themeColor);
    // Update data-theme attribute on body for global CSS access if needed
    document.body.setAttribute('data-theme-color', themeColor);
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      <div className={`theme-${themeColor}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
