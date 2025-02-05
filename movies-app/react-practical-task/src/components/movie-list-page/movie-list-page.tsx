import { ChangeEvent, useCallback, useState } from "react";
import GenreSelect from "../genre-select/genre-select";
import SortControl from "../sort-control/sort-control";
import MovieTile from "../movie-tile/movie-tile";

import { MovieInfo } from "../../interfaces/movie-info.interface";
import { NavigateFunction, Outlet, SetURLSearchParams } from "react-router-dom";
import useFetch from "../../hooks/fetch";


export const genreList = ['All', 'Comedy', 'Drama', 'Action', 'Adventure']

export default function MovieListPage({ searchParams, setSearchParams, navigate }: { searchParams: URLSearchParams, setSearchParams: SetURLSearchParams, navigate: NavigateFunction }) {
  const searchedMovie = searchParams.get('query') || '';
  const sortCriterion = searchParams.get('sort') || 'Release Date';
  const activeGenre = searchParams.get('genre') || genreList[0];

  const [movieList, setMovieList] = useState<MovieInfo[] | []>([])
  const { loading, error } = useFetch(`http://localhost:4000/movies`, [searchedMovie, sortCriterion, activeGenre, setMovieList], setMovieList, {
    search: searchedMovie,
    searchBy: 'title',
    sortBy: sortCriterion.toLowerCase(),
    sortOrder: 'asc',
    filter: activeGenre !== "All" ? activeGenre : "",
  })

  const modifyGenre = useCallback(
    (movieGenre: string) => {
      setSearchParams(searchParams => {
        searchParams.set('genre', movieGenre)
        return searchParams
      });
    },
    [searchParams, setSearchParams]
  );

  const changeSortCriterion = useCallback(
    (e: ChangeEvent<HTMLOptionElement>) => {
      const activeSortCriterion = e.currentTarget.value;
      setSearchParams(searchParams => {
        searchParams.set('sort', activeSortCriterion)
        return searchParams
      });
    },
    [searchParams, setSearchParams]
  );

  const handleClickMovieTile = useCallback(
    (movieId: string) => () => {      
      navigate(`/${movieId}/?${searchParams.toString()}`)
    },
    [searchParams]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white px-8 py-4">

      <header className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-red-500">netflixroulette</h1>

      </header>
      <Outlet />
      <div className="flex justify-between items-center mt-8">
        <GenreSelect genreList={genreList} currentlySelectedGenre={activeGenre} onSelect={modifyGenre} />
        <SortControl currentSelection={sortCriterion} handleSelectionChange={changeSortCriterion} />
      </div>


      <div className="grid grid-cols-3 gap-10 mt-8" id="movie-list">
        {loading && <p className="mt-8 text-center text-xl">Loading movies...</p>}
        {error && <p className="mt-8 text-center text-red-500">{error}</p>}
        {
          !loading && !error && !!(movieList as unknown as MovieInfo[]).length && (movieList as unknown as MovieInfo[]).map((movie: MovieInfo) =>
            <MovieTile key={movie.id} movieInfo={movie} onClickCallback={handleClickMovieTile} containerWidth="w-full" />
          )
        }
      </div>
    </div>
  )
}