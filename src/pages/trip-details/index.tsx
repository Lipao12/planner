import { Calendar, MapPin, Plus, Settings2 } from "lucide-react";
import { useState } from "react";
import { Divider } from "../../ui/componets/Divider";
import { Activities } from "./activities";
import { CreateActivityModal } from "./create-activity-modal";
import { Guests } from "./guests";
import { ImportantLinks } from "./important-links";
import { DestinationDateHeader } from "./dest-and-date-header";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setCreateActivityModalOpen] =
    useState(false);
  const [activities, setActivities] = useState([]);

  const openActivityModal = () => {
    setCreateActivityModalOpen(true);
  };

  const closeActivityModal = () => {
    setCreateActivityModalOpen(false);
  };

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={openActivityModal}
              type="button"
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
              Cadastrar atividade <Plus className="size-5" />
            </button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />

          <div className="w-full h-px bg-zinc-800" />

          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal closeActivityModal={closeActivityModal} />
      )}
    </div>
  );
}
