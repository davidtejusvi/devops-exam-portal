import React, { useState } from 'react';
import { useExam } from '../../hooks/useExam';
import ExamRunner from '../../components/ExamRunner';
import { BookOpen, Clock, Target, AlertTriangle } from 'lucide-react';

/**
 * Shared exam page component.
 * @param {string} slug - exam slug matching the backend
 */
const ExamPage = ({ slug }) => {
    const { exam, loading, error } = useExam(slug);
    const [started, setStarted] = useState(false);

    if (loading) return <div className="flex justify-center py-20 text-gray-400">Loading exam…</div>;
    if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
    if (!exam) return null;

    if (started) return <ExamRunner exam={exam} />;

    // Start screen
    return (
        <div className="max-w-xl mx-auto">
            <div className="card space-y-6 text-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
                    <p className="text-gray-500 mt-2">{exam.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                        <BookOpen size={20} className="text-blue-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-800">{exam.questions?.length || '—'}</p>
                        <p className="text-xs text-gray-500">Questions</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4">
                        <Clock size={20} className="text-orange-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-800">{exam.durationMinutes} min</p>
                        <p className="text-xs text-gray-500">Duration</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                        <Target size={20} className="text-green-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-800">{exam.passingScore}%</p>
                        <p className="text-xs text-gray-500">Pass mark</p>
                    </div>
                </div>

                <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-left">
                    <AlertTriangle size={16} className="text-yellow-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-yellow-800">
                        The timer starts immediately when you click Begin. Make sure you have enough time before starting.
                    </p>
                </div>

                <button onClick={() => setStarted(true)} className="btn-primary w-full text-base py-3">
                    Begin Exam
                </button>
            </div>
        </div>
    );
};

export default ExamPage;
