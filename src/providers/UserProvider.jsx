import React, { createContext, useState } from "react";


export const UserContext = createContext();

export default function UserProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    function set_User({ user }) {
        setUser(user)
    }

    return (
        <UserContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </UserContext.Provider>
    );

}