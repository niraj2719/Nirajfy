import React from 'react';
import { Home, Search, Library } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-black/95 px-6 pb-6 pt-4 border-t border-white/5 flex justify-between items-center z-50 backdrop-blur-md">
            <div
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center gap-1 group cursor-pointer transition-colors duration-200 ${activeTab === 'home' ? 'text-white' : 'text-textSub hover:text-white'}`}
            >
                <Home className={`w-6 h-6 ${activeTab === 'home' ? 'fill-white' : ''}`} />
                <span className="text-[10px] font-medium">Home</span>
            </div>

            <div
                onClick={() => setActiveTab('search')}
                className={`flex flex-col items-center gap-1 group cursor-pointer transition-colors duration-200 ${activeTab === 'search' ? 'text-white' : 'text-textSub hover:text-white'}`}
            >
                <Search className="w-6 h-6" />
                <span className="text-[10px] font-medium">Search</span>
            </div>

            <div
                onClick={() => setActiveTab('library')}
                className={`flex flex-col items-center gap-1 group cursor-pointer transition-colors duration-200 ${activeTab === 'library' ? 'text-white' : 'text-textSub hover:text-white'}`}
            >
                <Library className={`w-6 h-6 ${activeTab === 'library' ? 'fill-white' : ''}`} />
                <span className="text-[10px] font-medium">Library</span>
            </div>
        </div>
    );
}
