import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { DateRange } from "react-day-picker";
import ClipLoader from "react-spinners/ClipLoader";
import { CustomButton } from "../../../ui/componets/CustomButton";

interface ConfirmTripModalProps {
  destination: string;
  eventStartEndDate: DateRange | undefined;
  loading: boolean;
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
}

export function ConfitmTripModal(props: ConfirmTripModalProps) {
  const displayedDate =
    props.eventStartEndDate &&
    props.eventStartEndDate.from &&
    props.eventStartEndDate.to
      ? format(props.eventStartEndDate.from, "d' de 'LLLL' de 'yyyy", {
          locale: ptBR,
        })
          .concat(" até ")
          .concat(
            format(props.eventStartEndDate.to, "d' de 'LLLL' de 'yyyy", {
              locale: ptBR,
            })
          )
      : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        {!props.loading ? (
          <>
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
                <span className="font-semibold">{props.destination}</span> nas
                datas de <span className="font-semibold">{displayedDate}</span>{" "}
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
          </>
        ) : (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <h2 className="text-xl font-semibold text-center ">
                  Estamos carregando os dados de sua viagem!
                </h2>
              </div>
              <p className="text-sm text-zinc-400">
                A viagem será{" "}
                <span className="font-semibold">{props.destination}</span> e
                ocorrerá entre os dias{" "}
                <span className="font-semibold">{displayedDate}</span>.
              </p>
              <div className="flex items-center justify-center">
                <ClipLoader
                  color={"#BEF264"}
                  loading={props.loading}
                  size={80}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
