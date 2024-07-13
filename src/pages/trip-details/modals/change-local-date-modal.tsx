import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, MapPin, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { CustomButton } from "../../../ui/componets/CustomButton";

interface ChangeLocalDateModalProps {
  tripDestination: string | undefined;
  tripStartsAt: string | undefined;
  tripEndsAt: string | undefined;
  closeChangeLocalDateModal: () => void;
}

export function ChangeLocalDateModal({
  tripDestination,
  tripStartsAt,
  tripEndsAt,
  closeChangeLocalDateModal,
}: ChangeLocalDateModalProps) {
  const { tripId } = useParams();
  const [isOpenChageDateModal, setIsOpenChageDateModal] = useState(false);
  const [eventStartEndDate, setEventStartEndDate] = useState<
    DateRange | undefined
  >({
    from: new Date(tripStartsAt ? tripStartsAt : ""),
    to: new Date(tripEndsAt ? tripEndsAt : ""),
  });
  const [inputValue, setInputValue] = useState("");

  const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const openChageDate = () => {
    setIsOpenChageDateModal(true);
  };
  const closeChageDate = () => {
    setIsOpenChageDateModal(false);
  };

  const handleChageTrip = async () => {
    console.log(inputValue);

    const destination = inputValue || tripDestination || "";
    const starts_at = eventStartEndDate?.from;
    const ends_at = eventStartEndDate?.to;

    console.log("Desti:", destination);

    try {
      await api.put(`/trips/${tripId}`, {
        destination,
        starts_at,
        ends_at,
      });
      console.log("Local atualizado");
      window.document.location.reload(); // nao eh a melhor forma de mostrar quando uma atividade é criada e enviada pela API, procurar uma forma melhor
    } catch (err: any) {
      console.log(err);
      console.log(err.response?.data?.errors);
    } finally {
      console.log("Finalizando requisição");
    }
  };

  const displayedDate =
    eventStartEndDate && eventStartEndDate.from && eventStartEndDate.to
      ? format(new Date(eventStartEndDate.from), "d' de 'LLLL' de 'yyyy", {
          locale: ptBR,
        })
          .concat(" até ")
          .concat(
            format(new Date(eventStartEndDate.to), "d' de 'LLLL' de 'yyyy", {
              locale: ptBR,
            })
          )
      : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Alterar o local ou a data da viagem.
            </h2>
            <button type="button" onClick={closeChangeLocalDateModal}>
              {""}
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
        </div>
        <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <input
            name="destination"
            value={inputValue}
            onChange={changeInputValue}
            className="bg-transparent text-lg placeholder-zinc-400 outline-none"
            placeholder={tripDestination}
          />
        </div>
        <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <button
            type="button"
            className="flex items-center gap-2 text-left"
            onClick={openChageDate}
          >
            <span>{displayedDate}</span>
          </button>
        </div>

        <CustomButton size="full" onClick={handleChageTrip}>
          Confirmar mudança
        </CustomButton>
      </div>

      {isOpenChageDateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button type="button" onClick={closeChageDate}>
                  {""}
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>
            <DayPicker
              mode="range"
              selected={eventStartEndDate}
              onSelect={setEventStartEndDate}
              disabled={{
                before: new Date(),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
