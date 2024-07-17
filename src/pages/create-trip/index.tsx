import { FormEvent, useState } from "react";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { ConfitmTripModal } from "./modals/confirm-trip-modal";
import { InviteGuestsModal } from "./modals/invite-guests-modal";
import { DestinationDateStep } from "./steps/destination-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailstoInvite] = useState(["filipe@gmail.com"]);
  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartEndDate, setEventStartEndDate] = useState<
    DateRange | undefined
  >();
  const [loading, setLoading] = useState(false);

  const openGuestsInput = () => {
    console.log(eventStartEndDate);
    setIsGuestsInputOpen(true);
  };

  const closeGuestsInput = () => {
    setIsGuestsInputOpen(false);
  };

  const openGuestsModal = () => {
    setIsGuestsModalOpen(true);
  };

  const closeGuestsModal = () => {
    setIsGuestsModalOpen(false);
  };

  const openConfirmTripModal = () => {
    setIsConfirmTripModalOpen(true);
  };

  const closeConfirmTripModal = () => {
    setIsConfirmTripModalOpen(false);
  };

  const handleAddEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) return;

    if (emailsToInvite.includes(email)) {
      alert("Este email já foi convidado.");
      return;
    }

    setEmailstoInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  };

  const removeEmail = (emailToRemove: string) => {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );
    setEmailstoInvite(newEmailList);
  };

  const createTrip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!destination) {
      return;
    }
    if (!eventStartEndDate?.from || !eventStartEndDate?.to) {
      return;
    }
    if (emailsToInvite.length === 0) {
      return;
    }
    if (!ownerEmail || !ownerName) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/trips", {
        destination: destination,
        start_date: eventStartEndDate?.from,
        end_date: eventStartEndDate?.to,
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail,
      });
      const { id } = response.data;
      api.get(`/trips/${id}/confirm`);
      navigate(`/trips/${id}`);
    } catch (err: any) {
      console.error(err.response.data.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            closeGuestsInput={closeGuestsInput}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            eventStartEndDate={eventStartEndDate}
            setEventStartEndDate={setEventStartEndDate}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela planner você automaticamente concorda{" "}
          <br />
          com nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade.
          </a>
        </p>
      </div>
      {isGuestsModalOpen && (
        <InviteGuestsModal
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          handleAddEmail={handleAddEmail}
          removeEmail={removeEmail}
        />
      )}
      {isConfirmTripModalOpen && (
        <ConfitmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          destination={destination}
          eventStartEndDate={eventStartEndDate}
          loading={loading}
        />
      )}
    </div>
  );
}
