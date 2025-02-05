import { useState, MouseEvent, useCallback } from "react";
import { MovieInfo } from "../../interfaces/movie-info.interface";

export default function MovieTile({ movieInfo, onClickCallback, containerWidth }: { movieInfo: MovieInfo, onClickCallback: any, containerWidth: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setMenuOpen((currState) => !currState);
  };

  return (
    <div onClick={onClickCallback(movieInfo.id)} data-index={movieInfo.id} className={`${containerWidth} bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden cursor-pointer`} id="movie-item">
      <div className="relative">
        <img src={movieInfo.poster_path} alt={`${movieInfo.title} Poster`} className="w-full h-auto" />
        <div className="absolute top-2 right-2">
          <button onClick={useCallback((e: MouseEvent<HTMLButtonElement>) => toggleMenu(e), [setMenuOpen])} className="text-white focus:outline-none">
            <svg
              className={`${containerWidth === "max-w-xs" ? "w-10 h-6" : "w-18 h-10"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 22 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M6 12h.01M12 12h.01M18 12h.01"
              />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 text-black z-10">
              <a
                href={`/${movieInfo.id}/edit`}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Edit
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Delete
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-lg font-bold text-center">{movieInfo.title}</h2>
        <p className="text-lg text-gray-300 mt-2">{movieInfo.release_date}</p>
        <p className="text-sm text-gray-300 mt-1">{movieInfo.genres.map((genre: string, id: number) => id === movieInfo.genres.length - 1 ? genre : `${genre}, `)}</p>
      </div>
    </div>
  )
}