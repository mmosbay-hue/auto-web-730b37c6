import React, { useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Mic2, ListMusic, Laptop2, Volume2, Volume1, VolumeX, Maximize2, Heart } from 'lucide-react';
import useAudioPlayer from '../hooks/useAudioPlayer';
import { formatTime } from '../utils/formatTime';
import Waveform from './Waveform';
import { motion } from 'framer-motion';

const PlayerButton = ({ children, className = '', ...props }) => (
  <button className={`text-slate-400 hover:text-white transition-colors disabled:text-slate-600 disabled:cursor-not-allowed ${className}`} {...props}>
    {children}
  </button>
);

const ProgressBar = ({ value, max, onSeek }) => {
  const progressRef = useRef(null);
  const percentage = max > 0 ? (value / max) * 100 : 0;

  const handleSeek = (e) => {
    if (progressRef.current && max > 0) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newPercentage = Math.max(0, Math.min(1, clickX / width));
      onSeek(newPercentage * max);
    }
  };

  return (
    <div ref={progressRef} onClick={handleSeek} className="w-full h-1.5 bg-slate-700/50 rounded-full group cursor-pointer">
      <div className="h-full bg-indigo-500 rounded-full relative group-hover:bg-indigo-400 transition-colors" style={{ width: `${percentage}%` }}>
        <div className="w-3.5 h-3.5 bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"></div>
      </div>
    </div>
  );
};

const VolumeControl = ({ volume, isMuted, onVolumeChange, onMuteToggle }) => {
  const volumeBarRef = useRef(null);
  const displayVolume = isMuted ? 0 : volume;

  const handleVolume = (e) => {
    if (volumeBarRef.current) {
      const rect = volumeBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newVolume = Math.max(0, Math.min(1, clickX / width));
      onVolumeChange(newVolume);
    }
  };

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <div className="flex items-center space-x-2 w-28">
      <PlayerButton onClick={onMuteToggle}><VolumeIcon /></PlayerButton>
      <div ref={volumeBarRef} onClick={handleVolume} className="w-full h-1 bg-slate-600 rounded-full group cursor-pointer">
        <div className="h-full bg-white rounded-full relative group-hover:bg-indigo-400 transition-colors" style={{ width: `${displayVolume * 100}%` }}>
           <div className="w-3 h-3 bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default function Player({ currentSong, isPlaying, setIsPlaying, onNext, onPrev }) {
  const { 
    duration, currentTime, volume, isMuted, 
    togglePlayPause, seek, changeVolume, toggleMute 
  } = useAudioPlayer(currentSong.url, isPlaying, setIsPlaying, onNext);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border-t border-white/5 px-4 py-3 md:px-6 text-sm">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-3 items-center">
        <div className="flex items-center space-x-4 min-w-0">
          <img src={currentSong.cover} alt={currentSong.title} className="w-14 h-14 rounded-md shadow-md" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{currentSong.title}</h3>
            <p className="text-slate-400 text-xs truncate">{currentSong.artist}</p>
          </div>
          <PlayerButton><Heart size={18} /></PlayerButton>
          {isPlaying && <Waveform />}
        </div>

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-6">
            <PlayerButton><Shuffle size={18} /></PlayerButton>
            <PlayerButton onClick={onPrev}><SkipBack size={20} className="fill-current" /></PlayerButton>
            <motion.button 
              onClick={togglePlayPause} disabled={!duration}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-900 transition-transform shadow-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-0.5" />}
            </motion.button>
            <PlayerButton onClick={onNext}><SkipForward size={20} className="fill-current" /></PlayerButton>
            <PlayerButton><Repeat size={18} /></PlayerButton>
          </div>
          <div className="flex items-center space-x-3 w-full max-w-xl">
            <span className="text-xs text-slate-400 font-mono w-10 text-right">{formatTime(currentTime)}</span>
            <ProgressBar value={currentTime} max={duration} onSeek={seek} />
            <span className="text-xs text-slate-400 font-mono w-10 text-left">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <PlayerButton><Mic2 size={18} /></PlayerButton>
          <PlayerButton><ListMusic size={18} /></PlayerButton>
          <PlayerButton><Laptop2 size={18} /></PlayerButton>
          <VolumeControl volume={volume} isMuted={isMuted} onVolumeChange={changeVolume} onMuteToggle={toggleMute} />
          <PlayerButton><Maximize2 size={18} /></PlayerButton>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <img src={currentSong.cover} alt={currentSong.title} className="w-12 h-12 rounded-md shadow-md" />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-white truncate">{currentSong.title}</h3>
              <p className="text-slate-400 text-xs truncate">{currentSong.artist}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <PlayerButton><Heart size={20} /></PlayerButton>
            <PlayerButton onClick={onPrev}><SkipBack size={20} className="fill-current" /></PlayerButton>
            <motion.button 
              onClick={togglePlayPause} disabled={!duration}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-900 transition-transform shadow-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause size={22} className="fill-current" /> : <Play size={22} className="fill-current ml-0.5" />}
            </motion.button>
            <PlayerButton onClick={onNext}><SkipForward size={20} className="fill-current" /></PlayerButton>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-xs text-slate-400 font-mono">{formatTime(currentTime)}</span>
          <ProgressBar value={currentTime} max={duration} onSeek={seek} />
          <span className="text-xs text-slate-400 font-mono">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
