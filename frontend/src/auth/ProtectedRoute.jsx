import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Protects routes that require authentication.
 * Optionally restrict to a specific role (e.g. 'admin').
 */
const ProtectedRoute = ({ role }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <span className="text-gray-500">Loading…</span>
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;
    if (role && user.role !== role) return <Navigate to="/dashboard" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
