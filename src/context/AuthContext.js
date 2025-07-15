import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userIdx, setUserIdx] = useState(null);

    const login = (idx) => {
        setIsLoggedIn(true);
        setUserIdx(idx);
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:8080/api/user/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (err) {
            toast.error(`로그아웃 실패: ${err.message}`);
        }
        setIsLoggedIn(false);
        setUserIdx(null);
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/user/check/login', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                if (res.ok && data.code === 200 && data.data) {
                    login(data.data);
                }
            } catch (error) {
                console.error('자동 로그인 실패:', error);
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