import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMeApi } from '../api/auth';

/**
 * Handles the redirect after Google OAuth.
 * URL: /auth/callback?token=<jwt>
 */
const AuthCallback = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [params] = useSearchParams();

    useEffect(() => {
        const token = params.get('token');
        if (!token) { navigate('/login'); return; }

        localStorage.setItem('token', token);
        getMeApi()
            .then(({ data }) => {
                login(token, data);
                navigate('/dashboard');
            })
            .catch(() => {
                localStorage.removeItem('token');
                navigate('/login');
            });
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <p className="text-gray-500">Signing you in…</p>
        </div>
    );
};

export default AuthCallback;
