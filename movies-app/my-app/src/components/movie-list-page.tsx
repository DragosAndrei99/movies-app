'use client'

import { ChangeEvent } from "react";
import { redirect } from "next/navigation";
import GenreSelect from "./genre-select";
import SortControl from "./sort-control";
import MovieTile from "./movie-tile";
import { MovieInfo } from "../interfaces/movie-info.interface";

export const genreList = ['All', 'Comedy', 'Drama', 'Action', 'Adventure'];

export default async function MovieListPage({ searchParams }: { searchParams: any }) {
  const searchedMovie = searchParams.search || '';
  const sortCriterion = searchParams.sort || 'Release Date';
  const activeGenre = searchParams.genre || genreList[0];

  const params = {
    search: searchedMovie || '',
    searchBy: 'title',
    sortBy: (sortCriterion || 'Release Date').toLowerCase(),
    sortOrder: 'asc',
    filter: activeGenre !== "All" ? activeGenre : "",
  };
  
  const data = await fetch("http://localhost:4000/movies/?" + new URLSearchParams(params).toString());
  const movieList = (await data.json()).data;

  const modifyGenre = 
    (movieGenre: string) => {
      redirect(`/?genre=${movieGenre}`);
    };

  const changeSortCriterion = (e: ChangeEvent<HTMLOptionElement>) => {
      const activeSortCriterion = e.currentTarget.value;
      redirect(`/?sort=${activeSortCriterion}`);

    };

  const handleClickMovieTile = 
    (movieId: string) => () => {
      redirect(`/${movieId}`);
    };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-8 py-4">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-red-500">netflixroulette</h1>
      </header>
      {/* <Outlet /> */}

      <div className="flex justify-between items-center mt-8">
        <GenreSelect genreList={genreList} currentlySelectedGenre={activeGenre} onSelect={modifyGenre} />
        <SortControl currentSelection={sortCriterion} handleSelectionChange={changeSortCriterion} />
      </div>

      <div className="grid grid-cols-3 gap-10 mt-8" id="movie-list">
        {/* {loading && <p className="mt-8 text-center text-xl">Loading movies...</p>}
        {error && <p className="mt-8 text-center text-red-500">{error}</p>} */}
        {movieList.length > 0 && movieList.map((movie: MovieInfo) => (
          <a href={`/${movie.id}`} key={`${movie.id}-a`}>
            <MovieTile
              key={movie.id}
              movieInfo={movie}
              onClickCallback={handleClickMovieTile}
              containerWidth="w-full"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
