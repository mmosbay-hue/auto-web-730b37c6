import { useState, useEffect, useRef, useCallback } from 'react';

export default function useAudioPlayer(audioSrc, isPlaying, setIsPlaying, onEnded) {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
    } else {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = audioSrc;
      if (wasPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio on src change:", e));
      }
    }
    
    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioSrc, onEnded, setIsPlaying, isMuted, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = useCallback(() => {
    if (duration > 0) {
        setIsPlaying(prev => !prev);
    }
  }, [duration, setIsPlaying]);

  const seek = useCallback((time) => {
    if (audioRef.current && isFinite(time)) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const changeVolume = useCallback((value) => {
    const newVolume = Math.max(0, Math.min(1, value));
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return {
    duration,
    currentTime,
    volume,
    isMuted,
    togglePlayPause,
    seek,
    changeVolume,
    toggleMute,
  };
}
