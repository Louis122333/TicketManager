import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ requiredRoles, children }) => {
    const { isAuthenticated, roles: userRoles, isInitialized } = useAuth();
    const navigate = useNavigate();

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
        return null;
    }

    if (isAuthenticated && requiredRoles.some(role => userRoles.includes(role))) {
        return children;
    }

    return null;
};

export default PrivateRoute;