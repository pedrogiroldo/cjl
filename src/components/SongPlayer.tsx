import {
  PauseCircle,
  PlayCircle,
  Repeat,
  SpeakerHigh,
  SpeakerLow,
  SpeakerX,
} from "@phosphor-icons/react";

function SongPlayer({
  currentTime,
  duration,
  isPlaying,
  isReplayEnabled,
  isMuted,
  volume,
  togglePlay,
  toggleReplay,
  toggleMute,
  handleSeek,
  handleVolumeChange,
}: {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isReplayEnabled: boolean;
  isMuted: boolean;
  volume: number;
  togglePlay: () => void;
  toggleReplay: () => void;
  toggleMute: () => void;
  handleSeek: (newTime: number) => void;
  handleVolumeChange: (newVolume: number) => void;
}) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <SpeakerX size={32} />;
    if (volume < 0.5) return <SpeakerLow size={32} />;
    return <SpeakerHigh size={32} />;
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Progress Bar */}
      <div className="w-full flex flex-col gap-1">
        <input
          type="range"
          step={1}
          min={0}
          max={duration}
          value={currentTime}
          onChange={(event) => handleSeek(Number(event.target.value))}
          className="w-full h-1 bg-gray-300 accent-primary rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--color-primary) ${(currentTime / duration) * 100}%, #D1D5DB ${(currentTime / duration) * 100}%)`,
          }}
        />
        <div className="flex justify-between">
          <span className="text-sm text-nowrap">{formatTime(currentTime)}</span>
          <span className="text-sm text-nowrap">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-6 items-center">
        {/* Replay */}
        <button
          onClick={toggleReplay}
          className={`text-2xl ${isReplayEnabled ? "text-primary" : "text-gray-500"}`}
          title={isReplayEnabled ? "Desativar replay" : "Ativar replay"}
        >
          <Repeat weight="bold" size={32} />
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="text-2xl"
          title={isPlaying ? "Pausar" : "Tocar"}
        >
          {isPlaying ? (
            <PauseCircle weight="bold" size={48} />
          ) : (
            <PlayCircle weight="bold" size={48} />
          )}
        </button>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-gray-500"
            title={isMuted ? "Desmutar" : "Mutar"}
          >
            {getVolumeIcon()}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-24 h-1 accent-primary appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default SongPlayer;
