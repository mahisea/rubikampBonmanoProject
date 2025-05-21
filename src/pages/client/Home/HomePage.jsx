import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

const HomePage = () => {
    const {theme, setTheme} = useContext(ThemeContext);
    
    return (
        <div style={{
            backgroundColor: theme === 'light' ? 'white' : 'black',
             color: theme === 'light' ? 'black' : 'white' 
            }}>
            <h1>HomePage</h1>
            <button onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light');
            }}>Change Theme: {theme}</button>
        </div>
    )
}

export default HomePage;