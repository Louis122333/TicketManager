import React from 'react';
import { Link } from 'react-router-dom';
import useRegister from '../hooks/auth/useRegister';
import Register from '../components/Register';

const RegisterPage = () => {
    const { handleRegister } = useRegister();

    return (
        <div>
            <Register onRegister={handleRegister} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;