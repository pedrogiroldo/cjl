import Layout from "@/components/Layout";

const schedule = [
	{
		id: 1,
		date: new Date(),
		title: "Primeiro Encontro",
		location: "IASD Central de Londrina - Rua Natal, 42 - Jardim Agari",
	},
	{
		id: 2,
		date: new Date(),
		title: "Primeiro Encontro",
		location: "IASD Central de Londrina - Rua Natal, 42 - Jardim Agari",
	},
	{
		id: 3,
		date: new Date(),
		title: "Primeiro Encontro",
		location: "IASD Central de Londrina - Rua Natal, 42 - Jardim Agari",
	},
	{
		id: 4,
		date: new Date(),
		title: "Primeiro Encontro",
		location: "IASD Central de Londrina - Rua Natal, 42 - Jardim Agari",
	},
];

export default function Agenda() {
	return (
		<Layout>
			<div className="w-full h-full p-[20px] flex flex-col items-center gap-[16px] rounded-3xl bg-gray-800">
				<h2 className="text-3xl font-bold text-gray-50">Agenda</h2>
				<div className="flex flex-col gap-4 w-full">
					{schedule.map(program => (
						<div key={program.id} className="flex rounded-xl w-full bg-gray-700">
							<div className="flex flex-col p-2 text-4xl">
								<p>{program.date.getDate().toString().padStart(2, "0")}</p>
								<hr className="border-t-2" />
								<p>{program.date.getMonth().toString().padStart(2, "0")}</p>
							</div>
							<div className="flex flex-col p-2">
								<h3 className="font-bold text-xl">{program.title}</h3>
								<p className="text-xs text-gray-50">{program.location}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
}
