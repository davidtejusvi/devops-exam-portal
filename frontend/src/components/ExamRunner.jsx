import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { submitExamApi } from '../api/exams';
import { Clock, ChevronLeft, ChevronRight, Send } from 'lucide-react';

const ExamRunner = ({ exam }) => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);
    const [submitting, setSubmitting] = useState(false);
    const [startTime] = useState(Date.now());

    const questions = exam.questions || [];

    const handleSubmit = useCallback(async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            const timeTakenSeconds = Math.floor((Date.now() - startTime) / 1000);
            const { data } = await submitExamApi(exam.slug, { answers, timeTakenSeconds });
            toast.success(`Score: ${data.result.score}% — ${data.result.passed ? 'Passed!' : 'Failed'}`);
            navigate(`/result/${data.result.id}`);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Submission failed');
            setSubmitting(false);
        }
    }, [answers, exam.slug, navigate, startTime, submitting]);

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) { handleSubmit(); return; }
        const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
        return () => clearInterval(t);
    }, [timeLeft, handleSubmit]);

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const q = questions[current];
    const answered = Object.keys(answers).length;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{exam.title}</h1>
                    <p className="text-sm text-gray-500">Question {current + 1} of {questions.length}</p>
                </div>
                <div className={`flex items-center gap-2 font-mono font-semibold text-lg px-4 py-2 rounded-lg ${timeLeft < 60 ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    <Clock size={18} />
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                />
            </div>

            {/* Question */}
            {q && (
                <div className="card space-y-4">
                    <p className="text-gray-900 font-medium leading-relaxed">{q.text}</p>
                    <div className="space-y-2">
                        {q.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => setAnswers({ ...answers, [q.id]: i })}
                                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${answers[q.id] === i
                                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                    disabled={current === 0}
                    className="btn-secondary"
                >
                    <ChevronLeft size={16} /> Previous
                </button>

                <span className="text-sm text-gray-500">{answered}/{questions.length} answered</span>

                {current < questions.length - 1 ? (
                    <button onClick={() => setCurrent((c) => c + 1)} className="btn-primary">
                        Next <ChevronRight size={16} />
                    </button>
                ) : (
                    <button onClick={handleSubmit} disabled={submitting} className="btn-primary bg-green-600 hover:bg-green-700">
                        <Send size={16} /> {submitting ? 'Submitting…' : 'Submit Exam'}
                    </button>
                )}
            </div>

            {/* Question nav dots */}
            <div className="flex flex-wrap gap-1.5">
                {questions.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-8 h-8 rounded-md text-xs font-semibold transition-colors ${i === current ? 'bg-blue-600 text-white' :
                                answers[questions[i]?.id] !== undefined ? 'bg-green-100 text-green-700' :
                                    'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ExamRunner;
