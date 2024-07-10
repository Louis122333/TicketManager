import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ requiredRoles, children }) => {
    const { isAuthenticated, roles: userRoles, isInitialized } = useAuth();
    const navigate = useNavigate();

    console.log('PrivateRoute:', { isAuthenticated, userRoles, requiredRoles, isInitialized });

    useEffect(() => {
        if (isInitialized) {
            if (!isAuthenticated) {
                navigate("/login");
            } else if (!requiredRoles.some(role => userRoles.includes(role))) {
                navigate("/unauthorized");
            }
        }
    }, [isInitialized, isAuthenticated, userRoles, requiredRoles, navigate]);

    if (!isInitialized) {
        // You can return a loading spinner or null until auth state is initialized
        return null;
    }

    // Render children if the user is authenticated and has the required roles
    if (isAuthenticated && requiredRoles.some(role => userRoles.includes(role))) {
        return children;
    }

    // Return null or a placeholder while checking auth/role state
    return null;
};

export default PrivateRoute;