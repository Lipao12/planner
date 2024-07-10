import { User, X } from "lucide-react";
import { CustomButton } from "../../ui/componets/CustomButton";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
}

export function ConfitmTripModal(props: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viajem
            </h2>
            <button type="button" onClick={props.closeConfirmTripModal}>
              {""}
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação de viagem para{" "}
            <span className="font-semibold">LUGAR</span> nas datas de{" "}
            <span className="font-semibold">16 a 27 de agosto de 2024</span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={props.createTrip} className="space-y-3">
          <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => props.setOwnerName(event.target.value)}
            />
          </div>
          <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => props.setOwnerEmail(event.target.value)}
            />
          </div>

          <CustomButton type="submit" size="full">
            Criação da viajem
          </CustomButton>
        </form>
      </div>
    </div>
  );
}
