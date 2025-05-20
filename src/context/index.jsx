import ProductProvider from "./ProductContext";
import ThemeProvider from "./ThemeContext";
import UserProvider from "./UserContext";

const ContextProvider = ({ children }) => {
  return (
    <ProductProvider>
      <UserProvider>
        <ThemeProvider>
            {children}
        </ThemeProvider>
      </UserProvider>
    </ProductProvider>
  );
};

export default ContextProvider;
