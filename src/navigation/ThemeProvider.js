import React, { useState } from 'react';

export const ThemeContext = React.createContext({});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('Light');

    const toggleTheme = () => {
        setTheme(theme === 'Light' ? 'Dark' : 'Light');
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

