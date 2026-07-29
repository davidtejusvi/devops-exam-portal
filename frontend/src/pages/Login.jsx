import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await loginApi(form);
            login(data.token, data.user);
            toast.success(`Welcome back, ${data.user.name}!`);
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Sign in</h2>
                <p className="text-sm text-gray-500 mt-1">Welcome back to your exam portal</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email" name="email" required autoComplete="email"
                    className="input" placeholder="you@example.com"
                    value={form.email} onChange={handleChange}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                    type="password" name="password" required autoComplete="current-password"
                    className="input" placeholder="••••••••"
                    value={form.password} onChange={handleChange}
                />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Signing in…' : 'Sign in'}
            </button>

            <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up</Link>
            </p>
        </form>
    );
};

export default Login;
