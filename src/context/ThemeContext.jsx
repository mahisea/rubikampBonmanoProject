import { createContext, useState } from 'react';

// 'light' | 'dark' | 'system' | 'red'
export const ThemeContext = createContext(undefined);

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    return (
        <ThemeContext.Provider value={{
            theme: theme,
            setTheme: (value) => {
                localStorage.setItem('theme', value);
                setTheme(value)
            }
        }}>{children}</ThemeContext.Provider>
    )
}

export default ThemeProvider;