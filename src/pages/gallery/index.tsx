import { type FC } from "react";
import useQuery from "swr";
import { filmGallery } from "../../api/film";
import { useGenres } from "../../common/context/genre/useGenres";
import { withLayout } from "../layout";
import FilmsCaraousel from "./FilmsGallery";

const GalleryPage: FC = () => {
  const genres = useGenres();
  const { data, isLoading } = useQuery(["/gallery"], filmGallery);
  return (
    <div className="w-full flex flex-col justify-start items-center gap-3">
      <FilmsCaraousel
        title="Films you have directed"
        emptyMessage="There's no films you have directed yet"
        films={data?.films ?? []}
        isLoading={isLoading}
      />
      <div className="w-full max-w-2xl max-h-80 bg-white flex flex-row items-start overflow-x-hidden rounded-lg p-6 md:p-8"></div>
    </div>
  );
};

export default withLayout(GalleryPage, {
  heading: "Your films and reviews",
  route: "Gallery",
});
