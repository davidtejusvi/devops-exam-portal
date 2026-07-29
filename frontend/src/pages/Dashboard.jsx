import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getExamsApi } from '../api/exams';
import { useResults } from '../hooks/useResults';
import { BookOpen, CheckCircle, XCircle, Clock } from 'lucide-react';

const CATEGORY_COLORS = {
    docker: 'bg-blue-100 text-blue-700',
    kubernetes: 'bg-purple-100 text-purple-700',
    terraform: 'bg-violet-100 text-violet-700',
    aws: 'bg-orange-100 text-orange-700',
    linux: 'bg-yellow-100 text-yellow-700',
    jenkins: 'bg-red-100 text-red-700',
    git: 'bg-gray-100 text-gray-700',
    devops: 'bg-green-100 text-green-700',
};

const Dashboard = () => {
    const { user } = useAuth();
    const [exams, setExams] = useState([]);
    const { results } = useResults();

    useEffect(() => {
        getExamsApi().then(({ data }) => setExams(data));
    }, []);

    const passed = results.filter((r) => r.passed).length;
    const failed = results.filter((r) => !r.passed).length;

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name?.split(' ')[0]} 👋
                </h1>
                <p className="text-gray-500 text-sm mt-1">Pick an exam to get started or review your history.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Exams Available', value: exams.length, icon: <BookOpen size={18} />, color: 'text-blue-600' },
                    { label: 'Attempts', value: results.length, icon: <Clock size={18} />, color: 'text-gray-600' },
                    { label: 'Passed', value: passed, icon: <CheckCircle size={18} />, color: 'text-green-600' },
                    { label: 'Failed', value: failed, icon: <XCircle size={18} />, color: 'text-red-500' },
                ].map(({ label, value, icon, color }) => (
                    <div key={label} className="card flex items-center gap-4">
                        <span className={color}>{icon}</span>
                        <div>
                            <p className="text-2xl font-bold">{value}</p>
                            <p className="text-xs text-gray-500">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Exams grid */}
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Exams</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {exams.map((exam) => (
                        <Link
                            key={exam.id}
                            to={`/exam/${exam.slug}`}
                            className="card hover:shadow-md hover:border-blue-200 transition-all group"
                        >
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[exam.category] || 'bg-gray-100 text-gray-700'}`}>
                                {exam.category.toUpperCase()}
                            </span>
                            <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {exam.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{exam.description}</p>
                            <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
                                <span>{exam.durationMinutes} min</span>
                                <span>·</span>
                                <span>Pass: {exam.passingScore}%</span>
                                <span>·</span>
                                <span className="capitalize">{exam.difficulty}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent results */}
            {results.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Results</h2>
                    <div className="card overflow-x-auto p-0">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                <tr>
                                    {['Exam', 'Score', 'Status', 'Date', ''].map((h) => (
                                        <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {results.slice(0, 5).map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-800">{r.exam?.title}</td>
                                        <td className="px-4 py-3">{r.score}%</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${r.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                                {r.passed ? 'Passed' : 'Failed'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-3">
                                            <Link to={`/result/${r.id}`} className="text-blue-600 hover:underline text-xs">Review</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
