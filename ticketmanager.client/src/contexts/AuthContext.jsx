import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        roles: [],
        user: null,
        isInitialized: false,
    });

    const login = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            
            const user = {
                 email: decodedToken.email,
                 firstName: decodedToken.given_name, 
                 lastName: decodedToken.family_name,
                };
            const roleClaimKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
            const roles = decodedToken[roleClaimKey] || [];

            const userRoles = Array.isArray(roles) ? roles : [roles];

            setAuthState({
                isAuthenticated: true,
                user,
                roles: userRoles,
                isInitialized: true,
            });

            sessionStorage.setItem('token', token);
        } catch (error) {
            console.error("Error decoding token:", error);
            setAuthState((prevState) => ({ ...prevState, isInitialized: true }));
        }
    };

    const logout = () => {
        setAuthState({
            isAuthenticated: false,
            user: null,
            roles: [],
            isInitialized: true,
        });
        sessionStorage.removeItem('token');
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            console.log("Found token in sessionStorage.");
            login(token);
        } else {
            setAuthState((prevState) => ({ ...prevState, isInitialized: true }));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);