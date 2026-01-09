// This file simulates a database for your local/GitHub-hosted files.
// To add a song:
// 1. Put the mp3 file in 'public/songs/'
// 2. Put the cover image in 'public/covers/'
// 3. Add an object to this list below.

export const localSongs = [
    {
        id: 'local_1',
        title: 'Demo Song',
        artist: 'Nirajfy Artist',
        // These paths must match the filenames in public/songs and public/covers
        // For example: public/songs/demo.mp3 -> /songs/demo.mp3
        audioUrl: '/songs/demo.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop',
        createdAt: new Date().toISOString()
    }
];
