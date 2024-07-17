import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Navigation, Plane, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { CustomButton } from "../../ui/componets/CustomButton";

interface Trip {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export function UserTripsPage() {
  const navigate = useNavigate();

  const { userId } = useParams<{ userId: string }>();
  const [trips, setTrips] = useState<Trip[]>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  console.log(userId);

  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      setUser(response.data.user);
    });
    api
      .get(`/user/${userId}/trips`)
      .then((response) => {
        setTrips(response.data.trips);
      })
      .then(() => {
        console.log(trips);
      });
  }, [userId]);

  const handleCreateTravel = (userId: string | undefined) => {
    try {
      navigate(`/create-trip/${userId}`);
    } catch (err: any) {
      //console.error(err.response.data.message);
      console.error(err);
    } finally {
    }
  };

  const enterTrip = (tripId: string) => {
    try {
      setLoading(true);
      navigate(`trips/${tripId}`); // `/user/${userId}/trips/${tripId}`
    } catch (err: any) {
      //console.error(err.response.data.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const displayedDate = (from: string, to: string) => {
    return format(new Date(from), "dd'/'LL'/'yyyy", {
      locale: ptBR,
    })
      .concat(" - ")
      .concat(
        format(new Date(to), "dd'/'LL'/'yyyy", {
          locale: ptBR,
        })
      );
  };

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center ">
            <h2 className="text-3xl font-semibold ml-12">
              {user ? `Bem-vindo ${user.name},` : ""}
            </h2>
          </div>
          <div className="flex items-center ">
            <Navigation className="size-8 mr-5" />
            <h2 className="text-3xl font-semibold">
              Todas as viagens feitas por esse e-mail
            </h2>
          </div>
          <CustomButton
            onClick={() => {
              handleCreateTravel(userId);
            }}
          >
            Adicionar viagem <Plus className="size-5" />
          </CustomButton>
          <div className="grid grid-cols-2 gap-5">
            {trips &&
              trips.length > 0 &&
              trips.map((trip: Trip) => {
                return (
                  <button
                    key={trip.id}
                    onClick={() => {
                      enterTrip(trip.id, userId);
                    }}
                    className="shadow-shape px-4 py-2.5 bg-zinc-900 items-center rounded-xl flex text-left w-80"
                  >
                    <Plane className="h-7 w-7 mr-10" />
                    <div>
                      <span className="text-xl">{trip.destination}</span>
                      <br />
                      <span>
                        {displayedDate(trip.start_date, trip.end_date)}
                      </span>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}
