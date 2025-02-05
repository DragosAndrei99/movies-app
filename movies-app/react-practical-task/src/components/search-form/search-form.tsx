import { FormEvent, useCallback } from "react"
import { Outlet } from "react-router-dom"

export default function SearchForm({ initialSearchQuery, onSearch, openNewMovieDialog }: { initialSearchQuery: string, onSearch: any, openNewMovieDialog: any }) {

return <>
    <Outlet/>
    <div className="bg-gray-800 flex flex-col h-full">
      <div className="ml-auto">
        <button className="p-4" onClick={openNewMovieDialog}>+ ADD MOVIE</button>
      </div>
      <div className='flex items-center justify-center py-24'>
        <form aria-label="form" onSubmit={useCallback((e: FormEvent<HTMLFormElement>) => onSearch(e), [onSearch])} className='flex items-center justify-center w-full max-w-lg'>
          <input
            type='text'
            placeholder='What do you want to watch?'
            className='w-full py-2 pl-4 pr-12 text-lg text-white bg-gray-600 rounded-lg focus:outline-none'
            defaultValue={initialSearchQuery}
            name="search"
          ></input>
          <button className='bg-red-700 hover:bg-red-800 text-white py-3 px-8 rounded-lg focus:outline-none'>
            SEARCH
          </button>
        </form>
      </div>
    </div>

  </>
}