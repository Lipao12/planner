import { Link2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { CustomButton } from "../../ui/componets/CustomButton";

interface Link {
  id: string;
  title: string;
  url: string;
}

interface ImportantLinksProps {
  openLinkModal: () => void;
}

export function ImportantLinks({ openLinkModal }: ImportantLinksProps) {
  const { tripId } = useParams();
  const [links, setLinks] = useState<Link[] | undefined>();

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {links && links?.length > 0 ? (
          links?.map((link) => {
            return (
              <div
                key={link.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">
                    {link.title}
                  </span>
                  {/*O display block vai fazer com que ocupe a linha toda */}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                  >
                    {link.url}
                  </a>
                  {/*truncate - trunca o texto colocando o "..." */}
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0" />
                {/*shrink-0 - independente do tamamnho dos outros componentes, esse não irá diminuir */}
              </div>
            );
          })
        ) : (
          <h2 className="text-zinc-400">Nenhum link cadastrado</h2>
        )}
      </div>

      <CustomButton variant="secondary" size="full" onClick={openLinkModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </CustomButton>
    </div>
  );
}
