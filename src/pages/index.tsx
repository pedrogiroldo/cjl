import { CalendarBlank, HouseSimple, MicrophoneStage } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const menuItens = [
	{ title: "Home", icon: HouseSimple, link: "/" },
	{ title: "Kits", icon: MicrophoneStage, link: "/kits" },
	{ title: "Agenda", icon: CalendarBlank, link: "/agenda" },
];

export default function Home() {
	const router = useRouter();

	return (
		<div className="h-screen bg-[url(/images/coral.png)] bg-no-repeat bg-cover bg-center">
			<div className="bg-black/60 h-full flex justify-center items-center">
				<div className="container h-full p-[20px] flex flex-col items-center gap-[20px]">
					<div className="w-full flex justify-center">
						<Image
							src={`/images/logo.png`}
							alt="Logo do Coral Jovem de Londrina"
							className="h-[44px] w-auto"
							width="107"
							height="44"
						/>
					</div>

					<div className="flex-1 content-center">
						<h1 className="text-5xl font-bold text-gray-50">Coral Jovem de Londrina</h1>
						<p className="text-2xl text-gray-300">Nossa frase de efeito aqui</p>

						<div className="flex flex-col md:flex-row mt-[40px] gap-[10px]">
							<button className="bg-primary hover:bg-primary text-white py-2 px-8 w-full md:w-max rounded-full">
								Kits de Voz
							</button>
							<button className="bg-secondary hover:bg-secondary text-white py-2 px-8 w-full md:w-max rounded-full">
								Contato
							</button>
						</div>
					</div>

					<div className="flex w-full bg-gray-900 rounded-3xl">
						{menuItens.map(item => {
							const IconComponent = item.icon;

							return (
								<Link
									key={item.link}
									href={item.link}
									className={`w-full flex flex-col items-center justify-items-center gap-[4px] px-[16px] py-[10px] ${
										router.pathname === item.link ? "active" : ""
									}`}
								>
									<IconComponent weight={router.pathname === item.link ? "fill" : "regular"} size={24} />
									<p className={router.pathname === item.link ? "font-bold" : ""}>{item.title}</p>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
