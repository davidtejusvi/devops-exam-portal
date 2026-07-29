import { useState, useEffect } from 'react';
import { getExamApi } from '../api/exams';

export const useExam = (slug) => {
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        getExamApi(slug)
            .then(({ data }) => setExam(data))
            .catch((err) => setError(err.response?.data?.message || 'Failed to load exam'))
            .finally(() => setLoading(false));
    }, [slug]);

    return { exam, loading, error };
};
