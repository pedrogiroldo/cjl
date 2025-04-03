import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT?: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function useYouTubeAudioPlayer(videoId: string) {
  const playerRef = useRef<YT.Player | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSeek = (newTime: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, true);
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
        return;
      }

      if (
        !document.querySelector(
          'script[src="https://www.youtube.com/iframe_api"]',
        )
      ) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);
      }

      window.onYouTubeIframeAPIReady = createPlayer;
    };

    const createPlayer = () => {
      if (!window.YT) return;

      // Destroi o player anterior antes de criar um novo
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      playerRef.current = new window.YT.Player("youtube-player", {
        videoId,
        playerVars: { autoplay: 0, controls: 0, modestbranding: 1 },
        events: {
          onReady: (event) => {
            playerRef.current = event.target;
            setDuration(event.target.getDuration());
            event.target.setVolume(volume);
          },
          onStateChange: (event) => {
            const state = event.data;
            const isNowPlaying = state === window.YT?.PlayerState.PLAYING;
            setIsPlaying(isNowPlaying);

            // Atualiza currentTime enquanto o vídeo estiver tocando
            if (isNowPlaying) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                setCurrentTime(playerRef.current?.getCurrentTime() || 0);
              }, 1000);
            } else {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
            }
          },
        },
      });
    };

    loadYouTubeAPI();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [videoId]);

  return {
    player: playerRef.current,
    isPlaying,
    duration,
    currentTime,
    volume,
    isMuted,
    togglePlay,
    handleSeek,
    handleVolumeChange,
    toggleMute,
  };
}
