import { CircleDashed, UserCog } from "lucide-react";
import { CustomButton } from "../../ui/componets/CustomButton";

export function Guests() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Jessica White
            </span>
            {/*O display block vai fazer com que ocupe a linha toda */}
            <span className="block text-sm text-zinc-400 truncate ">
              jessica.white@email.com
            </span>
            {/*truncate - trunca o texto colocando o "..." */}
          </div>
          <CircleDashed className="text-zinc-400 size-5 shrink-0" />
          {/*shrink-0 - independente do tamamnho dos outros componentes, esse não irá diminuir */}
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Rodney White
            </span>
            {/*O display block vai fazer com que ocupe a linha toda */}
            <span className="block text-sm text-zinc-400 truncate ">
              ford_prosacco@hotmail.com
            </span>
            {/*truncate - trunca o texto colocando o "..." */}
          </div>
          <CircleDashed className="text-zinc-400 size-5 shrink-0" />
          {/*shrink-0 - independente do tamamnho dos outros componentes, esse não irá diminuir */}
        </div>
      </div>

      <CustomButton variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </CustomButton>
    </div>
  );
}
