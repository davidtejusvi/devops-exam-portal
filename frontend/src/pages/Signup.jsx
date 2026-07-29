import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        try {
            const { data } = await registerApi(form);
            login(data.token, data.user);
            toast.success('Account created!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Create account</h2>
                <p className="text-sm text-gray-500 mt-1">Start testing your DevOps skills today</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                <input
                    type="text" name="name" required
                    className="input" placeholder="John Doe"
                    value={form.name} onChange={handleChange}
                />
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
                    type="password" name="password" required minLength={6}
                    className="input" placeholder="Min. 6 characters"
                    value={form.password} onChange={handleChange}
                />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Creating account…' : 'Create account'}
            </button>

            <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">Sign in</Link>
            </p>
        </form>
    );
};

export default Signup;
