import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const useLogin = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (values) => {
        try {
            const response = await loginApi(values.email, values.password);
            login(response.token);
            navigate('/my-page');
        } catch (err) {
            setError(err.message || 'Failed to login');
        }
    };

    return {
        handleLogin,
        error,
    };
};

export default useLogin;