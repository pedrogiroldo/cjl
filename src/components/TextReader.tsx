import { Lyrics } from "@/types";
import { useEffect, useRef } from "react";

type TextReaderProps = {
  lyrics: Lyrics;
  currentTime: number;
  enableReading?: boolean;
  updateCurrentTime: (newTime: number) => void;
  textAlign: "center" | "left";
  fontSize: number;
};

function TextReader({
  lyrics,
  currentTime,
  enableReading = true,
  updateCurrentTime,
  textAlign,
  fontSize,
}: TextReaderProps) {
  const activeLineRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (enableReading && activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentTime, enableReading]);

  return (
    <div
      className={`px-5 overflow-y-auto ${textAlign === "center" ? "text-center" : "text-left"}`}
    >
      <div className="flex flex-col gap-2">
        {lyrics.lines.map((line, index) => {
          const nextLineTime = lyrics.lines[index + 1]?.time ?? Infinity;
          const isActive =
            currentTime >= line.time && currentTime < nextLineTime;
          const isPastLine = currentTime < line.time;

          return (
            <p
              key={index}
              ref={isActive ? activeLineRef : null}
              onClick={() => updateCurrentTime(line.time)}
              style={{ fontSize: `${fontSize}px` }}
              className={`transition-all duration-400 ${
                !enableReading
                  ? "text-gray-200"
                  : isActive
                    ? "font-bold text-primary"
                    : isPastLine
                      ? "text-gray-200"
                      : "text-gray-500"
              }`}
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
