import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Calendar, MapPin, Settings2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { CustomButton } from "../../ui/componets/CustomButton";
import { Divider } from "../../ui/componets/Divider";
import { ChangeLocalDateModal } from "./modals/change-local-date-modal";

interface Trip {
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

interface DestinationDateHeaderProps {
  isChangeDateAble: boolean;
  ableChangeDate: () => void;
  disableChangeDate: () => void;
}

export function DestinationDateHeader({}: DestinationDateHeaderProps) {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  const [isChangeLocalDateAble, setIsChangeLocalDateAble] = useState(false);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [eventStartEndDate, setEventStartEndDate] = useState<
    DateRange | undefined
  >();

  useEffect(() => {
    api
      .get(`/trips/${tripId}`)
      .then((response) => {
        setTrip(response.data.trip);
      })
      .then(() => {
        setEventStartEndDate({ from: trip?.starts_at, to: trip?.ends_at });
      });
  }, [tripId]);

  const openChangeLocalDateModal = () => {
    setIsChangeLocalDateAble(true);
  };

  const closeChangeLocalDateModal = () => {
    setIsChangeLocalDateAble(false);
  };

  const closeDatePicker = () => {
    return setIsDatePickerOpen(false);
  };

  const displayedDate = trip
    ? format(new Date(trip.starts_at), "d' de 'LLLL' de 'yyyy", {
        locale: ptBR,
      })
        .concat(" até ")
        .concat(
          format(new Date(trip.ends_at), "d' de 'LLLL' de 'yyyy", {
            locale: ptBR,
          })
        )
    : null;

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="bg-transparent text-lg placeholder-zinc-400 outline-none">
          {trip?.destination}
        </span>
      </div>

      <div className="flex items-center gap-5">
        <span className="flex items-center gap-2">
          {""}
          <Calendar className="size-5 text-zinc-400" />
          {""}
          <span className="text-zinc-100">{displayedDate}</span>
        </span>

        <Divider />

        <CustomButton
          type="button"
          onClick={openChangeLocalDateModal}
          variant="secondary"
        >
          Alterar local/data <Settings2 className="size-5" />
        </CustomButton>
      </div>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button type="button" onClick={closeDatePicker}>
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

      {isChangeLocalDateAble && (
        <ChangeLocalDateModal
          tripDestination={trip?.destination}
          tripStartsAt={trip?.starts_at}
          tripEndsAt={trip?.ends_at}
          closeChangeLocalDateModal={closeChangeLocalDateModal}
        />
      )}
    </div>
  );
}
