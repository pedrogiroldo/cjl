import Layout from "@/components/Layout";
import SongPlayer from "@/components/SongPlayer";
import TextReader from "@/components/TextReader";
import { useLocalAudioPlayer } from "@/hooks/useLocalAudioPlayer";
import { CaretLeft, Eye, EyeSlash } from "@phosphor-icons/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const songs = [
  {
    id: 1,
    title: "Nosso Deus",
    author: "Chris Tomlin",
    musicPath: "/songs/nosso-deus",
    imageUrl: "/images/logo-fundo.webp",
    lyrics: {
      lines: [
        { text: "Água em vinho tornou", time: 23 },
        { text: "Os olhos dos cegos abriu", time: 27 },
        { text: "Não há outro", time: 30 },
        { text: "Igual a Deus", time: 35 },
        { text: "Dentro da noite brilhou", time: 40 },
        { text: "Das cinzas nos fez ressurgir", time: 45 },
        { text: "Não há outro", time: 48 },
        { text: "Igual a Deus", time: 53 },
        { text: "Deus tu és grande, és invencível", time: 59 },
        { text: "Estás acima de qualquer outro", time: 63 },
        { text: "És Deus que cura, grande em poder", time: 67 },
        { text: "Nosso Deus, nosso Deus.", time: 73 },
        { text: "Dentro da noite brilhou", time: 86 },
        { text: "Das cinzas nos fez ressurgir", time: 90 },
        { text: "Não há outro", time: 94 },
        { text: "Igual a Deus", time: 98 },

        { text: "Deus tu és grande, és invencível", time: 105 },
        { text: "Estás acima de qualquer outro", time: 108 },
        { text: "És Deus que cura, grande em poder", time: 113 },
        { text: "Nosso Deus, nosso Deus.", time: 117 },
        { text: "Deus tu és grande, és invencível", time: 122 },
        { text: "Estás acima de qualquer outro", time: 128 },
        { text: "És Deus que cura, grande em poder", time: 132 },
        { text: "Nosso Deus, nosso Deus.", time: 135 },

        { text: "Se Deus está conosco", time: 159 },
        { text: "Quem pode nos deter?", time: 161 },
        { text: "Se Deus está conosco", time: 164 },
        { text: "Não há o que temer", time: 166 },
        { text: "Se Deus está conosco", time: 169 },
        { text: "Quem pode nos deter?", time: 172 },
        { text: "Se Deus está conosco", time: 174 },
        { text: "Não há o que temer", time: 176 },
        { text: "Não há o que temer", time: 184 },

        { text: "Deus tu és grande, és invencível", time: 196 },
        { text: "Estás acima de qualquer outro", time: 199 },
        { text: "És Deus que cura, grande em poder", time: 204 },
        { text: "Nosso Deus, nosso Deus.", time: 209 },
        { text: "Deus tu és grande, és invencível", time: 214 },
        { text: "Estás acima de qualquer outro", time: 220 },
        { text: "És Deus que cura, grande em poder", time: 224 },
        { text: "Nosso Deus, nosso Deus.", time: 227 },

        { text: "Se Deus está conosco", time: 232 },
        { text: "Quem pode nos deter?", time: 234 },
        { text: "Se Deus está conosco", time: 237 },
        { text: "Não há o que temer", time: 239 },
        { text: "Se Deus está conosco", time: 242 },
        { text: "Quem pode nos deter?", time: 244 },
        { text: "Se Deus está conosco", time: 246 },
        { text: "Não há o que temer", time: 248 },
        { text: "Não há o que temer", time: 258 },
      ],
    },
  },
];

export default function Song() {
  const params = useParams();

  const [song, setSong] = useState<(typeof songs)[0]>();
  const [enableReading, setEnableReading] = useState(true);

  const voice = params?.voz ?? "";
  const songId = Number(params?.musica ?? "");

  const {
    currentTime,
    duration,
    isPlaying,
    updateCurrentTime,
    togglePlay,
    handleSeek,
  } = useLocalAudioPlayer(song?.musicPath + "/" + voice + ".mp3");

  const formattedVoice =
    voice?.at(0)?.toUpperCase() + voice?.toString().substring(1);

  useEffect(() => {
    const song = songs.find((s) => s.id === songId);
    setSong(song);
  }, [songId]);

  return (
    <Layout submenu title={song?.title + " | CJL"}>
      <div className="h-full w-full flex flex-col content-center gap-4">
        <div className="h-full w-full p-5 flex flex-col gap-3 rounded-3xl bg-gray-800 overflow-hidden">
          <div className="w-full grid place-items-center">
            <div className="w-full flex items-center justify-between">
              <Link href={`/kits/${voice}`}>
                <CaretLeft size={32} weight="bold" />
              </Link>
              <h2 className="w-full text-center text-3xl font-bold text-gray-50">
                {song?.title}
              </h2>
              <div className="w-8">
                <button onClick={() => setEnableReading((prev) => !prev)}>
                  {enableReading ? <Eye size={28} /> : <EyeSlash size={28} />}
                </button>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-100">
              {formattedVoice}
            </h3>
          </div>
          <div className="h-full w-full flex flex-col gap-3 pb-24">
            {song && (
              <TextReader
                lyrics={song.lyrics}
                currentTime={currentTime}
                enableReading={enableReading}
                updateCurrentTime={updateCurrentTime}
              />
            )}
          </div>
        </div>

        <div className="w-full p-5 rounded-3xl bg-gray-800">
          <SongPlayer
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            handleSeek={handleSeek}
          />
        </div>
      </div>
    </Layout>
  );
}
