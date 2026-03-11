import React from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GreetingCard({ song, onPlay, isPlaying }) {
  const handlePlay = (e) => {
    e.stopPropagation();
    onPlay(song);
  };

  return (
    <motion.div 
      className={`transition-colors duration-300 rounded-md flex items-center overflow-hidden group cursor-pointer shadow-lg shadow-black/20 ${isPlaying ? 'bg-indigo-600/30' : 'bg-white/5 hover:bg-white/10'}`}
      whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
      onClick={() => onPlay(song)}
    >
      <img src={song.cover} alt={song.title} className="w-20 h-20 object-cover" />
      <h3 className={`font-semibold ml-4 text-base flex-1 pr-2 truncate ${isPlaying ? 'text-indigo-300' : 'text-white'}`}>{song.title}</h3>
      <motion.div 
        className="mr-4 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-600/40 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out"
        style={isPlaying ? { opacity: 1, transform: 'scale(1)' } : {}}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePlay}
      >
        {isPlaying ? <Pause size={22} className="fill-current" /> : <Play size={22} className="fill-current ml-0.5" />}
      </motion.div>
    </motion.div>
  );
}
