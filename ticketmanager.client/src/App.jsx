import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; 
import CreateTicketPage from './pages/CreateTicketPage';
import TicketDetailPage from './pages/TicketDetailPage';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
import NavBar from './components/NavBar';
import { useAuth } from './contexts/AuthContext';
import './App.css';

const App = () => {
    const { isAuthenticated } = useAuth(); // Get authentication status

    return (
        <div>
            <NavBar /> {/* Ensure NavBar is always visible */}
            <Routes>
                <Route path="/login" element={
                    <AuthRoute>
                        <LoginPage />
                    </AuthRoute>
                } />
                <Route path="/register" element={
                    <AuthRoute>
                        <RegisterPage />
                    </AuthRoute>
                } />
                <Route path="/my-page" element={
                    <PrivateRoute requiredRoles={['Administrator', 'HelpDesk', 'Guest']}>
                        <MyPage />
                    </PrivateRoute>
                } />
                <Route path="/dashboard" element={
                    <PrivateRoute requiredRoles={['Administrator', 'HelpDesk']}>
                        <DashboardPage />
                    </PrivateRoute>
                } />
                <Route path="/create-ticket" element={
                    <PrivateRoute requiredRoles={['Administrator', 'HelpDesk', 'Guest']}>
                        <CreateTicketPage />
                    </PrivateRoute>
                } />
                <Route path="/tickets/:ticketId" element={
                    <PrivateRoute requiredRoles={['Administrator', 'HelpDesk', 'Guest']}>
                        <TicketDetailPage />
                    </PrivateRoute>
                } />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </div>
    );
};

export default App;