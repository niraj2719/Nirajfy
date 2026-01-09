
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import HomeView from './components/HomeView';
import AIDJView from './components/AIDJView';
import { ViewMode, Track, Playlist } from './types';
import { MOCK_TRACKS } from './constants';
import { Search, ChevronLeft, ChevronRight, User, Music2 } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.HOME);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Track[]>(MOCK_TRACKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('gemini-fi-likes');
    return saved ? JSON.parse(saved) : [];
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    localStorage.setItem('gemini-fi-likes', JSON.stringify(likedIds));
  }, [likedIds]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTogglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentTrack(queue[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentTrack(queue[prevIndex]);
    setIsPlaying(true);
  };

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const toggleLike = (id: string) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredTracks = MOCK_TRACKS.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      <audio 
        ref={audioRef} 
        src={currentTrack?.audioUrl} 
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={handleNext}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={view} setView={setView} />

        <div className="flex-1 flex flex-col relative overflow-hidden bg-zinc-950">
          <header className="h-16 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md absolute top-0 left-0 right-0 z-40">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <button className="bg-black/40 rounded-full p-1 text-zinc-400 hover:text-white"><ChevronLeft size={24} /></button>
                <button className="bg-black/40 rounded-full p-1 text-zinc-400 hover:text-white"><ChevronRight size={24} /></button>
              </div>
              
              {view === ViewMode.SEARCH && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tracks or artists..." 
                    className="bg-zinc-800 border-none rounded-full py-2 pl-10 pr-4 w-80 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-white text-black text-sm font-bold py-1.5 px-4 rounded-full hover:scale-105 transition-transform">Explore Premium</button>
              <div className="bg-black/40 rounded-full p-1.5 text-zinc-400 hover:text-white transition-colors flex items-center space-x-2 pr-4">
                <div className="bg-zinc-700 rounded-full p-1"><User size={16} /></div>
                <span className="text-sm font-bold">Demo User</span>
              </div>
            </div>
          </header>

          <main className="flex-1 pt-16 overflow-hidden">
            {view === ViewMode.HOME && (
              <HomeView 
                onPlayTrack={handlePlayTrack} 
                onPlayPlaylist={(p) => { setQueue(p.tracks); handlePlayTrack(p.tracks[0]); }} 
                likedIds={likedIds}
                toggleLike={toggleLike}
              />
            )}
            {view === ViewMode.SEARCH && (
              <div className="flex-1 overflow-y-auto p-8 pt-4">
                 <h2 className="text-2xl font-bold mb-6">{searchQuery ? `Results for "${searchQuery}"` : 'Browse All'}</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {filteredTracks.map((track) => (
                      <div key={track.id} className="bg-zinc-900/40 hover:bg-zinc-800/60 p-4 rounded-lg transition-all group cursor-pointer" onClick={() => handlePlayTrack(track)}>
                        <div className="relative mb-4 aspect-square">
                          <img src={track.coverUrl} className="w-full h-full object-cover rounded shadow-2xl" />
                          <button className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 shadow-2xl translate-y-2 group-hover:translate-y-0 transition-all">
                            <Music2 size={24} fill="currentColor" />
                          </button>
                        </div>
                        <h3 className="font-bold text-sm truncate">{track.title}</h3>
                        <p className="text-xs text-zinc-500">{track.artist}</p>
                      </div>
                    ))}
                 </div>
              </div>
            )}
            {view === ViewMode.AI_DJ && <AIDJView onPlayTrack={handlePlayTrack} />}
            {view === ViewMode.LIBRARY && (
              <div className="flex-1 overflow-y-auto p-8">
                <h2 className="text-3xl font-bold mb-6">Liked Songs</h2>
                {likedIds.length === 0 ? (
                  <p className="text-zinc-500">You haven't liked any songs yet.</p>
                ) : (
                  <div className="space-y-2">
                    {MOCK_TRACKS.filter(t => likedIds.includes(t.id)).map(track => (
                      <div key={track.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-md group cursor-pointer" onClick={() => handlePlayTrack(track)}>
                        <div className="flex items-center space-x-4">
                          <img src={track.coverUrl} className="w-10 h-10 rounded" />
                          <div>
                            <div className="font-bold">{track.title}</div>
                            <div className="text-sm text-zinc-400">{track.artist}</div>
                          </div>
                        </div>
                        <div className="text-zinc-500 text-sm">{track.duration}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      <Player 
        currentTrack={currentTrack} 
        isPlaying={isPlaying} 
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        currentTime={currentTime}
        duration={duration}
        onSeek={(val) => { if(audioRef.current) audioRef.current.currentTime = val; }}
      />
    </div>
  );
};

export default App;
