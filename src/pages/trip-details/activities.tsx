import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface ActivityItem {
  id: string;
  title: string;
  occurs_at: string;
}

interface Activity {
  date: string;
  activities: ActivityItem[];
}

export function Activities() {
  const { tripId } = useParams<{ tripId: string }>();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then((response) => {
      setActivities(response.data.activities);
    });
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities.length > 0 ? (
        activities.map((category) => {
          const formattedDate = parseISO(category.date);

          return (
            <div key={category.date} className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl font-semibold text-zinc-300">
                  Dia {format(formattedDate, "d")}
                </span>
                <span className="text-xs text-zinc-500">
                  {format(formattedDate, "EEEE", { locale: ptBR })}
                </span>
              </div>
              {category.activities.length > 0 ? (
                category.activities.map((activity) => {
                  const activityTime = parseISO(activity.occurs_at);

                  return (
                    <div key={activity.id} className="space-y-2.5">
                      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                          {format(activityTime, "HH:mm")}h
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-zinc-500 text-sm">
                  Nenhuma atividade cadastrada nessa data.
                </p>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-zinc-500 text-sm">Nenhuma atividade encontrada.</p>
      )}
    </div>
  );
}
