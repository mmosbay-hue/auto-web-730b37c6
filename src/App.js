import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';
import { AnimatePresence, motion } from 'framer-motion';
import musicData from './data/musicData';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  const [songs] = useState(musicData);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = currentSongIndex !== null ? songs[currentSongIndex] : null;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const playSong = useCallback((song) => {
    const songIndex = songs.findIndex(s => s.id === song.id);
    if (songIndex !== -1) {
      if (currentSongIndex === songIndex) {
        setIsPlaying(prev => !prev);
      } else {
        setCurrentSongIndex(songIndex);
        setIsPlaying(true);
      }
    }
  }, [songs, currentSongIndex]);

  const handleNextSong = useCallback(() => {
    if (songs.length === 0) return;
    const nextIndex = currentSongIndex === null ? 0 : (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  }, [songs.length, currentSongIndex]);

  const handlePrevSong = useCallback(() => {
    if (songs.length === 0) return;
    const prevIndex = currentSongIndex === null ? 0 : (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  }, [songs.length, currentSongIndex]);

  return (
    <div className="h-screen text-slate-300 font-sans flex flex-col lg:grid lg:grid-rows-[1fr_auto] lg:grid-cols-[auto_1fr] overflow-hidden">
      <AnimatePresence>
        {isSidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
      
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
      
      <main className="flex-grow lg:col-start-2 lg:row-start-1 overflow-y-auto">
        <MainContent 
          toggleSidebar={toggleSidebar} 
          songs={songs}
          onPlaySong={playSong}
          currentSong={currentSong}
          isPlaying={isPlaying}
        />
      </main>
      
      <footer className="w-full lg:col-span-2 lg:row-start-2 z-20">
        {currentSong ? (
          <Player 
            key={currentSong.id}
            currentSong={currentSong} 
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            onNext={handleNextSong}
            onPrev={handlePrevSong}
          />
        ) : (
          <div className="bg-slate-900/80 backdrop-blur-xl border-t border-white/5 px-4 py-3 md:px-6 h-[90px] flex items-center justify-center">
            <p className="text-slate-400">Select a song to play</p>
          </div>
        )}
      </footer>
    </div>
  );
}
