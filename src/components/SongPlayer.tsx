import { useState, useRef } from "react";
import {
  PauseCircle,
  PlayCircle,
  Repeat,
  SpeakerHigh,
  SpeakerLow,
  SpeakerX,
} from "@phosphor-icons/react";

type SongPlayerProps = {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isReplayEnabled: boolean;
  volume: number;
  togglePlay: () => void;
  toggleReplay: () => void;
  handleSeek: (newTime: number) => void;
  handleVolumeChange: (newVolume: number) => void;
};

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const VolumeIcon = ({ volume }: { volume: number }) => {
  if (volume === 0) return <SpeakerX size={32} />;
  if (volume < 0.5) return <SpeakerLow size={32} />;
  return <SpeakerHigh size={32} />;
};

function SongPlayer({
  currentTime,
  duration,
  isPlaying,
  isReplayEnabled,
  volume,
  togglePlay,
  toggleReplay,
  handleSeek,
  handleVolumeChange,
}: SongPlayerProps) {
  const [volumeVisible, setVolumeVisible] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Progress Bar */}
      <div className="w-full flex flex-col gap-1">
        <input
          type="range"
          min={0}
          max={duration}
          step={1}
          value={currentTime}
          onChange={(e) => handleSeek(Number(e.target.value))}
          className="w-full h-1 bg-gray-300 accent-primary rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--color-primary) ${
              (currentTime / duration) * 100
            }%, #D1D5DB ${(currentTime / duration) * 100}%)`,
          }}
          aria-label="Seek audio"
        />
        <div className="flex justify-between text-sm">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        {/* Replay Button */}
        <button
          onClick={toggleReplay}
          className={`text-2xl ${
            isReplayEnabled ? "text-primary" : "text-gray-500"
          }`}
          aria-label={isReplayEnabled ? "Disable replay" : "Enable replay"}
        >
          <Repeat weight="bold" size={32} />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="text-2xl"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <PauseCircle weight="bold" size={48} />
          ) : (
            <PlayCircle weight="bold" size={48} />
          )}
        </button>

        {/* Volume Control */}
        <div className="relative flex items-center">
          <button
            onClick={() => setVolumeVisible((prev) => !prev)}
            className="text-gray-500"
            aria-label="Toggle volume control"
          >
            <VolumeIcon volume={volume} />
          </button>

          {volumeVisible && (
            <div
              ref={volumeRef}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900/90 shadow-lg p-2 rounded-lg z-10 h-40 w-10 flex items-center justify-center"
              tabIndex={0}
              onBlur={(e) => {
                if (!volumeRef.current?.contains(e.relatedTarget as Node)) {
                  setVolumeVisible(false);
                }
              }}
            >
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-36 h-1 appearance-none accent-primary transform -rotate-90"
                aria-label="Adjust volume"
                style={{
                  background: `linear-gradient(to right, var(--color-primary) ${
                    volume * 100
                  }%, #D1D5DB ${volume * 100}%)`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SongPlayer;
