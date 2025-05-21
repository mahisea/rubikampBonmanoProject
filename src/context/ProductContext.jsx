import { createContext, useState } from "react";

export const ProductContext = createContext(undefined);

const ProductProvider = ({children}) => {
    const [product, setProduct] = useState(JSON.parse(localStorage.getItem('user')));

    return (
        <ProductContext.Provider value={{
            product,
            setUser: (value) => {
                localStorage.setItem('user', JSON.stringify(value));
                setProduct(value);
            }
        }}>{children}</ProductContext.Provider>
    )
}

export default ProductProvider;