
import React from 'react';
import { Home, Search, Library, PlusCircle, Heart, Music2, Radio } from 'lucide-react';
import { ViewMode } from '../types';
import { MOCK_PLAYLISTS } from '../constants';

interface SidebarProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <div className="w-64 bg-black h-full flex flex-col p-4 space-y-6 select-none border-r border-white/5">
      <div className="flex items-center space-x-2 px-2 py-4">
        <div className="bg-green-500 p-1.5 rounded-full">
          <Music2 size={24} className="text-black" />
        </div>
        <span className="text-2xl font-bold tracking-tight">Gemini-Fi</span>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => setView(ViewMode.HOME)}
          className={`flex items-center space-x-4 w-full px-3 py-2 rounded-md transition-colors ${
            currentView === ViewMode.HOME ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Home size={24} />
          <span className="font-semibold">Home</span>
        </button>
        <button
          onClick={() => setView(ViewMode.SEARCH)}
          className={`flex items-center space-x-4 w-full px-3 py-2 rounded-md transition-colors ${
            currentView === ViewMode.SEARCH ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Search size={24} />
          <span className="font-semibold">Search</span>
        </button>
        <button
          onClick={() => setView(ViewMode.LIBRARY)}
          className={`flex items-center space-x-4 w-full px-3 py-2 rounded-md transition-colors ${
            currentView === ViewMode.LIBRARY ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Library size={24} />
          <span className="font-semibold">Your Library</span>
        </button>
        <button
          onClick={() => setView(ViewMode.AI_DJ)}
          className={`flex items-center space-x-4 w-full px-3 py-2 rounded-md transition-colors group ${
            currentView === ViewMode.AI_DJ ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Radio size={24} className="group-hover:text-green-400" />
          <span className="font-semibold">AI DJ</span>
        </button>
      </nav>

      <div className="pt-4 flex flex-col space-y-2">
        <button className="flex items-center space-x-4 w-full px-3 py-2 text-zinc-400 hover:text-white transition-colors">
          <div className="bg-zinc-300 p-1 rounded-sm">
            <PlusCircle size={20} className="text-black" />
          </div>
          <span className="font-semibold">Create Playlist</span>
        </button>
        <button className="flex items-center space-x-4 w-full px-3 py-2 text-zinc-400 hover:text-white transition-colors">
          <div className="bg-gradient-to-br from-indigo-700 to-blue-300 p-1 rounded-sm">
            <Heart size={20} className="text-white fill-white" />
          </div>
          <span className="font-semibold">Liked Songs</span>
        </button>
      </div>

      <div className="border-t border-zinc-800 pt-4 flex-1 overflow-y-auto">
        <h3 className="px-3 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Playlists</h3>
        <ul className="space-y-1">
          {MOCK_PLAYLISTS.map((playlist) => (
            <li key={playlist.id}>
              <button className="w-full text-left px-3 py-1.5 text-zinc-400 hover:text-white text-sm truncate">
                {playlist.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
