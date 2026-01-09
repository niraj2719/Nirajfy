
import React from 'react';
import { Play, Heart } from 'lucide-react';
import { Track, Playlist } from '../types';
import { MOCK_PLAYLISTS, MOCK_TRACKS } from '../constants';

interface HomeViewProps {
  onPlayTrack: (track: Track) => void;
  onPlayPlaylist: (playlist: Playlist) => void;
  likedIds: string[];
  toggleLike: (id: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onPlayTrack, onPlayPlaylist, likedIds, toggleLike }) => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-900 to-black p-8 pb-32">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{greeting()}</h1>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {MOCK_PLAYLISTS.map((playlist) => (
          <div key={playlist.id} className="flex items-center bg-white/5 hover:bg-white/10 rounded overflow-hidden group transition-colors cursor-pointer" onClick={() => onPlayPlaylist(playlist)}>
            <img src={playlist.coverUrl} className="h-20 w-20 object-cover" />
            <div className="flex flex-1 items-center justify-between px-4">
              <span className="font-bold truncate">{playlist.name}</span>
              <button className="bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 shadow-xl transition-all translate-y-2 group-hover:translate-y-0">
                <Play size={20} fill="currentColor" />
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Made For You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {MOCK_TRACKS.map((track) => (
            <div key={track.id} className="bg-zinc-900/40 hover:bg-zinc-800/60 p-4 rounded-lg transition-all group cursor-pointer relative" onClick={() => onPlayTrack(track)}>
              <div className="relative mb-4 aspect-square">
                <img src={track.coverUrl} className="w-full h-full object-cover rounded shadow-2xl" />
                <button className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 shadow-2xl transition-all hover:scale-105">
                  <Play size={24} fill="currentColor" />
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-bold text-sm truncate">{track.title}</h3>
                  <p className="text-xs text-zinc-500 truncate">{track.artist}</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }}
                  className={`ml-2 transition-colors ${likedIds.includes(track.id) ? 'text-green-500' : 'text-zinc-500 hover:text-white'}`}
                >
                  <Heart size={16} fill={likedIds.includes(track.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeView;
