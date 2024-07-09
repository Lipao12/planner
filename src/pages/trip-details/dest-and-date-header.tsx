import { Calendar, MapPin, Settings2 } from "lucide-react";
import { CustomButton } from "../../ui/componets/CustomButton";
import { Divider } from "../../ui/componets/Divider";

export function DestinationDateHeader() {
  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">Vitória, Brasil</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">17 a 23 de agosto</span>
        </div>

        <Divider />

        <CustomButton variant="secondary">
          Alterar local/data <Settings2 className="size-5" />
        </CustomButton>
      </div>
    </div>
  );
}
