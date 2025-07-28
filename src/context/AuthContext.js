import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userIdx, setUserIdx] = useState(null);

    const login = (idx) => {
        setIsLoggedIn(true);
        setUserIdx(idx);
        Cookies.set("userIdx", idx, {
            expires: 7,
            path: "/",
            sameSite: "Lax",
        });
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:8080/api/user/logout', {
                method: 'POST',
            });
        } catch (err) {
            toast.error(`로그아웃 실패: ${err.message}`);
        }
        setIsLoggedIn(false);
        setUserIdx(null);
        Cookies.remove("userIdx");
    };

    useEffect(() => {
        const checkAuth = async () => {
            const storedIdx = Cookies.get("userIdx");
            if (storedIdx) {
                login(storedIdx);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userIdx, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}