import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AuthLayout = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white mb-3">
                    <ShieldCheck size={28} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">DevOps Exam Portal</h1>
                <p className="text-sm text-gray-500 mt-1">Test your DevOps knowledge</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8">
                <Outlet />
            </div>
        </div>
    </div>
);

export default AuthLayout;
