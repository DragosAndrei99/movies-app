import { useEffect } from 'react';
import { MovieInfo } from '../../interfaces/movie-info.interface';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function MovieForm ({ handleFormSubmit, initialMovie }: { handleFormSubmit: (data: MovieInfo) => void , initialMovie?: MovieInfo }) { 
  const { register, handleSubmit, reset, setValue, formState: {errors} } = useForm<MovieInfo>({
    defaultValues: {
      title: initialMovie?.title || '',
      poster_path: initialMovie?.poster_path || '',
      genres: initialMovie?.genres || [],
      release_date: initialMovie?.release_date || '',
      vote_average: initialMovie?.vote_average || undefined,
      runtime: initialMovie?.runtime || undefined,
      overview: initialMovie?.overview || ''
    }
  });
  const onSubmit: SubmitHandler<MovieInfo> = data => {
    handleFormSubmit(data);
  };
  
  useEffect(() => {
    reset(initialMovie)
  }, [reset])

  return (
    <div className="bg-gray-900 text-white p-6 rounded-md max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div className='flex justify-between'>
          <div className='grow pr-4'>
            <div className="mb-4">
              <label htmlFor="titleInput" className="block mb-1">Title</label>
              <input
                type="text"
                id="titleInput"
                {...register('title', {required: 'Title is required'})}
                className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="movieUrlInput" className="block mb-1">Movie URL</label>
              <input
                type="url"
                id="movieUrlInput"
                {...register('poster_path', { 
                  required: 'Movie URL is required', 
                  pattern: {
                    value: /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/,
                    message: 'Enter a valid URL'
                  }})}
                className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none"
              />
              {errors.poster_path && <p className="text-red-500 text-sm">{errors.poster_path.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="genreSelect" className="block mb-1">Genre</label>
              <select
                id="genreSelect"
                onChange={(e) => {
                  const selectedGenres = Array.from(e.target.selectedOptions, option => option.value);
                  console.log(selectedGenres);
                  
                  setValue("genres", selectedGenres)
                }}
                className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none"
              >
                <option value="">Select Genre</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
              </select>
              {errors.genres && <p className="text-red-500 text-sm">{errors.genres.message}</p>}
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="dateInput" className="block mb-1">Release Date</label>
              <input
                type="date"
                id="dateInput"
                {...register('release_date', { required: 'Release date is required' })}
                className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none"
              />
              {errors.release_date && <p className="text-red-500 text-sm">{errors.release_date.message}</p>}
            </div>

            
            <div className="mb-4">
              <label htmlFor="ratingInput" className="block mb-1">Rating</label>
              <input
                type="number"
                step="0.1"
                id="ratingInput"
                {...register('vote_average', {
                  valueAsNumber: true,
                  required: 'Rating is required',
                  min: { value: 0, message: 'Rating must be between 0 and 10' },
                  max: { value: 10, message: 'Rating must be between 0 and 10' }
                })}
                className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none"
              />
              {errors.vote_average && <p className="text-red-500 text-sm">{errors.vote_average.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="runtimeInput" className="block mb-1">Runtime (minutes)</label>
              <input
                type="number"
                id="runtimeInput"
                {...register('runtime', {
                  valueAsNumber: true,
                  required: 'Runtime is required', 
                  min: { value: 1, message: 'Runtime must be at least 1 minute' }
                })}
                className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none"
              />
              {errors.runtime && <p className="text-red-500 text-sm">{errors.runtime.message}</p>}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="overviewTextArea" className="block mb-1">Overview</label>
          <textarea
            id="overviewTextArea"
            {...register('overview',{ required: 'Overview is required' })}
            className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none"
            rows={4}
          />
          {errors.overview && <p className="text-red-500 text-sm">{errors.overview.message}</p>}
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="reset"
            className="mx-2 px-4 py-2 border-2 border-red-600 rounded text-red-600 hover:bg-red-700 hover:text-white focus:outline-none"
            onClick={() => reset()}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};