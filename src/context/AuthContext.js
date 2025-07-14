import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userIdx, setUserIdx] = useState(null);

    const login = (idx) => {
        setIsLoggedIn(true);
        setUserIdx(idx);
    };
    const logout = () => {
        setIsLoggedIn(false);
        setUserIdx(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userIdx, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}