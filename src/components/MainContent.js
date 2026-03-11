import React from 'react';
import { ChevronLeft, ChevronRight, Bell, Menu } from 'lucide-react';
import AlbumCard from './AlbumCard';
import GreetingCard from './GreetingCard';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function MainContent({ toggleSidebar, songs, onPlaySong, currentSong, isPlaying }) {
  const greetingSongs = songs.slice(0, 6);

  return (
    <div className="bg-gradient-to-b from-indigo-900/30 via-slate-950/50 to-slate-950/10 min-h-full">
      <header className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-lg p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <button onClick={toggleSidebar} className="p-1.5 lg:hidden rounded-full hover:bg-white/20 transition-colors">
            <Menu size={20} />
          </button>
          <button className="p-1.5 bg-black/20 rounded-full hover:bg-white/20 transition-colors hidden sm:block"><ChevronLeft size={20} /></button>
          <button className="p-1.5 bg-black/20 rounded-full hover:bg-white/20 transition-colors hidden sm:block"><ChevronRight size={20} /></button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-black/20 rounded-full hover:bg-white/20 transition-colors relative">
            <Bell size={20} />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
          </button>
          <button className="flex items-center space-x-2 p-1 pr-3 bg-black/20 rounded-full hover:bg-white/20 transition-colors">
            <img src="https://i.pravatar.cc/40?u=alex" alt="User" className="w-7 h-7 rounded-full object-cover" />
            <span className="text-sm font-medium hidden sm:inline">Alex</span>
          </button>
        </div>
      </header>

      <div className="p-4 sm:p-6 space-y-12">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Good Afternoon</motion.h1>
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {greetingSongs.map(song => (
              <GreetingCard 
                key={song.id} 
                song={song} 
                onPlay={onPlaySong} 
                isPlaying={isPlaying && currentSong?.id === song.id}
              />
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex justify-between items-end mb-4">
            <h2 className="text-2xl font-bold text-white">Recently Played</h2>
            <a href="#" className="text-xs font-bold text-slate-400 uppercase tracking-wider hover:text-white transition-colors">Show All</a>
          </motion.div>
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {songs.map(song => 
              <AlbumCard 
                key={song.id} 
                song={song} 
                onPlay={onPlaySong} 
                isPlaying={isPlaying && currentSong?.id === song.id}
              />
            )}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
