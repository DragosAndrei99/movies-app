import MovieDetails from "../../components/movie-details";


export default async function MovieId({ params }: { params: Promise<{ movieId: string }> }) {
  const paramsObj = await params;
  return (<>
    <div className="flex justify-end">
      <button className="w-full max-w-20 text-3xl text-white text-bold hover:bg-gray-700">X</button>
    </div>
    <MovieDetails movieId={paramsObj.movieId} />
  </>)
}