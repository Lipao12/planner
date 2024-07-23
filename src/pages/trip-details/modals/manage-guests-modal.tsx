import { AtSign, Plus, UserRoundPlus, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { CustomButton } from "../../../ui/componets/CustomButton";

interface ManageGuestsModalProps {
  closeManageGuestsModal: () => void;
}

export function ManageGuestsModal({
  closeManageGuestsModal,
}: ManageGuestsModalProps) {
  const { tripId } = useParams();
  const [error, setError] = useState("");

  const inviteGuests = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString() || "";
    const name = data.get("name")?.toString() || "";

    if (!email || !name) {
      setError("Nome ou e-mail não preenchidos.");
      return;
    }

    try {
      api.post(`/trips/${tripId}/invites`, {
        email,
        name,
      });
      console.log("Email Enviado");
      setError("");
    } catch (err: any) {
      console.log(err);
      console.log(err.response.data.errors);
    } finally {
      console.log("Finalizando requisição");
      //closeActivityModal();
      //window.document.location.reload(); // nao eh a melhor forma de mostrar quando uma atividade é criada e enviada pela API, procurar uma forma melhor
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Gerenciar convidados</h2>
            <button type="button" onClick={closeManageGuestsModal}>
              {""}
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Aqui você pode convidar mais pessoas.
          </p>
        </div>

        <form
          onSubmit={(event) => {
            inviteGuests(event);
          }}
          className="space-y-3"
        >
          <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <UserRoundPlus className="text-zinc-400 size-5" />
            <input
              type="text"
              name="name"
              placeholder="Digite o nome do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <CustomButton size="full">
            Convidar <Plus className="size-5" />
          </CustomButton>
        </form>
      </div>
    </div>
  );
}
