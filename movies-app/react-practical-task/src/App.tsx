import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import './App.css'
import MovieListPage from './components/movie-list-page/movie-list-page';
import SearchForm from './components/search-form/search-form';
import MovieDetails from './components/movie-details/movie-details';
import { ChangeEvent, useCallback } from 'react';
import AddMovieForm from './components/add-movie-form/add-movie-form';
import EditMovieForm from './components/edit-movie-form/edit-movie-form';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const navigate = useNavigate();
  
  const searchMovie = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      const searchedMovieName: string = (e.currentTarget[0] as HTMLFormElement).value;
      e?.preventDefault();
      setSearchParams(searchParams => {
        searchParams.set('query', searchedMovieName)
        return searchParams
      });
    },
    [searchParams, setSearchParams]
  );

  const closeSelectedMovie = useCallback(
    () => {
      navigate(`/?${searchParams.toString()}`)
    },
    [searchParams]
  )

  const openNewMovieDialog = useCallback(
    () => {
      navigate('/new')
    },
    []
  )

  return (
    <Routes>
      <Route  path="/" element={<MovieListPage searchParams={searchParams} setSearchParams={setSearchParams} navigate={navigate} />}>
        <Route path="/" element={<SearchForm initialSearchQuery='' onSearch={searchMovie} openNewMovieDialog={openNewMovieDialog}/>}>
          <Route path="/new" element={<AddMovieForm navigate={navigate}/>}/>
        </Route>
        <Route path="/:movieId" element={ <>
          <div className="flex justify-end">
            <button onClick={closeSelectedMovie} className="w-full max-w-20 text-3xl text-white text-bold hover:bg-gray-700">X</button>
          </div>
          <MovieDetails />
        </>} />
          <Route path="/:movieId/edit" element={<EditMovieForm navigate={navigate}/>} />
      </Route>
    </Routes>
  )
}

export default App
