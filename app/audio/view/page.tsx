'use client';

import React, { useEffect, useState } from 'react';

const MusicDataPage = () => {
    const [musicData, setMusicData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                const response = await fetch('/api/audio');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMusicData(data.musics);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMusicData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching music data: {error.message}</div>;

    return (
        <div>
            <h1>Music Data</h1>
            <ul>
            {Array.isArray(musicData) && musicData.map((track) => (
                <li key={track.id}>
                    <h2>{track.title}</h2>
                    <p>{track.artist}</p>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default MusicDataPage;