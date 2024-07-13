import { Plus } from "lucide-react";
import { useState } from "react";
import { Activities } from "./activities";
import { DestinationDateHeader } from "./dest-and-date-header";
import { Guests } from "./guests";
import { ImportantLinks } from "./important-links";
import { CreateActivityModal } from "./modals/create-activity-modal";
import { CreateLinkModal } from "./modals/create-link-modal";
import { ManageGuestsModal } from "./modals/manage-guests-modal";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setCreateActivityModalOpen] =
    useState(false);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);
  const [isChangeDateAble, setIsChangeDateAble] = useState(false);

  const openActivityModal = () => {
    setCreateActivityModalOpen(true);
  };

  const closeActivityModal = () => {
    setCreateActivityModalOpen(false);
  };

  const openLinkModal = () => {
    setIsCreateLinkModalOpen(true);
  };

  const closeLinkModal = () => {
    setIsCreateLinkModalOpen(false);
  };

  const openManageGuestsModal = () => {
    setIsManageGuestsModalOpen(true);
  };

  const closeManageGuestsModal = () => {
    setIsManageGuestsModalOpen(false);
  };

  const ableChangeDate = () => {
    setIsChangeDateAble(true);
  };

  const disableChangeDate = () => {
    setIsChangeDateAble(false);
  };

  console.log("Create Link: ", isCreateLinkModalOpen);

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationDateHeader
        isChangeDateAble={isChangeDateAble}
        ableChangeDate={ableChangeDate}
        disableChangeDate={disableChangeDate}
      />

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
          <ImportantLinks openLinkModal={openLinkModal} />

          <div className="w-full h-px bg-zinc-800" />

          <Guests openManageGuestsModal={openManageGuestsModal} />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal closeActivityModal={closeActivityModal} />
      )}

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeLinkModal={closeLinkModal} />
      )}

      {isManageGuestsModalOpen && (
        <ManageGuestsModal closeManageGuestsModal={closeManageGuestsModal} />
      )}
    </div>
  );
}
