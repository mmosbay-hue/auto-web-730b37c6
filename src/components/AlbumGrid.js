import React, { useState, useMemo } from 'react';
import { Search, Music, User, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AlbumCard from './AlbumCard';
import useDebounce from '../hooks/useDebounce';

const SortButton = ({ children, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center space-x-2 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-white'
    }`}
  >
    {children}
  </button>
);

export default function AlbumGrid({ albums }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredAndSortedAlbums = useMemo(() => {
    return albums
      .filter(album =>
        album.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        album.artist.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'artist') {
          return a.artist.localeCompare(b.artist);
        }
        if (sortBy === 'year') {
          return b.year - a.year; // Descending for year
        }
        return 0;
      });
  }, [albums, debouncedSearchTerm, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-xs">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search albums or artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/60 border border-slate-700 rounded-full py-2.5 pl-11 pr-4 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="flex items-center space-x-2 p-1 bg-slate-900/50 rounded-full">
          <SortButton onClick={() => setSortBy('title')} isActive={sortBy === 'title'}>
            <Music size={16} />
            <span>Title</span>
          </SortButton>
          <SortButton onClick={() => setSortBy('artist')} isActive={sortBy === 'artist'}>
            <User size={16} />
            <span>Artist</span>
          </SortButton>
          <SortButton onClick={() => setSortBy('year')} isActive={sortBy === 'year'}>
            <Calendar size={16} />
            <span>Year</span>
          </SortButton>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          key={sortBy + debouncedSearchTerm} // Re-trigger animation on sort/filter
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        >
          {filteredAndSortedAlbums.length > 0 ? (
            filteredAndSortedAlbums.map(album => (
              <AlbumCard key={album.id} album={album} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full text-center py-16 text-slate-400"
            >
              <p className="text-lg font-medium">No albums found.</p>
              <p className="text-sm">Try adjusting your search or filter.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
