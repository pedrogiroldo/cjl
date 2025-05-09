import Layout from "@/components/Layout";
import SongPlayer from "@/components/SongPlayer";
import TextReader from "@/components/TextReader";
import { useLocalAudioPlayer } from "@/hooks/useLocalAudioPlayer";
import { CaretLeft, Eye, EyeSlash } from "@phosphor-icons/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Song } from "@/types";

export default function Musica() {
  const params = useParams();

  const [song, setSong] = useState<Song>();
  const [enableReading, setEnableReading] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    const fetchMusica = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/musicas/${songId}`);
        if (!response.ok) {
          throw new Error("Música não encontrada");
        }
        const data: Song = await response.json();
        setSong(data);

        setError(null);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (songId) {
      fetchMusica();
    }
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
            <div className="text-center">
              {loading && <p className="text-gray-50">Carregando...</p>}
              {error && <p className="text-red-500">{error}</p>}
            </div>
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
