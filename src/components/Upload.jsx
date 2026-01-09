import React, { useState } from 'react';
import { Upload as UploadIcon, Music, Image as ImageIcon } from 'lucide-react';
import { localSongs } from '../localData';

export default function Upload() {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [message, setMessage] = useState('');

    // This function doesn't actually upload anywhere because we are in "Local/GitHub" mode.
    // It gives instructions instead.
    const handleUpload = (e) => {
        e.preventDefault();
        if (!title || !artist) {
            setMessage('Please enter a title and artist.');
            return;
        }

        // In a real app we would write to file here, but browsers can't write to disk.
        // So we show the user what to do.
        setMessage('To add this song permanently: 1. Move your MP3 to "public/songs/" 2. Move your Cover to "public/covers/" 3. Add details to "src/localData.js"');
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 pb-32">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <UploadIcon className="w-8 h-8 text-primary" />
                Add Local Song (GitHub Mode)
            </h1>

            <div className="bg-neutral-900 border border-yellow-500/50 rounded-lg p-6 mb-8 text-sm text-gray-300">
                <h3 className="text-yellow-500 font-bold text-lg mb-2">⚠ How to add music with GitHub/Local:</h3>
                <p className="mb-2">Since we are avoiding paid cloud storage, you must add files manually to the project folder:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2 text-white">
                    <li>Copy your <b>.mp3</b> file to <code className="bg-black px-1 rounded">public/songs/</code></li>
                    <li>Copy your <b>image</b> file to <code className="bg-black px-1 rounded">public/covers/</code></li>
                    <li>Open <code className="bg-black px-1 text-primary rounded">src/localData.js</code> and add your song details.</li>
                    <li>Commit and Push your code to GitHub.</li>
                </ol>
            </div>

            <form onSubmit={handleUpload} className="max-w-xl space-y-6 bg-neutral-900 p-6 rounded-lg border border-white/10 opacity-50 pointer-events-none">
                {/* Disabled Form just for visual reference */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Song Title</label>
                        <input type="text" className="w-full bg-neutral-800 rounded p-2" disabled value={title} />
                    </div>
                </div>
                <button className="w-full bg-neutral-700 text-gray-400 py-3 rounded-full font-bold">
                    Upload Disabled in Local Mode
                </button>
            </form>
        </div>
    );
}
