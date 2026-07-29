import { useState, useEffect } from 'react';
import { getResultsApi } from '../api/results';

export const useResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getResultsApi()
            .then(({ data }) => setResults(data))
            .catch((err) => setError(err.response?.data?.message || 'Failed to load results'))
            .finally(() => setLoading(false));
    }, []);

    return { results, loading, error };
};
