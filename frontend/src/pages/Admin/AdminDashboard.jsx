import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { Users, BookOpen, BarChart2 } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        api.get('/admin/stats').then(({ data }) => setStats(data));
    }, []);

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Users', value: stats?.totalUsers, icon: <Users size={22} />, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Total Exams', value: stats?.totalExams, icon: <BookOpen size={22} />, color: 'text-purple-600 bg-purple-50' },
                    { label: 'Total Attempts', value: stats?.totalResults, icon: <BarChart2 size={22} />, color: 'text-green-600 bg-green-50' },
                ].map(({ label, value, icon, color }) => (
                    <div key={label} className="card flex items-center gap-4">
                        <span className={`p-3 rounded-xl ${color}`}>{icon}</span>
                        <div>
                            <p className="text-2xl font-bold">{value ?? '—'}</p>
                            <p className="text-xs text-gray-500">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <Link to="/admin/users" className="btn-secondary">Manage Users</Link>
                <Link to="/admin/exams" className="btn-primary">Manage Exams</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
