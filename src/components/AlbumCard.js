import React from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import Waveform from './Waveform';

const cardVariants = {
  rest: { y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  hover: { y: -8, transition: { duration: 0.3, ease: 'easeOut' } }
};

const playButtonVariants = {
  rest: { opacity: 0, scale: 0.8, y: 10 },
  hover: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }
};

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 }
};

export default function AlbumCard({ song, onPlay, isPlaying }) {
  const handlePlay = (e) => {
    e.stopPropagation();
    onPlay(song);
  };

  return (
    <motion.div 
      className={`bg-slate-900/50 p-4 rounded-lg group relative cursor-pointer transition-all duration-300 hover:bg-slate-800/80 ${isPlaying ? 'bg-indigo-600/20 ring-2 ring-indigo-500' : ''}`}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      onClick={() => onPlay(song)}
    >
      <div className="relative mb-4 overflow-hidden rounded-md">
        <img src={song.cover} alt={song.title} className="w-full h-auto object-cover aspect-square shadow-lg group-hover:scale-105 transition-transform duration-300" />
        <motion.div 
          className="absolute inset-0 bg-black/40"
          variants={overlayVariants}
        />
        {isPlaying && (
          <div className="absolute bottom-2 left-2">
            <Waveform />
          </div>
        )}
        <motion.div 
          className="absolute bottom-2 right-2"
          variants={playButtonVariants}
        >
          <motion.button
            onClick={handlePlay}
            className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-600/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-0.5" />}
          </motion.button>
        </motion.div>
      </div>
      <h3 className={`font-bold truncate text-sm ${isPlaying ? 'text-indigo-300' : 'text-white'}`}>{song.title}</h3>
      <p className="text-xs text-slate-400 truncate">{song.artist}</p>
    </motion.div>
  );
}
