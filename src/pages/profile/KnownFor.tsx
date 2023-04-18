import { type FC } from "react";
import { FilmSearch } from "../../api/queries/film";
import { api } from "../../api/url";

type KnownForProps = {
  films: FilmSearch["films"];
};

const KnownFor: FC<KnownForProps> = ({ films }) => {
  return (
    <div className="w-full max-w-2xl max-h-96 bg-white flex flex-col rounded-lg p-6 md:p-8">
      <section className="w-full flex items-center justify-start">
        <h2 className="font-semibold text-xl">Your popular films</h2>
      </section>
      <section className="w-full flex items-center justify-start gap-3 my-2 p-1 overflow-x-auto">
        {films.length ? (
          films.map(({ filmId, title, rating }) => (
            <div
              key={filmId}
              className="flex flex-col shadow w-max flex-shrink-0 rounded-lg overflow-hidden"
            >
              <img
                className="object-cover w-72 h-40"
                src={`${api}/films/${filmId}/image`}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://api.dicebear.com/6.x/shapes/svg?seed=Charlie&backgroundColor=69d2e7&shape1Color=0a5b83,1c799f,69d2e7,f1f4dc&shape2Color=0a5b83,1c799f,69d2e7,f1f4dc&shape3Color=0a5b83,1c799f,69d2e7,f1f4dc";
                }}
                alt="film-1"
              />
              <div className="w-72 h-16 bg-zinc-50 p-2">
                <h4 className="font-bold max-w-full truncate">{title}</h4>
                <footer className="w-full text-zinc-500 text-sm truncate">
                  Average rating of{" "}
                  <span className="text-zinc-700 font-semibold">{rating}</span>
                </footer>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center pt-6 pb-4 text-zinc-500">
            There's no films you have directed yet
          </div>
        )}
      </section>
    </div>
  );
};

export default KnownFor;
