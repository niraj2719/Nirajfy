
import { Track, Playlist } from './types';

// Using high-quality royalty-free sample tracks for demonstration
export const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Electronic Vibe',
    artist: 'Gemini Echo',
    album: 'Silicon Dreams',
    duration: '2:15',
    coverUrl: 'https://picsum.photos/seed/music1/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Synthwave'
  },
  {
    id: '2',
    title: 'Night Drive',
    artist: 'The Algorithm',
    album: 'Deep Code',
    duration: '7:05',
    coverUrl: 'https://picsum.photos/seed/music2/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Electronica'
  },
  {
    id: '3',
    title: 'Calm Forest',
    artist: 'Solaris',
    album: 'Horizon',
    duration: '5:42',
    coverUrl: 'https://picsum.photos/seed/music3/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Ambient'
  },
  {
    id: '4',
    title: 'Cyberpunk City',
    artist: 'V-Drome',
    album: 'Night City',
    duration: '5:02',
    coverUrl: 'https://picsum.photos/seed/music5/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    genre: 'Cyber-Jazz'
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Top Hits 2024',
    description: 'The biggest tracks right now.',
    coverUrl: 'https://picsum.photos/seed/p1/400/400',
    tracks: MOCK_TRACKS
  }
];
