import React, { useState } from 'react';
import { Play, Pause, SkipForward, Heart, MonitorSpeaker } from 'lucide-react';

export default function Player() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(30);

    return (
        <div className="fixed bottom-[85px] left-2 right-2 bg-player/95 backdrop-blur-lg rounded-lg p-2.5 flex items-center justify-between border border-white/5 shadow-2xl z-40 transform transition-all active:scale-[0.99]">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=100&auto=format&fit=crop" alt="Cover" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-white text-sm font-semibold truncate max-w-[140px] leading-tight">Levitating</span>
                    <span className="text-textSub text-xs truncate max-w-[140px]">Dua Lipa • Future Nostalgia</span>
                </div>
            </div>

            <div className="flex items-center gap-3 pr-2">
                <MonitorSpeaker className="w-5 h-5 text-primary" />
                <Heart className="w-5 h-5 text-primary fill-primary" />
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white focus:outline-none"
                >
                    {isPlaying ? <Pause className="w-7 h-7 fill-white" /> : <Play className="w-7 h-7 fill-white" />}
                </button>
            </div>

            {/* Progress Bar Background */}
            <div className="absolute bottom-0 left-1 right-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
}
