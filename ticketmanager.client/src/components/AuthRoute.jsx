import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthRoute = ({ children }) => {
    const { isAuthenticated, isInitialized } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isInitialized && isAuthenticated) {
            navigate('/my-page');
        }
    }, [isAuthenticated, isInitialized, navigate]);

    if (!isInitialized) {
        return null; 
    }

    return children;
};

export default AuthRoute;