import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { DateRange, DayPicker } from "react-day-picker";

interface CustomDayPickerProps {
  eventStartEndDate: DateRange | undefined;
  isActivity: boolean;
  mode: "range" | "default" | "single" | "multiple" | undefined;
  activityDate: Date | undefined;
  closeChageDate: () => void;
  setEventStartEndDate: Dispatch<SetStateAction<DateRange | undefined>>;
  setActivityDate: Dispatch<SetStateAction<Date | undefined>>;
}
export function CustomDayPicker({
  closeChageDate,
  isActivity,
  mode = "range",
  activityDate = undefined,
  eventStartEndDate,
  setEventStartEndDate,
  setActivityDate,
}: CustomDayPickerProps) {
  const selectedDates = isActivity
    ? { from: new Date(activityDate!), to: new Date(activityDate!) }
    : eventStartEndDate;

  const handleSelect = (range: DateRange | undefined) => {
    setEventStartEndDate(range);
    if (isActivity && range?.from) {
      setActivityDate(range.from);
    }
  };
  return (
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
          mode={mode}
          selected={selectedDates}
          onSelect={handleSelect}
          disabled={{
            before: eventStartEndDate?.from,
            after: isActivity ? eventStartEndDate?.to : undefined,
          }}
        />
        <div className="w-full flex justify-center text-2xl">
          <input
            className="bg-transparent"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
