import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { CustomButton } from "../../ui/componets/CustomButton";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

interface GuestsProps {
  openManageGuestsModal: () => void;
}

export function Guests({ openManageGuestsModal }: GuestsProps) {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[] | undefined>();

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {participants?.map((participant: Participant, index: number) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant?.name ? participant.name : `Convidado ${index}`}
                </span>
                {/*O display block vai fazer com que ocupe a linha toda */}
                <span className="block text-sm text-zinc-400 truncate ">
                  {participant?.email}
                </span>
                {/*truncate - trunca o texto colocando o "..." */}
              </div>
              {participant?.is_confirmed ? (
                <CircleCheck className="size-5 text-lime-300" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )}
              {/*shrink-0 - independente do tamamnho dos outros componentes, esse não irá diminuir */}
            </div>
          );
        })}
      </div>

      <CustomButton
        variant="secondary"
        size="full"
        onClick={openManageGuestsModal}
      >
        <UserCog className="size-5" />
        Gerenciar convidados
      </CustomButton>
    </div>
  );
}
