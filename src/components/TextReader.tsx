import { Lyrics } from "@/types";
import { useEffect, useRef } from "react";

function TextReader({ lyrics, currentTime }: { lyrics: Lyrics; currentTime: number }) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const activeLineRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (activeLineRef.current && containerRef.current) {
			containerRef.current.scrollTop = activeLineRef.current.offsetTop - containerRef.current.clientHeight / 2;
		}
	}, [currentTime, lyrics]);

	return (
		<div ref={containerRef} className="p-5 overflow-y-auto text-center">
			<div className="flex flex-col gap-2">
				{lyrics.lines.map((line, index) => {
					const isActive = currentTime >= line.time && currentTime < (lyrics.lines[index + 1]?.time || Infinity);

					return (
						<p
							ref={isActive ? activeLineRef : null}
							key={index}
							className={`transition-all duration-400 text-xl ${
								isActive ? "font-bold text-primary" : "text-gray-50"
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
