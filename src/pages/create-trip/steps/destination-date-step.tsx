import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { CustomButton } from "../../../ui/componets/CustomButton";
import { Divider } from "../../../ui/componets/Divider";

interface DestinationDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
}

export function DestinationDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
}: DestinationDateStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
        />
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Quando?"
          className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
        />
      </div>

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
