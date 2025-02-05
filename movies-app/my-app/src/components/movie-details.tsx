
import { MovieInfo } from "../interfaces/movie-info.interface";


export default async function MovieDetails({movieId}: {movieId: string}) {
  
  const data = await fetch(`http://localhost:4000/movies/${movieId}`);  
  const movieInfo = (await data.json());
  
  return (!!movieInfo &&
    <div className="bg-gray-900 text-white p-8 rounded-lg flex max-w-7xl mx-auto shadow-lg" id="movie-details">
      <div className="w-1/3">
        <img src={(movieInfo as unknown as MovieInfo).poster_path} alt={`${(movieInfo as unknown as MovieInfo).title} Poster`} className="rounded-lg shadow-md" />
      </div>

      <div className="w-2/3 ml-8 flex flex-col">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-wide">{(movieInfo as unknown as MovieInfo).title}</h1>
          <p className="text-lg text-gray-400 mt-2">{(movieInfo as unknown as MovieInfo).genres.map((genre: string, id: number) => id === (movieInfo as unknown as MovieInfo).genres.length - 1 ? genre : `${genre}, `)}</p>
        </div>

        <div className="mt-4 flex items-center text-lg text-gray-400">
          <span className="mr-4">{(movieInfo as unknown as MovieInfo).release_date}</span>
          <span className="mr-4">{(movieInfo as unknown as MovieInfo).runtime}</span>
          <span className="bg-gray-800 px-4 py-1 rounded-full text-white font-semibold">{(movieInfo as unknown as MovieInfo).vote_average}</span>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-300 leading-relaxed">{(movieInfo as unknown as MovieInfo).overview}</p>
        </div>
      </div>
    </div>
  )
}