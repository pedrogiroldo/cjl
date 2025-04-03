import { PauseCircle, PlayCircle } from "@phosphor-icons/react";

function SongPlayer({
  currentTime,
  duration,
  isPlaying,
  togglePlay,
  handleSeek,
}: {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  togglePlay: () => void;
  handleSeek: (newTime: number) => void;
}) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  return (
    <div className="flex flex-col items-center">
      {/* Barra de progresso */}
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
            background: `linear-gradient(to right, var(--color-primary) ${(currentTime / duration) * 100}%, #D1D5DB ${
              (currentTime / duration) * 100
            }%)`,
          }}
        />

        <div className="flex justify-between">
          <span className="text-sm text-nowrap">{formatTime(currentTime)}</span>
          <span className="text-sm text-nowrap">{formatTime(duration)}</span>
        </div>
      </div>

      <button onClick={togglePlay} className="text-2xl">
        {isPlaying ? (
          <PauseCircle weight="bold" size={48} />
        ) : (
          <PlayCircle weight="bold" size={48} />
        )}
      </button>
    </div>
  );
}

export default SongPlayer;
