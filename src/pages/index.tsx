import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
	return (
		<Layout>
			<div className="h-full content-center">
				<h1 className="text-5xl font-bold text-gray-50">Coral Jovem de Londrina</h1>
				<p className="text-2xl text-gray-300 mt-1">
					Com fé e propósito, damos voz à nossa missão. A mensagem do advento a todo mundo em nossa geração.
				</p>

				<div className="flex flex-col md:flex-row mt-[40px] gap-[10px]">
					<Link href="/kits">
						<button className="bg-primary hover:bg-primary text-white py-2 px-8 w-full md:w-max rounded-full">
							Kits de Voz
						</button>
					</Link>
					<Link href="/contato">
						<button className="bg-secondary hover:bg-secondary text-white py-2 px-8 w-full md:w-max rounded-full">
							Contato
						</button>
					</Link>
				</div>
			</div>
		</Layout>
	);
}
