import { useState, useEffect } from 'react';

export default function useVideos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await fetch('/api/videos');

                if (!response.ok) throw new Error("Failed to fetch videos");

                const data = await response.json();
                setVideos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, []);

    return { videos, loading, error };
}