import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, User, ShieldCheck } from 'lucide-react';

const MainLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    <Link to="/dashboard" className="flex items-center gap-2 text-blue-600 font-bold text-lg">
                        <ShieldCheck size={22} />
                        DevOps Exam Portal
                    </Link>

                    <nav className="flex items-center gap-4">
                        <Link to="/dashboard" className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
                            <LayoutDashboard size={16} /> Dashboard
                        </Link>
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="text-sm text-gray-600 hover:text-blue-600">
                                Admin
                            </Link>
                        )}
                        <Link to="/profile" className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
                            <User size={16} /> {user?.name?.split(' ')[0]}
                        </Link>
                        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1">
                            <LogOut size={16} /> Logout
                        </button>
                    </nav>
                </div>
            </header>

            {/* Page content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            <footer className="text-center text-xs text-gray-400 py-4 border-t border-gray-100">
                © {new Date().getFullYear()} DevOps Exam Portal
            </footer>
        </div>
    );
};

export default MainLayout;
