import { PauseCircle, PlayCircle, Repeat } from "@phosphor-icons/react";

function SongPlayer({
  currentTime,
  duration,
  isPlaying,
  isReplayEnabled,
  togglePlay,
  toggleReplay,
  handleSeek,
}: {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isReplayEnabled: boolean;
  togglePlay: () => void;
  toggleReplay: () => void;
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
    <div className="w-full flex flex-col items-center">
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

      <div className="flex justify-center gap-6 items-center">
        {/* Replay Button */}
        <button
          onClick={toggleReplay}
          className={`text-2xl ${isReplayEnabled ? "text-primary" : "text-gray-500"}`}
          title={isReplayEnabled ? "Desativar replay" : "Ativar replay"}
        >
          <Repeat weight="bold" size={32} />
        </button>

        {/* Play/Pause Button */}
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
      </div>
    </div>
  );
}

export default SongPlayer;
