import Layout from "@/components/Layout";
import SongPlayer from "@/components/SongPlayer";
import TextReader from "@/components/TextReader";
import { useYouTubeAudioPlayer } from "@/hooks/useYoutubeAudio";
import { CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const songs = [
  {
    id: 1,
    title: "Somos irmãos",
    author: "Coral Universitário do Unasp-EC",
    videoId: "ozGdGg9LpaM",
    imageUrl:
      "https://i.ytimg.com/vi/63GdOkub2aA/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAA5AUcnr96fqTnD-VfodsSu1M8Tg",
    lyrics: {
      lines: [
        { text: "Imagine se as flores, a relva e o céu", time: 6 },
        { text: "Fossem de uma só cor", time: 10 },
        { text: "Imagine se a maçã e o pêssego", time: 13 },
        { text: "Tivessem o mesmo sabor", time: 16 },
        { text: "Se o cântico das aves", time: 19 },
        { text: "Tão belo e singular", time: 22 },
        { text: "Nunca teve um padrão", time: 26 },
        { text: "Como espera, então", time: 27 },
        { text: "Você que homens", time: 28 },
        { text: "Livres como são", time: 29 },
        { text: "Tenham a mesma opinião?", time: 30 },
        { text: "Somos filhos de um mesmo Deus", time: 39 },
        { text: "Mas somos diferentes, ele assim nos fez", time: 43 },
        { text: "Em Cristo todos somos um, somos um", time: 52 },
        { text: "Não importa raça, origem, língua, estilo ou cor", time: 58 },
        { text: "Em Cristo todos somos um, somos um", time: 64 },
        { text: "Pois ele é meu (meu) Pai (pai)", time: 66 },
        { text: "Teu (teu) Pai e nele somos irmãos", time: 71 },
        { text: "Oh-oh-oh-oh, oh-oh", time: 74 },
        { text: "Nele somos irmãos", time: 78 },
        { text: "Oh-oh-oh-oh, oh-oh", time: 81 },
        { text: "Nele somos um", time: 83 },
        { text: "Imagine quanta coisa iremos realizar", time: 86 },
        { text: "Quando dermos as mãos", time: 89 },
        { text: "Somos fortes quando estamos unidos em Jesus", time: 92 },
        { text: "Em um só coração", time: 95 },
        { text: "Pois, se existe uma só fé", time: 97 },
        { text: "Um só céu, uma só luz, uma só salvação", time: 102 },
        { text: "Somos todos um só corpo em Cristo", time: 104 },
        { text: "Nosso Pai, numa mesma missão", time: 109 },
        { text: "Somos filhos de um mesmo Deus", time: 115 },
        { text: "Mas somos diferentes, ele assim nos fez", time: 121 },
        { text: "Em Cristo todos somos um, somos um", time: 128 },
        { text: "Não importa raça, origem, língua, estilo ou cor", time: 134 },
        { text: "Em Cristo todos somos um, somos um", time: 138 },
        { text: "Pois ele é meu (meu) Pai (pai)", time: 140 },
        { text: "Teu (teu) Pai e nele somos irmãos", time: 146 },
        { text: "Oh-oh-oh-oh, oh-oh", time: 151 },
        { text: "Nele somos irmãos", time: 157 },
        { text: "Oh-oh-oh-oh, oh-oh", time: 162 },
        { text: "Nele somos um", time: 165 },
        { text: "Quando o puro amor de Jesus estiver em nós", time: 171 },
        { text: "O mundo então saberá", time: 177 },
        { text: "Que nós somos seus filhos", time: 183 },
        { text: "E quem é o nosso Deus", time: 187 },
        { text: "E se ele é por nós, quem será contra nós", time: 190 },
        { text: "Quem irá nos derrotar?", time: 198 },
        { text: "Em Cristo somos um, ele assim nos faz", time: 205 },
        { text: "Em Cristo todos somos um, somos um", time: 211 },
        { text: "Não importa raça, origem, língua, estilo ou cor", time: 216 },
        { text: "Em Cristo todos somos um, somos um", time: 219 },
        { text: "Pois ele é meu (meu) Pai (pai)", time: 224 },
        { text: "Teu (teu) Pai e nele somos irmãos", time: 229 },
        { text: "Oh-oh-oh-oh, oh-oh", time: 235 },
        { text: "Nele somos irmãos", time: 240 },
        { text: "Oh-oh-oh-oh, oh-oh", time: 245 },
        { text: "Nele somos um", time: 245 },
        { text: "Oh-oh-oh-oh, oh-oh", time: 246 },
        { text: "Nele somos irmãos", time: 247 },
        { text: "Oh-oh-oh-oh, oh-oh", time: 248 },
        { text: "Nele somos um", time: 249 },
        { text: "Oh-oh-oh-oh, oh-oh", time: 250 },
        { text: "Nele somos irmãos", time: 251 },
      ],
    },
  },
];

export default function Song() {
  const params = useParams();

  const [song, setSong] = useState<(typeof songs)[0]>();

  const { currentTime, duration, isPlaying, togglePlay, handleSeek } =
    useYouTubeAudioPlayer(song?.videoId ?? "");

  const voice = params?.voz ?? "";
  const songId = Number(params?.musica ?? "");

  const formattedVoice =
    voice?.at(0)?.toUpperCase() + voice?.toString().substring(1);

  useEffect(() => {
    const song = songs.find((s) => s.id === songId);
    setSong(song);
  }, [songId]);

  return (
    <Layout submenu title={song?.title + " | CJL"}>
      <div id="youtube-player" className="hidden" />
      <div className="h-full w-full flex flex-col content-center gap-4">
        <div className="h-full w-full p-5 flex flex-col gap-3 rounded-3xl bg-gray-800">
          <div className="w-full grid place-items-center">
            <div className="w-full flex items-center justify-between">
              <Link href={`/kits/${voice}`}>
                <CaretLeft size={32} weight="bold" />
              </Link>
              <h2 className="w-full text-center text-3xl font-bold text-gray-50">
                {song?.title}
              </h2>
              <div className="w-[32px]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100">
              {formattedVoice}
            </h3>
          </div>
          <div className="h-[60vh] w-full flex flex-col gap-3">
            {song && (
              <TextReader lyrics={song.lyrics} currentTime={currentTime} />
            )}
          </div>
        </div>

        <div className="h-full w-full p-5 rounded-3xl bg-gray-800">
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
