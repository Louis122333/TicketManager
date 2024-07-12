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
import NavBar from './components/layout/NavBar';
import UserDetailPage from './pages/UserDetailPage';
import CreateUserPage from './pages/CreateUserPage';
import BackgroundWrapper from './components/layout/BackgroundWrapper';

import './App.css';

const App = () => {

    return (
        <div>
            <NavBar />
            <BackgroundWrapper>
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
                    <PrivateRoute requiredRoles={['Administrator', 'HelpDesk']}>
                        <TicketDetailPage />
                    </PrivateRoute>
                } />
                     <Route path="/tickets/:ticketId/created-tickets" element={
                    <PrivateRoute requiredRoles={['Administrator', 'HelpDesk', 'Guest']}>
                        <TicketDetailPage />
                    </PrivateRoute>
                } />
                <Route path="/users/:userId" element={
                    <PrivateRoute requiredRoles={['Administrator']}>
                        <UserDetailPage />
                    </PrivateRoute>
                } />
                <Route path="/create-user" element={
                    <PrivateRoute requiredRoles={['Administrator']}>
                        <CreateUserPage />
                    </PrivateRoute>
                } />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
            </BackgroundWrapper>
        </div>
    );
};

export default App;