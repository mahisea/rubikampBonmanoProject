import ThemeProvider from "./ThemeContext";
import UserProvider from "./UserContext";

const ContextProvider = ({children}) => {
    return (
        <UserProvider>
                <ThemeProvider>
                        {children}
                </ThemeProvider>
        </UserProvider>
    )
}

export default ContextProvider;