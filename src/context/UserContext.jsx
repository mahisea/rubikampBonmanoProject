import { createContext, useState } from "react";

export const UserContext = createContext(undefined);

const UserProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    return (
        <UserContext.Provider value={{
            user,
            setUser: (value) => {
                localStorage.setItem('user', JSON.stringify(value));
                setUser(value);
            }
        }}>{children}</UserContext.Provider>
    )
}

export default UserProvider;