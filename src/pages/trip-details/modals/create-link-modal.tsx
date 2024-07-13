import { Link2, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { CustomButton } from "../../../ui/componets/CustomButton";

interface CreateLinkModalProps {
  closeLinkModal: () => void;
}

export function CreateLinkModal({ closeLinkModal }: CreateLinkModalProps) {
  const { tripId } = useParams();

  function isValidUrl(string: string): boolean {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  const createLink = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString() || "";
    const url = data.get("link")?.toString() || "";

    if (!title || !url) {
      console.log("Title ou Link estão vazios");
      return;
    }

    if (!isValidUrl(url)) {
      console.log("Formato da URL inválido");
      return;
    }

    try {
      api.post(`/trips/${tripId}/links`, {
        title,
        url,
      });
      console.log("Link Postada");
    } catch (err: any) {
      console.log(err);
      console.log(err.response.data.errors);
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
            <h2 className="text-lg font-semibold">
              Cadastrar links importantes
            </h2>
            <button type="button" onClick={closeLinkModal}>
              {""}
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar os links.
          </p>
        </div>

        <form
          onSubmit={(event) => {
            createLink(event);
          }}
          className="space-y-3"
        >
          <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              name="title"
              placeholder="Nome do site"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="text-zinc-400 size-5" />
            <input
              type="text"
              name="link"
              placeholder="Digite o link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 [color-scheme:dark]"
            />
          </div>
          <CustomButton size="full">Salvar link</CustomButton>
        </form>
      </div>
    </div>
  );
}
