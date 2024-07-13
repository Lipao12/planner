import { Calendar, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { CustomButton } from "../../../ui/componets/CustomButton";

interface CreateActivityModalProps {
  closeActivityModal: () => void;
}

export function CreateActivityModal({
  closeActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  const createActivity = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title");
    const occurs_at = data.get("occurs_at")?.toString();

    try {
      api.post(`/trips/${tripId}/activities`, {
        title,
        occurs_at,
      });
      console.log("Atividade Postada");
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Finalizando requisição");
      //closeActivityModal();
      window.document.location.reload(); // nao eh a melhor forma de mostrar quando uma atividade é criada e enviada pela API, procurar uma forma melhor
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button type="button" onClick={closeActivityModal}>
              {""}
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar as atividades.
          </p>
        </div>

        <form
          onSubmit={(event) => {
            createActivity(event);
          }}
          className="space-y-3"
        >
          <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              name="title"
              placeholder="Qual a atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className="text-zinc-400 size-5" />
            <input
              type="datetime-local"
              name="occurs_at"
              placeholder="Data e horário da atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 [color-scheme:dark]"
            />
          </div>
          <CustomButton size="full">Salvar atividade</CustomButton>
        </form>
      </div>
    </div>
  );
}
