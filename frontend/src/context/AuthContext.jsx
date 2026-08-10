import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedUser = localStorage.getItem("premiumCafeUser");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem("premiumCafeUser");
            }
        }

        setLoading(false);

    }, []);

    const login = (loginResponse) => {

        localStorage.setItem(
            "premiumCafeToken",
            loginResponse.token
        );

        const userData = {
            userId: loginResponse.userId,
            fullName: loginResponse.fullName,
            email: loginResponse.email,
            role: loginResponse.role
        };

        localStorage.setItem(
            "premiumCafeUser",
            JSON.stringify(userData)
        );

        setUser(userData);
    };

    const logout = () => {

        localStorage.removeItem("premiumCafeToken");
        localStorage.removeItem("premiumCafeUser");

        setUser(null);
    };

    const updateUser = (updatedUser) => {

    const userData = {
        ...user,
        userId: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role
    };

    localStorage.setItem(
        "premiumCafeUser",
        JSON.stringify(userData)
    );

    setUser(userData);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                updateUser,
                isAuthenticated: !!user,
                isAdmin: user?.role === "ADMIN",
                isCustomer: user?.role === "CUSTOMER"
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}