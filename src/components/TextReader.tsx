import { Lyrics } from "@/types";
import { useEffect, useRef } from "react";

function TextReader({
  lyrics,
  currentTime,
  enableReading = true,
  updateCurrentTime,
}: {
  lyrics: Lyrics;
  currentTime: number;
  enableReading?: boolean;
  updateCurrentTime: (newTime: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  const handleUpdateCurrentTime = (newTime: number) => {
    updateCurrentTime(newTime);
  };

  useEffect(() => {
    if (enableReading) {
      if (activeLineRef.current && containerRef.current) {
        containerRef.current.scrollTop =
          activeLineRef.current.offsetTop -
          containerRef.current.clientHeight / 2;
      }
    }
  }, [currentTime, lyrics, enableReading]);

  return (
    <div ref={containerRef} className="p-5 overflow-y-auto text-center">
      <div className="flex flex-col gap-2">
        {lyrics.lines.map((line, index) => {
          const isActive =
            enableReading &&
            currentTime >= line.time &&
            currentTime < (lyrics.lines[index + 1]?.time || Infinity);

          return (
            <p
              ref={isActive ? activeLineRef : null}
              key={index}
              className={`transition-all duration-400 text-xl ${
                isActive ? "font-bold text-primary" : "text-gray-50"
              }`}
              onClick={() => handleUpdateCurrentTime(line.time)}
            >
              {line.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default TextReader;
