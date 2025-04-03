import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Event } from "@/types";

export default function Agenda() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/agenda");
        if (!response.ok) {
          throw new Error("Erro ao carregar a agenda");
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <Layout>
      <div className="w-full p-5 flex flex-col items-center gap-4 rounded-3xl bg-gray-800 max-h-full">
        <h2 className="text-3xl font-bold text-gray-50">Agenda</h2>

        {loading && <p className="text-gray-50">Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="flex flex-col gap-4 w-full overflow-auto">
            {events.map((program) => {
              const eventDate = new Date(program.date);
              return (
                <div
                  key={program.id}
                  className="flex rounded-xl w-full bg-gray-700"
                >
                  <div className="flex flex-col p-2 text-4xl">
                    <p>{eventDate.getDate().toString().padStart(2, "0")}</p>
                    <hr className="border-t-2" />
                    <p>
                      {(eventDate.getMonth() + 1).toString().padStart(2, "0")}
                    </p>
                  </div>
                  <div className="flex flex-col p-2">
                    <h3 className="font-bold text-xl">{program.title}</h3>
                    <p className="text-xs text-gray-50">{program.location}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
