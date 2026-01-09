import React, { useEffect, useState } from 'react';
import { Settings, Bell, Clock, LogOut, Upload, Search, Music2, Heart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import BottomNav from './components/BottomNav';
import Player from './components/Player';
import { playlists, recentlyPlayed, madeForYou } from './data';

import { localSongs } from './localData';

function Home() {
    const [activeTab, setActiveTab] = useState('home');
    const [greeting, setGreeting] = useState('');
    // Use localSongs as the default/initial state
    const [songs, setSongs] = useState(localSongs);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // 1. Dynamic Greeting
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);

    const handleLogout = () => {
        signOut(auth);
    };

    const filteredSongs = songs.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-background min-h-screen pb-32 font-sans select-none overflow-x-hidden">
            {/* Background Gradient */}
            <div className={`fixed top-0 left-0 right-0 h-96 bg-gradient-to-b pointer-events-none z-0 ${activeTab === 'search' ? 'from-purple-900/40' : 'from-emerald-900/40'} to-background`} />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto">

                {/* === HOME VIEW === */}
                {activeTab === 'home' && (
                    <>
                        {/* Header */}
                        <div className="pt-6 px-4 flex justify-between items-center z-10 sticky top-0 bg-background/0 backdrop-blur-sm transition-all duration-300">
                            <div className="flex items-center gap-3">
                                <div className="bg-pink-500 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-black">N</div>
                                <span className="text-white text-xs bg-black/40 px-3 py-1 rounded-full border border-white/10">Music</span>
                                <span className="text-white text-xs bg-black/40 px-3 py-1 rounded-full border border-white/10">Podcasts</span>
                            </div>
                            <div className="flex items-center gap-4 text-white">
                                <Link to="/upload" title="Upload Music">
                                    <Upload className="w-6 h-6 hover:text-white/80 cursor-pointer text-textSub" />
                                </Link>
                                <LogOut
                                    className="w-6 h-6 hover:text-red-500 cursor-pointer transition-colors"
                                    onClick={handleLogout}
                                />
                            </div>
                        </div>

                        {/* Quick Play Grid */}
                        <div className="px-4 mt-6 grid grid-cols-2 gap-3">
                            {playlists.map((playlist) => (
                                <div
                                    key={playlist.id}
                                    className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden pr-3 hover:bg-white/10 transition-colors cursor-pointer group"
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-br ${playlist.color} flex-shrink-0`}>
                                        <img src={playlist.image} className="w-full h-full object-cover opacity-80" alt={playlist.name} />
                                    </div>
                                    <span className="text-white font-semibold text-xs ml-3 line-clamp-2">{playlist.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* REAL Songs Section (Uploaded by User) */}
                        {songs.length > 0 && (
                            <div className="mt-8 px-4">
                                <h2 className="text-xl font-bold text-white mb-4">Your Uploads</h2>
                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">
                                    {songs.map((song) => (
                                        <div key={song.id} className="flex-shrink-0 w-36 snap-start group cursor-pointer">
                                            <div className="w-36 h-36 mb-3 relative">
                                                <img src={song.imageUrl} alt={song.title} className="w-full h-full object-cover rounded-md shadow-lg" />
                                            </div>
                                            <p className="text-white font-semibold text-sm truncate">{song.title}</p>
                                            <p className="text-textSub text-xs pt-1 truncate">{song.artist}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recommendations Sections */}
                        <div className="mt-8 px-4">
                            <h2 className="text-xl font-bold text-white mb-4">Made For You</h2>
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">
                                {madeForYou.map((item) => (
                                    <div key={item.id} className="flex-shrink-0 w-36 snap-start">
                                        <div className="w-36 h-36 mb-3 cursor-pointer">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md shadow-lg" />
                                        </div>
                                        <p className="text-textSub text-xs pt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* === SEARCH VIEW === */}
                {activeTab === 'search' && (
                    <div className="px-4 pt-4 h-full min-h-screen">
                        <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
                        <div className="bg-white rounded-md p-3 flex items-center mb-6">
                            <Search className="text-black w-6 h-6 mr-3" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Artists, songs, or podcasts"
                                className="w-full outline-none text-black font-medium placeholder-gray-500"
                                autoFocus
                            />
                        </div>

                        <h2 className="text-white font-bold mb-4">Browse All</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Search Results if query exists */}
                            {searchQuery ? (
                                filteredSongs.map(song => (
                                    <div key={song.id} className="bg-zinc-800 p-4 rounded-md">
                                        <img src={song.imageUrl} className="w-full aspect-square object-cover mb-2 rounded" />
                                        <p className="text-white font-bold truncate">{song.title}</p>
                                        <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                                    </div>
                                ))
                            ) : (
                                // Categories Grid (Mock)
                                ['Pop', 'Hip-Hop', 'Rock', 'Indie', 'Jazz', 'Live Events'].map((genre, i) => (
                                    <div key={i} className={`h-24 rounded-md p-3 relative overflow-hidden bg-gradient-to-br ${['from-red-500', 'from-blue-500', 'from-green-500', 'from-purple-500', 'from-yellow-500', 'from-pink-500'][i]} to-black/40`}>
                                        <span className="text-white font-bold">{genre}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* === LIBRARY VIEW === */}
                {activeTab === 'library' && (
                    <div className="px-4 pt-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold">N</div>
                            <h1 className="text-2xl font-bold text-white">Your Library</h1>
                            <Search className="ml-auto w-6 h-6 text-white" />
                            <Upload className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex gap-2 mb-6 overflow-x-auto">
                            <span className="bg-zinc-800 text-white px-4 py-1.5 rounded-full text-sm border border-white/10 whitespace-nowrap">Playlists</span>
                            <span className="bg-zinc-800 text-white px-4 py-1.5 rounded-full text-sm border border-white/10 whitespace-nowrap">Artists</span>
                            <span className="bg-zinc-800 text-white px-4 py-1.5 rounded-full text-sm border border-white/10 whitespace-nowrap">Albums</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center rounded">
                                    <Heart className="text-white fill-white w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Liked Songs</p>
                                    <p className="text-textSub text-sm">Playlist • {songs.length} songs</p>
                                </div>
                            </div>

                            {songs.map(song => (
                                <div key={song.id} className="flex items-center gap-3">
                                    <img src={song.imageUrl} className="w-14 h-14 rounded object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">{song.title}</p>
                                        <p className="text-textSub text-sm truncate">Song • {song.artist}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <Player />
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
}

export default Home;
