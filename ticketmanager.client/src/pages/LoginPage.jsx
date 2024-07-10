import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../hooks/auth/useLogin';
import Login from '../components/Login';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate('/my-page');
    };

    const { handleLogin, error } = useLogin(handleLoginSuccess);

    return (
        <div>
            <Login onLogin={handleLogin} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default LoginPage;