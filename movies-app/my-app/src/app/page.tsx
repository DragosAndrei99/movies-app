import MovieListPage from '../components/movie-list-page';
import SearchForm from '../components/search-form';

export default async function Home({ searchParams }: {searchParams: Promise<{search?: string, sort?: string, genre?:string}>}) {
  const searchParamsObj = await searchParams;
  const searchQuery =  searchParamsObj.search || ''; 
    return (
    <>
      <SearchForm
        initialSearchQuery={searchQuery}
      />
      <MovieListPage searchParams={searchParamsObj} />
    </>
  );
}