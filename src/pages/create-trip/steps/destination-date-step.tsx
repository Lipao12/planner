import { format } from "date-fns";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CustomButton } from "../../../ui/componets/CustomButton";
import { Divider } from "../../../ui/componets/Divider";

interface DestinationDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartEndDate: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartEndDate: (dates: DateRange | undefined) => void;
}

export function DestinationDateStep({
  isGuestsInputOpen,
  eventStartEndDate,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setEventStartEndDate,
}: DestinationDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const openDatePicker = () => {
    return setIsDatePickerOpen(true);
  };

  const closeDatePicker = () => {
    return setIsDatePickerOpen(false);
  };

  const displayedDate =
    eventStartEndDate && eventStartEndDate.from && eventStartEndDate.to
      ? format(eventStartEndDate.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartEndDate.to, "d' de 'LLL"))
      : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <button
        onClick={openDatePicker}
        className="flex items-center gap-2 text-left"
        disabled={isGuestsInputOpen}
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className=" text-lg text-zinc-400  flex-1">
          {eventStartEndDate ? displayedDate : "Quando?"}
        </span>
      </button>

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
            />
          </div>
        </div>
      )}

      <Divider />

      {isGuestsInputOpen ? (
        <>
          <CustomButton
            type="button"
            onClick={closeGuestsInput}
            variant="secondary"
          >
            Alterar local/data <Settings2 className="size-5" />
          </CustomButton>
        </>
      ) : (
        <>
          <CustomButton type="button" onClick={openGuestsInput}>
            Continuar <ArrowRight className="size-5" />
          </CustomButton>
        </>
      )}
    </div>
  );
}
