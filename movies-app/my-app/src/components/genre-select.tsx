import { MouseEvent, useCallback } from "react"

export default function GenreSelect({ genreList, currentlySelectedGenre, onSelect }: { genreList: string[], currentlySelectedGenre: string, onSelect: any }) {

  return <>
    <ul className="flex space-x-0 py-4 text-lg bg-gray-900" id="genre-select">
      {genreList.map(genre => <li key={genre}>

        <button
          key={`${genre}-bttn`}
          onClick={useCallback((e: MouseEvent<HTMLButtonElement>) => onSelect((e.target as HTMLInputElement).textContent), [onSelect])}
          className={`bg-transparent px-4 py-2 text-white hover:border-b-4 focus:outline-none focus:border-b-4 border-b-4 ${currentlySelectedGenre === genre ? 'border-rose-500' : ''}`}
          id={`${genre}`}
        >
          {genre}
        </button>
      </li>)}
    </ul>
  </>
}