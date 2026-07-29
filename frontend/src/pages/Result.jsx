import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResultApi } from '../api/results';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

const Result = () => {
    const { id } = useParams();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getResultApi(id)
            .then(({ data }) => setResult(data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="flex justify-center py-20 text-gray-400">Loading result…</div>;
    if (!result) return <div className="text-center py-20 text-gray-500">Result not found.</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Score card */}
            <div className={`card text-center space-y-3 border-2 ${result.passed ? 'border-green-400' : 'border-red-300'}`}>
                {result.passed
                    ? <CheckCircle size={48} className="text-green-500 mx-auto" />
                    : <XCircle size={48} className="text-red-400 mx-auto" />}
                <h1 className="text-3xl font-bold text-gray-900">{result.score}%</h1>
                <p className={`text-lg font-semibold ${result.passed ? 'text-green-600' : 'text-red-500'}`}>
                    {result.passed ? '🎉 Passed!' : 'Not Passed'}
                </p>
                <p className="text-sm text-gray-500">
                    {result.correctAnswers} / {result.totalQuestions} correct
                    {result.timeTakenSeconds && ` · ${Math.floor(result.timeTakenSeconds / 60)}m ${result.timeTakenSeconds % 60}s`}
                </p>
                <p className="text-sm text-gray-400">{result.exam?.title}</p>
            </div>

            <Link to="/dashboard" className="btn-secondary w-full justify-center">
                <ArrowLeft size={16} /> Back to Dashboard
            </Link>

            <Link to={`/exam/${result.exam?.slug}`} className="btn-primary w-full justify-center">
                Retake Exam
            </Link>
        </div>
    );
};

export default Result;
