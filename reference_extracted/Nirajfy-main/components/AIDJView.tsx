
import React, { useState } from 'react';
import { Sparkles, Play, Plus, Loader2, Music4 } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { Track } from '../types';

interface AIDJViewProps {
  onPlayTrack: (track: Track) => void;
}

const AIDJView: React.FC<AIDJViewProps> = ({ onPlayTrack }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<{
    description: string;
    tracks: any[];
  } | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const service = new GeminiService();
    const result = await service.getRecommendations(prompt);
    setRecommendations(result);
    setLoading(false);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-indigo-950/40 to-black">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-3xl shadow-2xl animate-pulse">
            <Sparkles size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-black">AI DJ G-Mix</h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            Tell G-Mix what you're feeling, and he'll curate a conceptual playlist using the power of Gemini.
          </p>
        </div>

        <div className="relative group">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Late night coding in a cyberpunk city"
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-full py-4 px-6 text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-zinc-600"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black font-bold py-2.5 px-6 rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Generate'}
          </button>
        </div>

        {recommendations && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold mb-2 flex items-center">
                <Sparkles size={20} className="mr-2 text-purple-400" />
                The Vibe
              </h2>
              <p className="text-zinc-300 italic">"{recommendations.description}"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.tracks.map((track, idx) => (
                <div 
                  key={idx}
                  className="group bg-zinc-900/40 hover:bg-zinc-800/60 p-4 rounded-xl flex items-center justify-between border border-transparent hover:border-white/10 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-zinc-800 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Music4 className="text-zinc-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">{track.title}</h4>
                      <p className="text-sm text-zinc-500">{track.artist} • {track.genre}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onPlayTrack({
                        id: `ai-${idx}`,
                        title: track.title,
                        artist: track.artist,
                        album: 'AI Curation',
                        duration: track.duration || '3:30',
                        coverUrl: `https://picsum.photos/seed/ai-${idx}/200/200`
                      })}
                      className="p-2 bg-purple-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                    >
                      <Play size={20} fill="currentColor" />
                    </button>
                    <button className="p-2 text-zinc-500 hover:text-white">
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDJView;
