import { ChangeEvent, useCallback } from "react"

export default function SortControl({ currentSelection, handleSelectionChange }: { currentSelection: string, handleSelectionChange: any }) {

  return (
    <div className="bg-gray-900 flex h-full pr-10 items-center justify-end">
      <span className="text-gray-200 text-lg uppercase">Sort By</span>
      <div className="flex items-center ml-2">
        <select defaultValue={currentSelection} 
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectionChange(e)} 
                className="bg-gray-900 text-white uppercase text-lg rounded-lg focus:ring-gray-500 block w-full p-2.5"
                name="sort">
          <option value="Release Date">Release Date</option>
          <option value="Title">Title</option>
        </select>
      </div>
    </div>
  )
}