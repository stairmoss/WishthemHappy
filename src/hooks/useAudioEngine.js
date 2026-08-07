import { useState, useEffect, useRef } from 'react';

export function useAudioEngine(initialTrackUrl, initialVolume = 0.5) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (initialTrackUrl) {
      audioRef.current = new Audio(initialTrackUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = initialVolume;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [initialTrackUrl]);

  const unlockAudio = () => {
    setHasInteracted(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Audio autoplay blocked:', err));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return {
    isPlaying,
    isMuted,
    hasInteracted,
    unlockAudio,
    togglePlay,
    toggleMute
  };
}
