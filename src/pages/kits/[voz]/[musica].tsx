import Layout from "@/components/Layout";
import SongPlayer from "@/components/SongPlayer";
import TextReader from "@/components/TextReader";
import { useLocalAudioPlayer } from "@/hooks/useLocalAudioPlayer";
import { CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Song } from "@/types";
import TextSettingsDropdown from "@/components/TextSettingsDropdown";
import { useLocalStorage } from "usehooks-ts";

export default function Musica() {
  const params = useParams();

  const [song, setSong] = useState<Song>();
  const [enableReading, setEnableReading] = useLocalStorage(
    "enable-reading",
    true,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [textAlign, setTextAlign] = useLocalStorage<"left" | "center">(
    "text-align",
    "center",
  );

  const voice = params?.voz ?? "";
  const songId = Number(params?.musica ?? "");

  const songPath = `${song?.musicPath}/${voice}.mp3`;

  const {
    volume,
    currentTime,
    duration,
    isPlaying,
    isReplayEnabled,
    updateCurrentTime,
    togglePlay,
    toggleReplay,
    handleSeek,
    handleVolumeChange,
  } = useLocalAudioPlayer(songPath);

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

  const handleDownloadMp3 = () => {
    if (!song) return;
    const downloadLink = document.createElement("a");
    downloadLink.href = songPath;
    downloadLink.download = `${song.title} - ${formattedVoice}.mp3`;
    downloadLink.click();
  };

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
                <TextSettingsDropdown
                  enableReading={enableReading}
                  textAlign={textAlign}
                  onToggleReading={() => setEnableReading((prev) => !prev)}
                  onChangeTextAlign={(align) => setTextAlign(align)}
                  onDownloadMp3={handleDownloadMp3}
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-100">
              {formattedVoice}
            </h3>
          </div>

          {(loading || error) && (
            <div className="text-center">
              {loading && <p className="text-gray-50">Carregando...</p>}
              {error && <p className="text-red-500">{error}</p>}
            </div>
          )}

          {song && (
            <TextReader
              lyrics={song.lyrics}
              currentTime={currentTime}
              enableReading={enableReading}
              updateCurrentTime={updateCurrentTime}
              textAlign={textAlign}
            />
          )}
        </div>

        <div className="w-full p-5 rounded-3xl bg-gray-800">
          <SongPlayer
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            isReplayEnabled={isReplayEnabled}
            toggleReplay={toggleReplay}
            handleSeek={handleSeek}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
          />
        </div>
      </div>
    </Layout>
  );
}
