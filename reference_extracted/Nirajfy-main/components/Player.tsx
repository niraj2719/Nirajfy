
import React, { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, 
  Volume2, Maximize2, Mic2, ListMusic, Volume1, VolumeX,
  Heart
} from 'lucide-react';
import { Track } from '../types';

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const Player: React.FC<PlayerProps> = ({ 
  currentTrack, 
  isPlaying, 
  onTogglePlay, 
  onNext, 
  onPrev,
  currentTime,
  duration,
  onSeek
}) => {
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentTrack) return null;

  return (
    <div className="h-24 bg-zinc-950 border-t border-white/5 flex items-center justify-between px-4 fixed bottom-0 left-0 right-0 z-50">
      <div className="flex items-center w-1/3">
        <div className="h-14 w-14 bg-zinc-800 rounded shadow-lg overflow-hidden flex-shrink-0">
          <img src={currentTrack.coverUrl} className="w-full h-full object-cover" />
        </div>
        <div className="ml-4 overflow-hidden">
          <h4 className="text-sm font-semibold text-white truncate hover:underline cursor-pointer">{currentTrack.title}</h4>
          <p className="text-xs text-zinc-400 truncate hover:underline cursor-pointer">{currentTrack.artist}</p>
        </div>
        <button className="ml-4 text-zinc-400 hover:text-green-500 transition-colors"><Heart size={18} /></button>
      </div>

      <div className="flex flex-col items-center w-1/3 space-y-2">
        <div className="flex items-center space-x-6">
          <button className="text-zinc-400 hover:text-white"><Shuffle size={20} /></button>
          <button onClick={onPrev} className="text-zinc-400 hover:text-white"><SkipBack size={24} fill="currentColor" /></button>
          <button onClick={onTogglePlay} className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform active:scale-95">
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-0.5" />}
          </button>
          <button onClick={onNext} className="text-zinc-400 hover:text-white"><SkipForward size={24} fill="currentColor" /></button>
          <button className="text-zinc-400 hover:text-white"><Repeat size={20} /></button>
        </div>
        
        <div className="w-full max-w-md flex items-center space-x-2">
          <span className="text-[10px] text-zinc-500 min-w-[35px] text-right">{formatTime(currentTime)}</span>
          <div 
            className="flex-1 h-1 bg-zinc-800 rounded-full group cursor-pointer relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const pct = x / rect.width;
              onSeek(pct * duration);
            }}
          >
            <div className="h-full bg-white rounded-full relative group-hover:bg-green-500" style={{ width: `${progress}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg" />
            </div>
          </div>
          <span className="text-[10px] text-zinc-500 min-w-[35px]">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-end w-1/3 space-x-3">
        <button className="text-zinc-400 hover:text-white"><Mic2 size={18} /></button>
        <button className="text-zinc-400 hover:text-white"><ListMusic size={18} /></button>
        <div className="flex items-center space-x-2 group w-32">
          <button onClick={() => setIsMuted(!isMuted)} className="text-zinc-400 hover:text-white">
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="flex-1 h-1 bg-zinc-800 rounded-full cursor-pointer relative">
            <div className={`h-full ${isMuted ? 'bg-zinc-600' : 'bg-white group-hover:bg-green-500'} rounded-full`} style={{ width: isMuted ? '0%' : `${volume * 100}%` }} />
          </div>
        </div>
        <button className="text-zinc-400 hover:text-white"><Maximize2 size={18} /></button>
      </div>
    </div>
  );
};

export default Player;
