import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerApi } from '../../services/api';

const useRegister = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (values) => {
        try {
            await registerApi(values.email, values.password, values.firstName, values.lastName);
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Failed to register');
        }
    };

    return {
        handleRegister,
        error,
    };
};

export default useRegister;