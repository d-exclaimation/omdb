import { type FC } from "react";
import useQuery from "swr";
import { filmGallery, reviewedFilms, topFilms } from "../../api/film";
import { when } from "../../api/keys";
import { useAuth } from "../../auth/useAuth";
import Button from "../../common/components/Button";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { useSearchParam } from "../../common/hooks/useSearchParam";
import { useToggle } from "../../common/hooks/useToggle";
import { tw } from "../../common/utils/tailwind";
import Layout from "../layout";
import CreateFilmDialog from "./CreateFilmDialog";
import FilmsCaraousel from "./FilmsCaraousel";
import GalleryPagePreview from "./preview";

const GalleryPage: FC = () => {
  const immediate = useSearchParam("create");
  const [creating, { close, open }] = useToggle(!!immediate);
  const { user, isAuthenticating } = useAuth();
  const { data: gallery, isLoading: isGalleryLoading } = useQuery(
    when(!isAuthenticating, filmGallery.key),
    filmGallery.fn
  );
  const { data: reviewed, isLoading: isReviewedLoading } = useQuery(
    when(!isAuthenticating, reviewedFilms.key),
    reviewedFilms.fn
  );

  const { data: top5, isLoading: isTop5Loading } = useQuery(
    when(!isAuthenticating, topFilms.key),
    topFilms.fn
  );

  if (isAuthenticating) {
    return (
      <Layout heading="Your gallery" route="Gallery">
        <LoadingIndicator />{" "}
      </Layout>
    );
  }

  if (!user) {
    return <GalleryPagePreview />;
  }

  return (
    <Layout heading="Your gallery" route="Gallery">
      <div className="flex w-full flex-col items-center justify-start gap-3">
        <Button
          className={tw(`absolute -top-[4.5rem] right-2 ring-1 ring-zinc-900 
          transition-all hover:text-zinc-900 active:text-zinc-900 
          dark:bg-zinc-100 dark:text-zinc-950 dark:ring-zinc-100 
          dark:hover:bg-zinc-950 dark:hover:text-zinc-100 
          dark:active:bg-zinc-950 dark:active:text-zinc-100`)}
          color={{
            bg: "bg-zinc-900",
            text: "text-zinc-50",
            hover: "hover:bg-zinc-50",
            active: "active:bg-zinc-50",
            border: "focus-visible:ring-zinc-500",
          }}
          onClick={open}
        >
          Create film
        </Button>
        <FilmsCaraousel
          title="Known for"
          empty={{
            message: "There's no films you have directed yet",
            action: {
              kind: "action",
              onClick: open,
              label: "Create your first masterpiece",
            },
          }}
          films={top5?.films ?? []}
          isLoading={isTop5Loading}
        />
        <FilmsCaraousel
          title="Directed"
          empty={{
            message: "There's no films you have directed yet",
            action: {
              kind: "action",
              onClick: open,
              label: "Start directing now",
            },
          }}
          films={gallery?.films ?? []}
          isLoading={isGalleryLoading}
        />
        <FilmsCaraousel
          title="Reviewed"
          empty={{
            message: "There's no films you have reviewed yet",
            action: {
              kind: "link",
              href: "/explore",
              label: "Start exploring",
            },
          }}
          films={reviewed?.films ?? []}
          isLoading={isReviewedLoading}
        />
        <CreateFilmDialog creating={creating} onClose={close} />
      </div>
    </Layout>
  );
};

export default GalleryPage;
