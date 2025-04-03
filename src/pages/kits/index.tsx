import Layout from "@/components/Layout";
import Link from "next/link";

const voices = [
  {
    id: 1,
    title: "Contralto",
    image: "/images/contralto.png",
    url: "contralto",
  },
  { id: 2, title: "Soprano", image: "/images/soprano.png", url: "soprano" },
  { id: 3, title: "Tenor", image: "/images/tenor.png", url: "tenor" },
  { id: 4, title: "Baixo", image: "/images/baixo.png", url: "baixo" },
  { id: 5, title: "Todos", image: "/images/todos.png", url: "todos" },
];

export default function Kits() {
  return (
    <Layout>
      <div className="h-full w-full content-center">
        <div className="w-full p-[20px] grid place-items-center gap-[16px] rounded-3xl bg-gray-800">
          <h2 className="text-3xl font-bold text-gray-50">Kits de Voz</h2>
          <div className="flex flex-wrap gap-2">
            {voices.map((voice, index) => (
              <Link
                key={voice.id}
                href={`/kits/${voice.url}`}
                className={`bg-no-repeat bg-cover bg-center h-[120px] rounded-2xl overflow-hidden flex justify-center flex-grow`}
                style={{
                  backgroundImage: `url(${voice.image})`,
                  minWidth:
                    voices.length === 1 || index + 1 === voices.length
                      ? "100%"
                      : "calc(50% - 0.5rem)",
                }}
              >
                <div className="bg-black/60 h-full w-full p-6 flex justify-center items-center">
                  <p className="font-bold text-xl text-gray-50">
                    {voice.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
